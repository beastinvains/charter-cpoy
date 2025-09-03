import AsyncStorage from "@react-native-async-storage/async-storage";
import { Background } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TicketDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
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
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "#fff", top:21 ,left:0}}>                        Issue with ticket?     View all tickets</Text>
        <Image source={require("../../assets/images/exclamation.png")} style={{ width: 30, height: 40, top: 33,left:70,  zIndex: -1 ,position:"absolute" }} />
        <TouchableOpacity onPress={() => router.back("/index")} style={{ position: "absolute", left: 18, top: 44 }}>
          <Image source={require("../../assets/images/close.png")} style={{ width: 12, height: 12, tintColor: "#fff" }} />
        </TouchableOpacity>
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
        <View style={{left:16, bottom:310,position:"absolute"}}>
          <Text style={{ fontSize:14 }}>Bus Route</Text>
          <Text style={{ fontSize:17 }}>{ticket.roat_no}</Text>
        </View>
        <View style={{left:253, bottom:313,position:"absolute"}}>
          <Text style={{ fontSize:14,textAlign:"right" }}>Fare</Text>
          <Text style={{fontWeight:"400", fontSize:17 }}>₹{ticket.price}.00</Text>
        </View>
        <View style={{left:16, bottom:260 ,position:"absolute"}}>
          <Text style={{ fontSize:14 }}>Booking Time</Text>
          <Text style={{fontWeight:"400", fontSize:17 }}>{ticket.time}</Text>
        </View>
        <View style={{left:258, bottom:260,position:"absolute"}}>
          <Text style={{ fontSize:14 }}>Tickets</Text>
          <Text style={{ fontSize:17,textAlign:"right" }}>{ticket.no_of_seats}</Text>
        </View>
        <View style={{left:16, bottom:205,position:"absolute"}}>
          <Text style={{ fontSize:14 }}>Starting stop</Text>
          <Text style={{ fontSize:17 }}>{ticket.starting_point}</Text>
        </View>
        
        <View style={{left:16, bottom:150, position:"absolute"}}>
          <Text style={{ fontSize:14 }}>Ending stop</Text>
          <Text style={{ fontSize:17 }}>{ticket.destination}</Text>
        </View>
        <Text style={{ fontSize:14, bottom:120, textAlign:"center" , left:75, color:"#444444",position:"absolute" }}>T25082025658eadrc655</Text>

        <TouchableOpacity style={styles.qrContainer} onPress={() => router.push(`/ticket_QR?id=${id}`)}>
          <Image source={require("../../assets/images/QR_code.png")} style={styles.qr} />
          <Text style={{ fontSize:14, color:"#2b9056ff", fontWeight:"500", marginRight: 10 }}>   Show QR Code</Text>
        </TouchableOpacity>
        <View style={{ position: "absolute", bottom: 10, left: 0, right: 0, alignItems: "center" }}>
          <View style={styles.networkContainer}>
          <Image source={require("../../assets/images/ONDC.png")} style={styles.ondcLogo} />
          <Text style={{fontWeight:"bold",color:"#5f6160",fontSize:17.5}}>NETWORK</Text>
        </View>
        </View>
      </View>
      <View style={styles.bottom} />
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
  bottom:{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width:"100%",
    height:"5%",
    backgroundColor:"#000000ff"
  },
  networkContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
},
ondcLogo: {
  width: 50,
  height: 35,
  marginRight: 5,
  resizeMode: "contain",
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
    flexDirection: "row",
    backgroundColor: "#daf2e4",
    /* boder detail QR */
    borderColor: "#2b9056ff",
    borderWidth: 1.5,
    /* border radius */
    height: 48,
    width: 280,
    bottom: 63,
    position:"absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 8,
  },
  qr: {
    opacity: 0.8,
    width: 25,
    height: 25,
  },
  footerText: {
    marginTop: 8,
    color: "#888",
    fontSize: 14,
    textAlign: "center",
  },
  line:{
    width: "90%",
    height: 1,
    backgroundColor: "#000000ff",
    top:10,
  }
});