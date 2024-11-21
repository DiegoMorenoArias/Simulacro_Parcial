import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import PlanetCard from "./PlanetCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { API_BASE_URL } from "../constants/Config";

const PlanetListScreen = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/planets`);
      const data = await response.json();
      setPlanets(data);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  const handlePlanetPress = (id) => {
    router.push(`/(tabs)/planets/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-edit")}
        >
          <Text style={styles.addButtonText}>Agregar Planeta</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.flatList}
          data={planets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlanetCard
              planet={item}
              onPress={() => handlePlanetPress(item.id)}
            />
          )}
        />  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a40", // Fondo cósmico
    padding: 16,
  },
  flatList: {
    flex: 1,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#4b0082", // Botón púrpura
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

export default PlanetListScreen;
