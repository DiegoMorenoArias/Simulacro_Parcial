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
    backgroundColor: "#2c2c54", // Fondo púrpura oscuro
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4, // Sombra más destacada
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Sombra para Android
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "#4b0082", // Borde púrpura
    borderWidth: 2,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff", // Texto blanco
    marginBottom: 4,
    textShadowColor: "#4b0082", // Sombra púrpura
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 14,
    color: "#dcdcdc", // Texto gris claro
  },
});

export default PlanetCard;
