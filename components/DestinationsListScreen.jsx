import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import DestinationCard from "./DestinationCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { API_BASE_URL } from "../constants/Config";

const DestinationsListScreen = () => {
  const [destinations, setdestinations] = useState([]);

  useEffect(() => {
    fetchdestinations();
  }, []);

  const fetchdestinations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/destinations`);
      const data = await response.json();
      // me ayudé de una resolución de parcial anterior para resolver el sort alfabetico adaptándolo
      // al favorite de éste
      const sorteddestinations = data.sort((a, b) => {
        if (a.isFavorite === b.isFavorite) {
          return a.name.localeCompare(b.name);
        }
        return b.isFavorite ? 1 : -1;
      });

      setdestinations(sorteddestinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const handledestinationPress = (id) => {
    router.push(`/(tabs)/destinations/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-edit")}
      >
        <Text style={styles.addButtonText}>Agregar Destino</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.flatList}
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            onPress={() => handledestinationPress(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a40",
    padding: 16,
  },
  flatList: {
    flex: 1,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#4b0082",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DestinationsListScreen;
