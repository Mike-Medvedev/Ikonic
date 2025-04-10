import React, { memo } from "react";
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { RadialGradient, Stop, Ellipse } from "react-native-svg";

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.background }, styles.background]}>
      <KeyboardAvoidingView style={styles.background} behavior="padding">
        <Svg height="100%" width="100%" style={styles.svg}>
          <RadialGradient id="grad1" cx="70%" cy="78%" rx="140%" ry="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="0.03" />
            <Stop offset="1" stopColor="#000" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="grad2" cx="70%" cy="78%" rx="100%" ry="80%" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="0.05" />
            <Stop offset="1" stopColor="#000" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="grad3" cx="70%" cy="78%" rx="120%" ry="120%" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="0.08" />
            <Stop offset="1" stopColor="#000" stopOpacity="0" />
          </RadialGradient>

          {/* Largest, most diffused ellipse */}
          <Ellipse cx="70%" cy="78%" rx="140%" ry="100%" fill="url(#grad1)" />

          {/* Medium ellipse */}
          <Ellipse cx="70%" cy="78%" rx="100%" ry="80%" fill="url(#grad2)" />

          {/* Smallest, most concentrated ellipse */}
          <Ellipse cx="70%" cy="78%" rx="120%" ry="120%" fill="url(#grad3)" />
        </Svg>
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  glowContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  svg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default memo(Background);
