import AsyncStorage from "@react-native-async-storage/async-storage";
import { Background } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function ticket_QR() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const saved = await AsyncStorage.getItem("tickets");
        if (saved) {
          const tickets = JSON.parse(saved);
          const found = tickets.find(t => t.id === id);
          setTicket(found);
        }
      } catch (error) {
        console.error("Failed to load ticket:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTicket();
  }, [id]);

  const bgColor = ticket?.busType === "electric" ? "#1bbabe" : "#f28526";

  if (loading) {
    return (
      <View style={[styles.screen, { backgroundColor: "#f28526" }]}>
        <Text>Loading ticket...</Text>
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={[styles.screen, { backgroundColor: "#f28526" }]}>
        <Text>Ticket not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: bgColor }]}>
      <Background style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bgColor }} />
      
      <View style={styles.topBar} />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>╳                     Issue with ticket?     View all tickets</Text>
        <Image source={require("../assets/images/exclamation.png")} style={styles.exclamationIcon} />
      </View>
      
      <View style={styles.qrContainer}>
        <View style={styles.qrWrapper}>
      <QRCode
         value={`Account Holder name:- PUNIT SHARMA\nAccount no:- "45281638152749251038373"\nPhone no:- 8130505020transaction ID:-T25082025658eadrc655"\nTicket ID: ${ticket.id}\nBUS no: ${ticket.name}\nRoute: ${ticket.roat_no}\nFare: ₹${ticket.price}.00\nBus Type: ${ticket.busType}\nDate: ${new Date(ticket.date).toLocaleString()}`}
        size={300}
      />
        </View>
      </View>
      <View style={styles.bottom} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom:{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width:"100%",
    height:"5%",
    backgroundColor:"#000000ff"
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#3fa1ae",
    padding: 4,
    height: "3%",
    width: "100%",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
    top: 21,
  },
  exclamationIcon: {
    width: 30,
    height: 40,
    top: -10,
    left: -89,
    zIndex: -1,
  },
  qrContainer: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
    width: 320,
    height: 480,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  qrWrapper: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  qrCode: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    
  },
  busTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  routeText: {
    fontSize: 14,
    color: "#666",
  },
});
