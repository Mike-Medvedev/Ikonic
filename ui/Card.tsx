import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

type CardProps = {
  children: React.ReactNode;
};

const CardComponent = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

export const Card = memo(CardComponent);

const styles = StyleSheet.create({
  card: {
    width: 400,
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
    padding: 20, // for Android shadow
    // backdrop-filter is not supported directly in React Native
  },
});
