import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#1a1a40", // Fondo oscuro similar a la temática cósmica
            borderTopColor: "#4b0082", // Bordes en color púrpura
            borderTopWidth: 2,
          },
          default: {
            backgroundColor: "#1a1a40", // Fondo oscuro similar a la temática cósmica
            borderTopColor: "#4b0082", // Bordes en color púrpura
            borderTopWidth: 2,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="add-edit"
        options={{
          title: "Agregar destino",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
