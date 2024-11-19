import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { API_BASE_URL } from "../constants/Config";

const PlanetDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetchPlanetDetails();
  }, []);

  const fetchPlanetDetails = async () => {
    const response = await fetch(`${API_BASE_URL}/planets/${id}`);
    const data = await response.json();
    setPlanet(data);
  };

  const handleDelete = async () => {
    await fetch(`${API_BASE_URL}/planets/${id}`, { method: "DELETE" });
    navigation.goBack();
  };

  if (!planet) return <Text>Cargando...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.title}>{planet.name}</Text>
      <Text>Descripción: {planet.description}</Text>
      <Text>Cantidad de lunas: {planet.moons}</Text>
      <Text>Lunas: {planet.moon_names.join(", ")}</Text>
      <Button
        title="Editar"
        onPress={() => navigation.navigate("AddEditPlanet", { id })}
      />
      <Button title="Eliminar" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default PlanetDetailsScreen;