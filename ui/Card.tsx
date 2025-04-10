import React, { memo } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useTheme } from "react-native-paper";

type CardProps = {
  children: React.ReactNode;
  coverSource?: any;
  overlayContent?: React.ReactNode;
  headline1?: string;
  headline2?: string;
  date?: string;
};

const CardComponent = ({ children, coverSource, overlayContent, headline1 = "", headline2 = "", date }: CardProps) => {
  const theme = useTheme();
  return (
    <View style={styles.card}>
      {coverSource && (
        <ImageBackground source={coverSource} style={styles.cover} imageStyle={styles.coverImage}>
          {overlayContent && overlayContent}
        </ImageBackground>
      )}
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
};

export const Card = memo(CardComponent);

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
    // backdrop-filter is not supported directly in React Native
  },
  cover: {
    width: "100%",
    height: 150, // or any other desired cover height
    justifyContent: "flex-end", // if you want to place overlay text at the bottom
  },
  coverImage: {
    resizeMode: "contain", // or "contain" if you prefer
  },
  cardContent: {
    padding: 16,
    // your card content styling
  },
});
