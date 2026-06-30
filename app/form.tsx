import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const STORAGE_KEY = "savedStations";
const ROUTE_STORAGE_KEY = "savedRouteNumbers";
const defaultStations = ["Karala Jain Nagar","Rithala Metro Station"];

export default function Form() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [roat_no, setRoat_no] = useState("");
  const [time, setTime] = useState("");

  const getFormattedTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("en-US", { month: "short" });
    const year = String(now.getFullYear()).slice(-2);
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = String(hours % 12 || 12).padStart(2, "0");

    return `${day} ${month}, ${year} | ${formattedHours}:${minutes} ${period}`;
  };
  const [no_of_seats, setNo_of_seats] = useState("");
  const [starting_point, setStarting_point] = useState("");
  const [destination, setDestination] = useState("");
  const [stations, setStations] = useState<string[]>(defaultStations);
  const [routeNumbers, setRouteNumbers] = useState<string[]>([]);
  // Expo router for navigation
  const router = useRouter();

  useEffect(() => {
    setTime(getFormattedTime());
  }, []);
  // State for bus type, defaulting to 'normal'
  const [busType, setBusType] = useState("normal");
  // Dynamically set background color based on bus type
  const bgColor =
    busType === "electric"
      ? "#a8e063"
      : busType === "cng"
        ? "#3f83cd"
        : busType === "cluster"
          ? "#888383"
          : "#f28526";

  useEffect(() => {
    const loadStations = async () => {
      try {
        const savedStations = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedStations) {
          const parsedStations = JSON.parse(savedStations) as string[];

          if (parsedStations.length > 0) {
            setStations(parsedStations);
            setStarting_point(parsedStations[0]);
            setDestination(parsedStations[1] ?? parsedStations[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load stations", error);
      }
    };

    const loadRouteNumbers = async () => {
      try {
        const savedRouteNumbers = await AsyncStorage.getItem(ROUTE_STORAGE_KEY);

        if (savedRouteNumbers) {
          const parsedRouteNumbers = JSON.parse(savedRouteNumbers) as string[];

          if (parsedRouteNumbers.length > 0) {
            setRouteNumbers(parsedRouteNumbers);
            setRoat_no(parsedRouteNumbers[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load route numbers", error);
      }
    };

    loadStations();
    loadRouteNumbers();
  }, []);

  // Function to save ticket data to AsyncStorage
  const saveData = async (
    name: string,
    price: string,
    roat_no: string,
    busType: string,
    destination: string,
    starting_point: string,
    no_of_seats: string,
    time: string
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
    <ScrollView
      style={[styles.container, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Ticket</Text>
        <Text style={styles.subtitle}>Fill in the trip details below.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Bus type</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={busType}
              onValueChange={(itemValue) => setBusType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Normal Bus" value="normal" />
              <Picker.Item label="Electric Bus" value="electric" />
              <Picker.Item label="CNG Bus" value="cng" />
              <Picker.Item label="Cluster Bus" value="cluster" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bus number</Text>
          <TextInput
            placeholder="Bus no"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Route number</Text>
          {routeNumbers.length > 0 ? (
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={roat_no}
                onValueChange={(itemValue) => setRoat_no(String(itemValue))}
                style={styles.picker}
              >
                <Picker.Item label="Type manually" value="" />
                {routeNumbers.map((routeNumber) => (
                  <Picker.Item key={routeNumber} label={routeNumber} value={routeNumber} />
                ))}
              </Picker>
            </View>
          ) : null}
          <TextInput
            placeholder="Bus route no"
            value={roat_no}
            onChangeText={setRoat_no}
            style={styles.input}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Starting point</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={starting_point}
                onValueChange={(itemValue) => setStarting_point(String(itemValue))}
                style={styles.picker}
              >
                {stations.map((station) => (
                  <Picker.Item key={station} label={station} value={station} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Destination</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={destination}
                onValueChange={(itemValue) => setDestination(String(itemValue))}
                style={styles.picker}
              >
                {stations.map((station) => (
                  <Picker.Item key={station} label={station} value={station} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>No. of seats</Text>
          <TextInput
            placeholder="No of seats"
            value={no_of_seats}
            onChangeText={setNo_of_seats}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Booking time</Text>
          <TextInput
            placeholder="01 Sep 25 | 10:00 AM"
            value={time}
            editable={false}
            style={[styles.input, styles.disabledInput]}
          />
          <Text style={styles.helperText}>Booking time will be added automatically.</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button title="Manage stations" onPress={() => router.push("/sec_pag")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Submit"
            onPress={async () => {
              const id = await saveData(name, price, roat_no, busType, destination, starting_point, no_of_seats, time);
              if (id) router.replace(`/ticket/${id}`);
            }}
          />
        </View>
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
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  section: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#f3f4f6",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    marginBottom: 14,
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },
  buttonWrapper: {
    marginTop: 10,
  },
});
