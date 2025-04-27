import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface AvatarGlowImageProps {
  size?: number;
  glowColor?: string;
  glowIntensity: number;
}

/**
 * UI Component that accepts an Image and adds a glow affect around it
 */
export default function AvatarGlowImage({
  size = 400,
  glowColor = "#00e5ff",
  glowIntensity = 15,
}: AvatarGlowImageProps) {
  return (
    <View style={styles.container}>
      {/* Glow effect layer */}
      <View
        style={[
          styles.glowEffect,
          {
            width: size + glowIntensity * 0.3,
            height: size + glowIntensity * 0.3,
            borderRadius: (size + glowIntensity * 2) / 2,
            backgroundColor: glowColor,
          },
        ]}
      />

      {/* Actual avatar image */}
      <Image
        source={require("@/assets/images/penguin.png")}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 20,
    left: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  glowEffect: {
    position: "absolute",
    opacity: 0.8,
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
  },
  avatar: {
    position: "absolute",
    zIndex: 1,
  },
});
