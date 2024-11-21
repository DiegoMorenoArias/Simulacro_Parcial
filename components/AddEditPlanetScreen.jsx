import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
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
    moons: 0,
    moon_names: [],
    image: "",
  });
  const [newMoonName, setNewMoonName] = useState("");

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
        console.error("Error: No se pudieron obtener los detalles del planeta");
      }
    } catch (error) {
      console.error("Error fetching planet details:", error);
    }
  };

  const handleAddMoon = () => {
    if (newMoonName.trim() === "") {
      Alert.alert("Error", "Por favor ingresa un nombre para la luna");
      return;
    }

    if (planet.moon_names.includes(newMoonName.trim())) {
      Alert.alert("Error", "Esta luna ya existe");
      return;
    }

    setPlanet((prev) => ({
      ...prev,
      moons: prev.moons + 1,
      moon_names: [...prev.moon_names, newMoonName.trim()],
    }));
    setNewMoonName("");
  };

  const handleRemoveMoon = (moonName) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar la luna "${moonName}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setPlanet((prev) => ({
              ...prev,
              moons: prev.moons - 1,
              moon_names: prev.moon_names.filter((name) => name !== moonName),
            }));
          },
          style: "destructive",
        },
      ]
    );
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
        router.replace("/");
      } else {
        console.error("Error al guardar el planeta.");
      }
    } catch (error) {
      console.error("Error saving planet:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {id ? "Editar Planeta" : "Agregar Planeta"}
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
        <TextInput
          style={styles.input}
          placeholder="Imagen (URL)"
          placeholderTextColor="#ffffff"
          value={planet.image}
          onChangeText={(text) => setPlanet({ ...planet, image: text })}
        />

        {/* Sección de Lunas */}
        <View style={styles.moonsSection}>
          <Text style={styles.sectionTitle}>Lunas ({planet.moons})</Text>

          <View style={styles.addMoonContainer}>
            <TextInput
              style={styles.moonInput}
              placeholder="Nombre de la luna"
              placeholderTextColor="#ffffff"
              value={newMoonName}
              onChangeText={setNewMoonName}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddMoon}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.moonsList}>
            {planet.moon_names.map((moonName, index) => (
              <View key={index} style={styles.moonItem}>
                <Text style={styles.moonName}>{moonName}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMoon(moonName)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  moonsSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  addMoonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  moonInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#4b0082",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#2c2c54",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4b0082",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  moonsList: {
    marginTop: 10,
  },
  moonItem: {
    flexDirection: "row",
    backgroundColor: "#2c2c54",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  moonName: {
    color: "#ffffff",
    fontSize: 16,
    flex: 1,
  },
  removeButton: {
    backgroundColor: "#ff4444",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonSpacer: {
    height: 10,
  },
});

export default AddEditPlanetScreen;
