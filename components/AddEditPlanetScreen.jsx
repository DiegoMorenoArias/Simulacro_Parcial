import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_BASE_URL } from "../constants/Config";
import { SafeAreaView } from "react-native-safe-area-context";

const AddEditPlanetScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [planet, setPlanet] = useState({
    name: "",
    description: "",
    difficulty: "medium", // valor por defecto cuando alguien apreta para agregar un destino
    isFavorite: false,
  });

  useEffect(() => {
    if (id) {
      fetchPlanetDetails();
    }
  }, [id]);

  const fetchPlanetDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPlanet({
          name: data.name || "",
          description: data.description || "",
          difficulty: data.difficulty || "easy",
          isFavorite: data.isFavorite || false,
        });
      } else {
        console.error("Error: No se pudieron obtener los detalles del destino");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
    }
  };

  const handleSave = async () => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${API_BASE_URL}/destinations/${id}`
        : `${API_BASE_URL}/destinations`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planet),
      });

      if (response.ok) {
        router.replace("/");
      } else {
        console.error("Error al guardar el destino.");
      }
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  const DifficultyCheckbox = ({ value, label }) => (
    <TouchableOpacity
      style={[
        styles.checkboxContainer,
        planet.difficulty === value && styles.checkboxSelected,
      ]}
      onPress={() => setPlanet({ ...planet, difficulty: value })}
    >
      <View
        style={[
          styles.checkbox,
          planet.difficulty === value && styles.checkboxChecked,
        ]}
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {id ? "Editar Destino" : "Agregar Destino"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#ffffff"
          value={planet.name}
          onChangeText={(text) => setPlanet({ ...planet, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          placeholderTextColor="#ffffff"
          value={planet.description}
          onChangeText={(text) => setPlanet({ ...planet, description: text })}
          multiline
        />

        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyTitle}>Nivel de dificultad:</Text>
          <DifficultyCheckbox value="easy" label="Fácil" />
          <DifficultyCheckbox value="medium" label="Medio" />
          <DifficultyCheckbox value="hard" label="Difícil" />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Guardar" onPress={handleSave} color="#4b0082" />
          <View style={styles.buttonSpacer} />
          <Button
            title="Cancelar"
            onPress={() => router.replace("/")}
            color="gray"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1a1a40",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#4b0082",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4b0082",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#2c2c54",
  },
  difficultyContainer: {
    marginBottom: 20,
  },
  difficultyTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#2c2c54",
    borderRadius: 8,
  },
  checkboxSelected: {
    backgroundColor: "#4b0082",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#ffffff",
  },
  checkboxLabel: {
    color: "#ffffff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacer: {
    height: 10,
  },
});

export default AddEditPlanetScreen;
