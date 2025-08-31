import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Background } from "@react-navigation/elements";

export default function TicketDetailPage() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const loadTicket = async () => {
      const saved = await AsyncStorage.getItem("tickets");
      if (saved) {
        const tickets = JSON.parse(saved);
        const found = tickets.find(t => t.id === id);
        setTicket(found);
      }
    };
    loadTicket();
  }, [id]);

  if (!ticket) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Ticket not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
    <Background style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#f28526' }} />
    <View style={{ position: "absolute", top: 0, left: 0, backgroundColor: "#3fa1ae", padding: 4, height:"3%",width:"100%" }}/>
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, alignItems: "center", zIndex: 1, padding: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff", top:12 ,left:0}}>╳                     Issue with ticket?     View all tickets</Text>
        <Image source={require("../../assets/images/icon.png")} style={{ width: 30, height: 30, position: "absolute", top: 30,left:70,  zIndex: -1 }} />
    </View>
    <View style={[styles.ticketCard, { marginTop: 40 }]}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Transport Dept. of Delhi</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Bus No:</Text>
          <Text style={styles.value}>{ticket.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Route No:</Text>
          <Text style={styles.value}>{ticket.roat_no}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>₹{ticket.price}</Text>
        </View>
        <View style={styles.qrContainer}>
          <Image source={require("../../assets/images/QR_code.png")} style={styles.qr} />
        </View>
        <Text style={styles.footerText}>Show this ticket to conductor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  ticketCard: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 24,
    alignItems: "center",
  },
  headerBar: {
    width: "100%",
    backgroundColor: "#1976d2",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
  },
  qrContainer: {
    marginVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  qr: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  footerText: {
    marginTop: 8,
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
});