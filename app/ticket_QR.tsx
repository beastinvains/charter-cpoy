import AsyncStorage from "@react-native-async-storage/async-storage";
import { Background } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

type Ticket = {
  id: string;
  name: string;
  price: number;
  roat_no: string;
  busType: string;
  destination: string;
  starting_point: string;
  no_of_seats: string;
  time: string;
  date?: string;
};

export default function TicketQrPage() {
  const { id } = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const saved = await AsyncStorage.getItem("tickets");
        if (saved) {
          const tickets = JSON.parse(saved) as Ticket[];
          const found = tickets.find((item) => item.id === String(id));
          setTicket(found ?? null);
        }
      } catch (error) {
        console.error("Failed to load ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const busType = ticket?.busType ?? "normal";
  const isClusterBus = busType === "cluster";
  const isElectricBus = busType === "electric";
  const isCngBus = busType === "cng";
  const bgColor = isElectricBus ? "#1bbabe" : isCngBus ? "#4da3ff" : isClusterBus ? "#918e8e" : "#f28526";
  const accentColor = isElectricBus ? "#0d8a8f" : isCngBus ? "#2f6fb8" : isClusterBus ? "#6b6d70" : "#c95f00";
  const cardBackground = isClusterBus ? "#f4f4f4" : "#ffffff";
  const headerTextColor = isClusterBus ? "#f3f4f6" : "#ffffff";

  const qrValue = ticket
    ? `Ticket ID: ${ticket.id}\nBus: ${ticket.name}\nRoute: ${ticket.roat_no}\nFare: ₹${ticket.price}.00\nSeats: ${ticket.no_of_seats}\nFrom: ${ticket.starting_point}\nTo: ${ticket.destination}\nTime: ${ticket.time}`
    : "";

  if (loading) {
    return (
      <View style={[styles.screen, { backgroundColor: bgColor }]}> 
        <Text style={{ color: headerTextColor }}>Loading ticket...</Text>
      </View>
    );
  }

  if (!ticket) {
    return (
      <View style={[styles.screen, { backgroundColor: bgColor }]}> 
        <Text style={{ color: headerTextColor }}>Ticket not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: bgColor }]}> 
      <Background style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bgColor }}>
        <View style={{ flex: 1 }} />
      </Background>
      <View style={[styles.topBar, { backgroundColor: accentColor }]} />
      <Text style={[styles.headerText, { color: headerTextColor }]}>╳                     Issue with ticket?     View all tickets</Text>
      <Image source={require("../assets/images/exclamation.png")} style={styles.exclamationIcon} />
      <View style={[styles.qrContainer, { backgroundColor: cardBackground, borderColor: accentColor }]}> 
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={290} />
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
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "5%",
    backgroundColor: "#000000ff",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "3%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
    top: -90,
  },
  exclamationIcon: {
    width: 30,
    height: 40,
    top: -120,
    left: -90,
    zIndex: 1,
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
    top: -20,
    width: 320,
    height: 480,
  },
  qrWrapper: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
});
