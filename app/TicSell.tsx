import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar} />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Back Arrow and Title */}
        <View style={styles.headerSection}>
          <Image 
            source={require("../assets/images/right-arrow.png")} 
            style={styles.backArrow} 
          />
          <Text style={styles.title}>All Bookings</Text>
        </View>
        
        {/* Tab Section */}
        <View style={styles.tabContainer}>
          <Text style={[styles.tabText, styles.activeTab]}>RECENT</Text>
          <Text style={styles.tabText}>PAST</Text>
        </View>
        
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Bus ticket</Text>
        
        {/* Ticket Card */}
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : !latestTicket ? (
          <Text style={styles.noTicketsText}>No tickets found.</Text>
        ) : (
          <TouchableOpacity
            style={styles.ticketCard}
            onPress={() => router.push(`/ticket/${latestTicket.id}`)}
          >
            {/* Top Row - Bus Number and Price */}
            <View style={styles.topRow}>
              <View style={styles.busNumberBadge}>
                <Text style={styles.busNumberText}>Route {latestTicket.roat_no}</Text>
              </View>
              <Text style={styles.priceText}>₹ {latestTicket.price-(latestTicket.price/100)*10}.50</Text>
            </View>
            
            {/* Route Information */}
            <View style={styles.routeSection}>
              <Text style={styles.routeText}>
                {latestTicket.starting_point} 
              </Text>
<Image source={require("../assets/images/right-arrow copy.png")} style={{ width: 15, height: 15, tintColor: "#000", marginHorizontal: 5, marginTop: -3 }} />
              <Text style={styles.routeText} >
                              {latestTicket.destination}
              </Text>
            </View>
            
            {/* Bottom Row - Date and Status */}
            <View style={styles.bottomRow}>

              <Text style={styles.viewDetailsText}>View Ticket</Text>

            </View>
          </TouchableOpacity>
        )}
        <Text style={{fontWeight:"bold",fontSize:17}}>Metro ticket</Text>
        <Text style={{fontWeight:"bold",fontSize:15,borderWidth:1,borderRadius:8,borderColor:"#e0e0e0",padding:5}}>  Your Metro Ticket Will Be Available Here</Text>
        <Text style={{fontWeight:"bold",fontSize:17}}>Bus Pass</Text>
        <Text style={{fontWeight:"bold",fontSize:15,borderWidth:1,borderRadius:8,borderColor:"#e0e0e0",padding:5}}>  Your Bus Pass Will Be Available Here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerBar: {
    backgroundColor: "#3fa1ae",
    height: "3%",
    width: "100%",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
    tintColor: "#55555aff",
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#999",
  },
  activeTab: {
    color: "#000000ff",
    borderBottomWidth: 2,
    borderBottomColor: "#3fa1ae",
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  noTicketsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  ticketCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  busNumberBadge: {
    backgroundColor: "#e1ecfe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  busNumberText: {
    color: "#3863a8",
    fontSize: 14,
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },
  routeSection: {
    marginBottom: 12,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
  bottomRow: {
    alignItems: "center",
    borderWidth:1,
    backgroundColor:"#219652",
    borderColor:"#219652",
    padding:10,
    borderRadius:8
  },

  viewDetailsText: {
    fontSize: 14,
    fontWeight: "800",
    textAlign:"left",
    color: "#ffffffff",
  },
});

export default TicSell;