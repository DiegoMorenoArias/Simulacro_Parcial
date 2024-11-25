import React from "react";
import { View, StyleSheet } from "react-native";
import DestinationsListScreen from "../../../components/DestinationsListScreen";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <DestinationsListScreen />
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
