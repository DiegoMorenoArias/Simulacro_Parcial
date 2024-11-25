import React from "react";
import { View, StyleSheet } from "react-native";
import PlanetListScreen from "../../../components/PlanetListScreen";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PlanetListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a40", // Fondo cósmico oscuro
    paddingTop: 16,
  },
});
