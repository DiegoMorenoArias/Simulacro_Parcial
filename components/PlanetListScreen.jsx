import React, { useEffect, useState } from "react";
import { View, FlatList, Button, StyleSheet } from "react-native";
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
    router.push(`/details/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <Button
        title="Agregar Planeta"
        onPress={() => router.push("/add-edit")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  flatList: {
    flex: 1,
    marginBottom: 16,
  },
});

export default PlanetListScreen;
