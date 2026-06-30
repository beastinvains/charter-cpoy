
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const STATION_STORAGE_KEY = "savedStations";
const ROUTE_STORAGE_KEY = "savedRouteNumbers";
const initialStations = ["Delhi", "Mumbai", "Bangalore"];
const initialRouteNumbers = ["101", "202"];

export default function sec_pag() {
  const [stations, setStations] = useState<string[]>(initialStations);
  const [routeNumbers, setRouteNumbers] = useState<string[]>(initialRouteNumbers);
  const [newStation, setNewStation] = useState("");
  const [newRouteNumber, setNewRouteNumber] = useState("");
  const [startStation, setStartStation] = useState(initialStations[0]);
  const [destinationStation, setDestinationStation] = useState(initialStations[1]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const savedStations = await AsyncStorage.getItem(STATION_STORAGE_KEY);

        if (savedStations) {
          const parsedStations = JSON.parse(savedStations) as string[];

          if (parsedStations.length > 0) {
            setStations(parsedStations);
            setStartStation(parsedStations[0]);
            setDestinationStation(parsedStations[1] ?? parsedStations[0]);
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
          }
        }
      } catch (error) {
        console.error("Failed to load route numbers", error);
      }
    };

    loadStations();
    loadRouteNumbers();
  }, []);

  const saveStations = async (nextStations: string[]) => {
    try {
      await AsyncStorage.setItem(STATION_STORAGE_KEY, JSON.stringify(nextStations));
    } catch (error) {
      console.error("Failed to save stations", error);
    }
  };

  const saveRouteNumbers = async (nextRouteNumbers: string[]) => {
    try {
      await AsyncStorage.setItem(ROUTE_STORAGE_KEY, JSON.stringify(nextRouteNumbers));
    } catch (error) {
      console.error("Failed to save route numbers", error);
    }
  };

  const addStation = async () => {
    const trimmedStation = newStation.trim();

    if (!trimmedStation) {
      return;
    }

    if (stations.some((station) => station.toLowerCase() === trimmedStation.toLowerCase())) {
      setNewStation("");
      return;
    }

    const nextStations = [...stations, trimmedStation];
    setStations(nextStations);
    setStartStation((current) => current || trimmedStation);
    setDestinationStation((current) => current || trimmedStation);
    setNewStation("");
    await saveStations(nextStations);
  };

  const addRouteNumber = async () => {
    const trimmedRouteNumber = newRouteNumber.trim();

    if (!trimmedRouteNumber) {
      return;
    }

    if (routeNumbers.some((routeNumber) => routeNumber.toLowerCase() === trimmedRouteNumber.toLowerCase())) {
      setNewRouteNumber("");
      return;
    }

    const nextRouteNumbers = [...routeNumbers, trimmedRouteNumber];
    setRouteNumbers(nextRouteNumbers);
    setNewRouteNumber("");
    await saveRouteNumbers(nextRouteNumbers);
  };

  const deleteRouteNumber = async (routeNumberToDelete: string) => {
    const nextRouteNumbers = routeNumbers.filter((routeNumber) => routeNumber !== routeNumberToDelete);
    setRouteNumbers(nextRouteNumbers);
    await saveRouteNumbers(nextRouteNumbers);
  };

  const deleteStation = async (stationToDelete: string) => {
    const nextStations = stations.filter((station) => station !== stationToDelete);
    setStations(nextStations);

    if (startStation === stationToDelete) {
      setStartStation(nextStations[0] ?? "");
    }

    if (destinationStation === stationToDelete) {
      setDestinationStation(nextStations[1] ?? nextStations[0] ?? "");
    }

    await saveStations(nextStations);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Station selector</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Add new station</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter station name"
          value={newStation}
          onChangeText={setNewStation}
        />
        <Pressable style={styles.button} onPress={addStation}>
          <Text style={styles.buttonText}>Add station</Text>
        </Pressable>

        {stations.length > 0 ? (
          <View style={styles.listBox}>
            {stations.map((station) => (
              <View key={station} style={styles.listItem}>
                <Text style={styles.listText}>{station}</Text>
                <Pressable onPress={() => deleteStation(station)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Add route number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter route number"
          value={newRouteNumber}
          onChangeText={setNewRouteNumber}
          autoCapitalize="characters"
        />
        <Pressable style={styles.button} onPress={addRouteNumber}>
          <Text style={styles.buttonText}>Add route</Text>
        </Pressable>

        {routeNumbers.length > 0 ? (
          <View style={styles.listBox}>
            {routeNumbers.map((routeNumber) => (
              <View key={routeNumber} style={styles.listItem}>
                <Text style={styles.listText}>{routeNumber}</Text>
                <Pressable onPress={() => deleteRouteNumber(routeNumber)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Starting</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={startStation}
              onValueChange={(value) => setStartStation(String(value))}
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
              selectedValue={destinationStation}
              onValueChange={(value) => setDestinationStation(String(value))}
              style={styles.picker}
            >
              {stations.map((station) => (
                <Picker.Item key={station} label={station} value={station} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.qrBox}>
        <Text style={styles.selectedText}>From: {startStation} to {destinationStation}</Text>
        <QRCode value={`from:${startStation}|to:${destinationStation}`} size={180} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f7fb",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  listBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  listText: {
    fontSize: 14,
    color: "#111827",
  },
  deleteText: {
    color: "#dc2626",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#111827",
  },
  qrBox: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedText: {
    marginBottom: 12,
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
  },
});
