import React from "react";
import { View } from "react-native";
// Importación relativa al componente
import AddEditPlanetScreen from "../components/AddEditPlanetScreen";

// Definimos el componente de página como una función normal
const AddEditPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <AddEditPlanetScreen />
    </View>
  );
};

// Exportación explícita
export default AddEditPage;
