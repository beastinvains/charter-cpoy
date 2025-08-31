import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: "your_logo_here" }} style={styles.logo} />
          <View style={styles.wallet}>
            <Text style={styles.walletText}>₹54.0</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput placeholder="Where are you going?" style={styles.input} />
        </View>

        {/* Saved Locations */}
        <View style={styles.savedLocations}>
          <TouchableOpacity style={styles.locationItem}>
            <Text>Karala Patshala</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationItem}>
            <Text>Saraswati Vihar C Block</Text>
          </TouchableOpacity>
        </View>

        {/* Travel Kit */}
        <Text style={styles.sectionTitle}>YOUR TRAVEL KIT</Text>
        <View style={styles.grid}>
          {/* Bus Tickets (Bigger rectangle) */}
          <TouchableOpacity style={[styles.card, styles.bigCard]}
          onPress={() => router.push("/form")}
          >
            <Text style={styles.cardTitle}>Bus Tickets</Text>
            <Text style={styles.cardSubtitle}>easy booking</Text>
            <Image source={{ uri: "bus_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* Metro Tickets */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Metro Tickets</Text>
            <Text style={styles.cardSubtitle}>bol kar ticket</Text>
            <Image source={{ uri: "metro_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* Daily Pass */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Daily Pass</Text>
            <Text style={styles.cardSubtitle}>in just a tap</Text>
            <Image source={{ uri: "pass_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* Route Info */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Route Info</Text>
            <Text style={styles.cardSubtitle}>buses on route</Text>
            <Image source={{ uri: "route_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* Bookings */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Bookings</Text>
            <Text style={styles.cardSubtitle}>tickets & pass</Text>
            <Image source={{ uri: "booking_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* Month Pass */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Month Pass</Text>
            <Text style={styles.cardSubtitle}>unlimited rides</Text>
            <Image source={{ uri: "monthpass_icon_here" }} style={styles.icon} />
          </TouchableOpacity>

          {/* All Services */}
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>All Services</Text>
            <Text style={styles.cardSubtitle}>explore</Text>
            <Image source={{ uri: "allservice_icon_here" }} style={styles.icon} />
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      
<View style={styles.bottomNav}>
  <TouchableOpacity onPress={() => router.push("/")}>
    <Image source={require("../assets/images/icon.png")} style={styles.navIcon} />
    <Text style={styles.navText}>Home</Text>
    
  </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push("/sec_pag")}>
    <Image source={require("../assets/images/icon.png")} style={styles.navIcon} />
    <Text style={styles.navText}>Nearby</Text>
    
  </TouchableOpacity>
  <TouchableOpacity onPress={() => router.push("/TicSell")}>
    <Image source={require("../assets/images/icon.png")} style={styles.navIcon} />
    <Text style={styles.navText}>Tickets</Text>
    
  </TouchableOpacity>
  <TouchableOpacity >
    <Image source={require("../assets/images/icon.png")} style={styles.navIcon} />
    <Text style={styles.navText}>Around Me</Text>
    
  </TouchableOpacity>
  <TouchableOpacity >
    <Image source={require("../assets/images/icon.png")} style={styles.navIcon} />
    <Text style={styles.navText}>Help</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
  color: "#007AFF", // your desired color
  fontSize: 24,
  fontWeight: "bold",
  position: "absolute",
  top: 32,
  right: 80,
},
  container: { flex: 1, backgroundColor: "#fff" },

  scrollContent: { padding: 10, paddingBottom: 80 }, // give space for bottom nav

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { width: 100, height: 40, resizeMode: "contain" },
  wallet: { backgroundColor: "#f1f1f1", padding: 5, borderRadius: 10 },
  walletText: { fontWeight: "bold" },

  searchBar: { marginVertical: 10, backgroundColor: "#f1f1f1", borderRadius: 8, paddingHorizontal: 10 },
  input: { height: 40 },

  savedLocations: { marginVertical: 10 },
  locationItem: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8, marginVertical: 5 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" , gap: 0,},

  card: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    height: 85,
    padding: 15,
    marginBottom: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e2e2ea",
},
bigCard: {
    height: 170,
    width: "48%",
    backgroundColor: "#eef9ff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e2e2ea",
    marginBottom: 12,
},
  icon: { width: 50, height: 50, marginBottom: 10 },
  cardTitle: { 
  fontWeight: "bold",
  fontSize: 20,  
  marginBottom: 3, // space below the title
  alignSelf: "flex-start", // ensure it's at the left
  },
  cardSubtitle: { fontSize: 13.5, color: "#555" },

 bottomNav: {
  flexDirection: "row",
  justifyContent: "space-around",
  paddingVertical: 40,
  paddingBottom: 10,
  borderTopWidth: 1,
  borderColor: "#ddd",
  backgroundColor: "#000", // black background
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
},
navText: {
  bottom: 30,
  color: "#fff", // white text
  marginBottom: 4, // space between text and icon
  fontSize: 15,
  textAlign: "center",
},
navIcon: {
  bottom:30,
  width: 28,
  height: 28,
  alignSelf: "center",
},
});
