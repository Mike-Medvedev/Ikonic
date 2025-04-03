import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => <Image source={require("@/assets/images/logo.png")} style={styles.image} />;

const styles = StyleSheet.create({
  image: {
    width: 178,
    height: 178,
    marginBottom: 12,
  },
});

export default memo(Logo);
