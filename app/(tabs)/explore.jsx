import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="Ver detalles del Planeta Tierra"
        onPress={() => router.push("/details/3")}
      />
      <Button
        title="Agregar nuevo planeta"
        onPress={() => router.push("/add-edit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});