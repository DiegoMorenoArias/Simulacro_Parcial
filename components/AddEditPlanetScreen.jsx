import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
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
      const data = await response.json();
      setPlanet(data);
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

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planet),
      });

      router.back();
    } catch (error) {
      console.error("Error saving planet:", error);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Guardar" onPress={handleSave} />
      <Button title="Cancelar" onPress={() => router.back()} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});

// Aseguramos que la exportación sea explícita
export default AddEditPlanetScreen;
