import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { View, StyleSheet, ImageBackground, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";

type CardProps = {
  children: React.ReactNode;
  coverSource?: ImageSourcePropType;
  overlayContent?: React.ReactNode;
  headline1?: string;
  headline2?: string;
  date?: string;
  style?: StyleProp<ViewStyle>;
};

const CardComponent = ({ children, coverSource, overlayContent, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {coverSource && (
        <ImageBackground source={coverSource} style={styles.cover} imageStyle={styles.coverImage}>
          <LinearGradient
            colors={["rgba(10, 10, 15, 0.9)", "rgba(10, 10, 15, 0.7)", "rgba(10, 10, 15, 0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {overlayContent && overlayContent}
          </LinearGradient>
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
  gradient: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
