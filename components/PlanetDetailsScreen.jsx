import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router"; // Para navegación
import { API_BASE_URL } from "../constants/Config";
import { SafeAreaView } from "react-native-safe-area-context";

const PlanetDetailsScreen = ({ id }) => {
  const [planet, setPlanet] = useState(null);
  const router = useRouter(); // Para navegar
  console.log(id)
  useEffect(() => {
    if (id) {
      fetchPlanetDetails();
    }
  }, [id]);

  const fetchPlanetDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/planets/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPlanet(data);
      } else {
        console.log("holaaa " + id);
        console.error("Error: No se pudieron obtener los detalles del planeta");
      }
    } catch (error) {
      console.error("Error fetching planet details:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE_URL}/planets/${id}`, { method: "DELETE" });
      router.back(); // Regresa al listado de planetas
    } catch (error) {
      console.error("Error deleting planet:", error);
    }
  };

  if (!planet) return <Text style={styles.text}>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: planet.image }} style={styles.image} />
        <Text style={styles.title}>{planet.name}</Text>
        <Text style={styles.text}>Descripción: {planet.description}</Text>
        <Text style={styles.text}>Cantidad de lunas: {planet.moons}</Text>
        <Text style={styles.text}>Lunas: {planet.moon_names.join(", ")}</Text>
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
    backgroundColor: "#1a1a40", // Fondo cósmico
  },
  scrollContainer: {
    alignItems: "center", // Centra el contenido horizontalmente
    padding: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1, // Mantiene la relación de aspecto cuadrada
    resizeMode: "contain", // Asegura que la imagen no se deforme
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4b0082", // Borde púrpura
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff", // Texto blanco
    textAlign: "center",
    marginBottom: 16,
    textShadowColor: "#4b0082", // Sombra púrpura
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#dcdcdc", // Gris claro
    marginBottom: 8,
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#4b0082", // Púrpura para el botón de editar
    padding: 10,
    width: "90%",
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
    backgroundColor: "#ff4d4d", // Rojo para el botón de eliminar
    padding: 10,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlanetDetailsScreen;
