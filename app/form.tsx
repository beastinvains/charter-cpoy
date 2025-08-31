import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Form() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [roat_no, setRoat_no] = useState("");
  const router = useRouter();

  const saveData = async (name, price, roat_no) => {
    try {
      const id = Date.now().toString(); // unique ID
      const existing = await AsyncStorage.getItem("tickets");
      const tickets = existing ? JSON.parse(existing) : [];
      const newTicket = {
        id,
        name,
        price,
        roat_no,
        createdAt: new Date().toISOString(), // <-- add this line
      };
      tickets.push(newTicket);
      await AsyncStorage.setItem("tickets", JSON.stringify(tickets));
      return id;
    } catch (e) {
      // handle error
      return null;
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="bus no"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="price"
        value={price}
        onChangeText={setPrice}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="bus route no"
        value={roat_no}
        onChangeText={setRoat_no}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button
        title="Submit"
        onPress={async () => {
          const id = await saveData(name, price, roat_no);
          if (id) router.replace(`/ticket/${id}`); // Go to new ticket page
        }}
      />
    </View>
  );
}