import AsyncStorage from "@react-native-async-storage/async-storage";
import { Background } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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

  const bgColor = ticket?.busType === "electric" ? "#1bbabe" : "#f28526";

  if (!ticket) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Ticket not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
    <Background style={{ ...StyleSheet.absoluteFillObject, backgroundColor: bgColor }} />
    <View style={{ position: "absolute", top: 0, left: 0, backgroundColor: "#3fa1ae", padding: 4, height:"3%",width:"100%" }}/>
    <View style={{ position: "absolute", top: 0, left: 0, right: 0, alignItems: "center", zIndex: 1, padding: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff", top:21 ,left:0}}>╳                     Issue with ticket?     View all tickets</Text>
        <Image source={require("../../assets/images/exclamation.png")} style={{ width: 30, height: 40, position: "absolute", top: 35,left:70,  zIndex: -1 }} />
    </View>
    <View style={[styles.ticketCard, { marginTop: 0 }]}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Transport Dept. of Delhi</Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.infoRow}>
          <Text style={{ fontSize:17,bottom:25,left:-16 }}>{ticket.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{ fontSize:17,bottom:58,left:223, fontWeight:"light" }}>₹{ticket.price-ticket.price/100*10}.50</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{ fontSize:14,bottom:45,left:-16 }}>Bus Route</Text>
          <Text style={{ fontSize:17,bottom:25,left:-240 }}>{ticket.roat_no}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{ fontSize:14,bottom:80,left:245 }}>Fare</Text>
          <Text style={{fontWeight:"400", fontSize:17,bottom:60,left:15 }}>₹{ticket.price}.00</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{ fontSize:14,bottom:60,left:-15 }}>Book Time</Text>
          <Text style={{fontWeight:"400", fontSize:17,bottom:40,left:-108 }}>{ticket.time}</Text>
        </View>
        <View style={{left:120, bottom:94}}>
          <Text style={{ fontSize:14 }}>Tickets</Text>
          <Text style={{ fontSize:17 }}>{ticket.no_of_seats}</Text>
        </View>
        <View style={{left:-102, bottom:80}}>
          <Text style={{ fontSize:14 }}>Starting stop</Text>
          <Text style={{ fontSize:17 }}>{ticket.starting_point}</Text>
        </View>
        
        <View style={{left:-80, bottom:70}}>
          <Text style={{ fontSize:14 }}>Ending stop</Text>
          <Text style={{ fontSize:17 }}>{ticket.destination}</Text>
        </View>
        <Text style={{ fontSize:14, bottom:60, left:0 }}>T25082025658eadrc655</Text>

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
    top:-10,
    height: 450,
    width: 320,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    borderRadius: 5,
    paddingBottom: 24,
    alignItems: "center",
  },
  headerBar: {
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#000000ff",
    fontWeight: "500",
    fontSize: 18,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  // ... you might have more styles here that were not in the snippet
});