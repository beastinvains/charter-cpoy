import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Form() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [roat_no, setRoat_no] = useState("");
  const [time, setTime] = useState("");
  const [no_of_seats, setNo_of_seats] = useState("");
  const [starting_point, setStarting_point] = useState("");
  const [destination, setDestination] = useState("");
  // Expo router for navigation
  const router = useRouter();
  // State for bus type, defaulting to 'normal'
  const [busType, setBusType] = useState("normal");
  // Dynamically set background color based on bus type
  const bgColor = busType === "electric" ? "#a8e063" : "#f28526";

  // Function to save ticket data to AsyncStorage
  const saveData = async (
    name,
    price,
    roat_no,
    busType,
    destination,
    starting_point,
    no_of_seats,
    time
  ) => {
    try {
      // Generate a unique ID for the ticket using the current timestamp
      const id = Date.now().toString();
      // Get existing tickets from storage
      const existing = await AsyncStorage.getItem("tickets");
      const tickets = existing ? JSON.parse(existing) : [];
      // Create a new ticket object
      const newTicket = {
        id,
        name,
        price,
        roat_no,
        busType,
        destination,
        starting_point,
        no_of_seats,
        time,
        createdAt: new Date().toISOString(),
      };
      // Add the new ticket to the array and save it back to AsyncStorage
      tickets.push(newTicket);
      await AsyncStorage.setItem("tickets", JSON.stringify(tickets));
      // Return the new ticket's ID for navigation
      return id;
    } catch (e) {
      // Log error and return null if saving fails
      console.error("Failed to save data", e);
      return null;
    }
  };

 return (
    // Use ScrollView to ensure the form is scrollable, especially when the keyboard is visible.
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.scrollContent}
    >
      
      <Picker
        selectedValue={busType}
        onValueChange={(itemValue) => setBusType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Normal Bus" value="normal" />
        <Picker.Item label="Electric Bus" value="electric" />
      </Picker>
      {/* Form input fields */}
<View style={{ padding: 20 }}>
  <TextInput
    placeholder="bus no"
    value={name}
    onChangeText={setName}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
  />
  <TextInput
    placeholder="price"
    value={price}
    onChangeText={setPrice}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
    keyboardType="numeric"
  />
  <TextInput
    placeholder="bus route no"
    value={roat_no}
    onChangeText={setRoat_no}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
  />
  <TextInput
    placeholder="starting point"
    value={starting_point}
    onChangeText={setStarting_point}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
  />
  <TextInput
    placeholder="destination"
    value={destination}
    onChangeText={setDestination} 
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
    />
  <TextInput
    placeholder="no of seats"
    value={no_of_seats}
    onChangeText={setNo_of_seats}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50, bottom:100 }}
    />
  <TextInput
    placeholder="01 Sep 25 | 10:00 AM"
    value={time}
    onChangeText={setTime}
    style={{ borderWidth: 1, marginBottom: 10, padding: 12, height: 50,bottom:100 }}
    />
    <Text>example format 01 Sep 25 | 10:30 AM</Text>
         <Button
          title="Submit"
          onPress={async () => {
            // Save the form data and get the new ticket's ID
            const id = await saveData(name, price, roat_no, busType, destination, starting_point, no_of_seats, time);
            // If saving was successful, navigate to the new ticket's detail page
            if (id) router.replace(`/ticket/${id}`);
          }}
        />
      </View>
    </ScrollView>
  );
}
// Styles for the form components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  picker: {
    bottom: 40,
    height: 50,
    width: "100%",
    marginBottom: 24,
  },
});
