import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const TicSell: React.FC = () => {
  const [latestTicket, setLatestTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const saved = await AsyncStorage.getItem("tickets");
      if (saved) {
        const tickets = JSON.parse(saved);
        tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestTicket(tickets[0]);
      }
      setLoading(false);
    };
    fetchTickets();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Latest Created Ticket</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : !latestTicket ? (
        <Text>No tickets found.</Text>
      ) : (
        <TouchableOpacity
          style={{ padding: 10, borderWidth: 1, borderRadius: 8, backgroundColor: "#eef9ff" }}
          onPress={() => router.push(`/ticket/${latestTicket.id}`)}
        >
          <Text>Bus No: {latestTicket.name}</Text>
          <Text>Price: {latestTicket.price}</Text>
          <Text>Route No: {latestTicket.roat_no}</Text>
          <Text>Created At: {new Date(latestTicket.createdAt).toLocaleString()}</Text>
          <Text style={{ color: "#007AFF", marginTop: 8 }}>View Details →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TicSell;