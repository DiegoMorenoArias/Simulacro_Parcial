import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const PlanetCard = ({ planet, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{planet.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {planet.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3, // Para sombra en Android
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  infoContainer: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});

export default PlanetCard;