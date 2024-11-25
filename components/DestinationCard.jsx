import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { API_BASE_URL } from "@/constants/Config";
import { router } from "expo-router";

const DestinationCard = ({ destination, onPress }) => {
  const [destinationit, setdestinations] = useState(destination);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#4CAF50"; // verde
      case "medium":
        return "#FFC107"; // amarillo
      case "hard":
        return "#F44336"; // rojo
      default:
        return "#808080"; // gris por defecto
    }
  };

  const handleFavorite = async () => {
    const id = destinationit.id;

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${API_BASE_URL}/destinations/${id}`
        : `${API_BASE_URL}/destinations`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...destinationit, isFavorite: !destinationit.isFavorite }),
      });
      try {
        const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
        const data = await response.json();
        setdestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }

      if (response.ok) {
        router.replace("/");
      } else {
        console.error("Error al guardar el destinationa.");
      }
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{destination.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {destination.description}
        </Text>
        <View style={styles.detailsContainer}>
          <Text
            style={[
              styles.difficulty,
              { color: getDifficultyColor(destination.difficulty) },
            ]}
          >
            Dificultad: {destination.difficulty}
          </Text>
          <TouchableOpacity onPress={handleFavorite}>
            <Text
              style={[
                styles.favorite,
                { color: destinationit.isFavorite ? "#ff2d00" : "#808080" },
              ]}
            >
              Favorito
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#2c2c54",
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
    textShadowColor: "#000000",
  },
  description: {
    fontSize: 14,
    color: "#dcdcdc",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  difficulty: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favorite: {
    fontSize: 18,
    marginBottom: 4,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default DestinationCard;