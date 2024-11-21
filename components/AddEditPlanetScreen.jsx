import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_BASE_URL } from "../constants/Config";

// Definimos el componente como una función normal
const AddEditPlanetScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [planet, setPlanet] = useState({
    name: "",
    description: "",
    moons: 0,
    moon_names: [],
    image: "",
  });

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
        setPlanet({
          name: data.name || "",
          description: data.description || "",
          moons: data.moons || 0,
          moon_names: data.moon_names || [],
          image: data.image || "",
        });
      } else {
        console.log("aca");
        console.error("Error: No se pudieron obtener los detalles del planeta");
      }
    } catch (error) {
      console.error("Error fetching planet details:", error);
    }
  };

  const handleSave = async () => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${API_BASE_URL}/planets/${id}`
        : `${API_BASE_URL}/planets`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planet),
      });

      if (response.ok) {
        router.back(); // Navegar hacia atrás al guardar exitosamente
      } else {
        console.error("Error al guardar el planeta.");
      }
    } catch (error) {
      console.error("Error saving planet:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {id ? "Editar Planeta" : "Agregar Planeta"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={planet.name}
        onChangeText={(text) => setPlanet({ ...planet, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={planet.description}
        onChangeText={(text) => setPlanet({ ...planet, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad de lunas"
        value={planet.moons.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          setPlanet({ ...planet, moons: parseInt(text) || 0 })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Imagen (URL)"
        value={planet.image}
        onChangeText={(text) => setPlanet({ ...planet, image: text })}
      />
      <Button title="Guardar" onPress={handleSave} color="#4b0082" />
      <Button title="Cancelar" onPress={() => router.back()} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a40", // Fondo cósmico
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Texto blanco
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#4b0082", // Sombra púrpura
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4b0082", // Borde púrpura
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#ffffff", // Texto blanco para los inputs
    backgroundColor: "#2c2c54", // Fondo oscuro para los inputs
  },
});

export default AddEditPlanetScreen;
