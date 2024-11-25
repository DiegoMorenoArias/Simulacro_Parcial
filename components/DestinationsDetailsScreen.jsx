import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { API_BASE_URL } from "../constants/Config";
import { SafeAreaView } from "react-native-safe-area-context";

const DestinationsDetailsScreen = ({ id }) => {
  const [destination, setdestination] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (id) {
      fetchdestinationDetails();
    }
  }, [id]);

  const fetchdestinationDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setdestination(data);
      } else {
        console.error("Error: No se pudieron obtener los detalles del destinationa");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE_URL}/destinations/${id}`, { method: "DELETE" });
      router.replace("/"); // vuelvo a la página principal
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  if (!destination) return <Text style={styles.text}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.text}>Descripción: {destination.description}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/add-edit?id=${id}`)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1a1a40", 
  },
  scrollContainer: {
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4b0082",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "#4b0082",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#dcdcdc",
    marginBottom: 8,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#4b0082",
    padding: 10,
    width: "85%", // como pide la letra de una
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    width: "85%", // como pide la letra pa la responsividad
    alignItems: "center",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DestinationsDetailsScreen;
