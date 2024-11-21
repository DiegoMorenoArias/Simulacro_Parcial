//./app/details/[id].jsx

import { View } from "react-native";
import PlanetDetailsScreen from "../../../components/PlanetDetailsScreen";
import { usePathname } from "expo-router"; // Para obtener la URL completa
import { useState, useEffect } from "react";

export default function DetailsPage() {
  const [id, setId] = useState(null);
  const pathname = usePathname(); // Obtiene la ruta completa, por ejemplo, "/details/123"

  useEffect(() => {
    const aux = pathname.split("/").pop(); // Obtiene el último segmento de la URL
    if (aux !== "add-edit") {
      setId(aux); // Solo actualiza el ID si no es "add-edit"
    }
  }, [pathname]); // Este efecto se ejecuta cuando cambia el pathname

  return (
    <View style={{ flex: 1 }}>
      <PlanetDetailsScreen id={id} />
    </View>
  );
}
