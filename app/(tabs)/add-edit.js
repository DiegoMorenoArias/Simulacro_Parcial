import React from "react";
import { View } from "react-native";
// Importación relativa al componente
import AddEditDestinationScreen from "../../components/AddEditDestinationScreen";

// Definimos el componente de página como una función normal
const AddEditPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <AddEditDestinationScreen />
    </View>
  );
};

// Exportación explícita
export default AddEditPage;
