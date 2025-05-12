import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Icon, useTheme } from "react-native-paper";

type Props = {
  requesting: boolean;
};

export default function SpinningAddFriendIcon({ requesting }: Props) {
  const theme = useTheme();
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (requesting) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Reset animation
      spinAnim.stopAnimation(() => {
        spinAnim.setValue(0);
      });
    }
  }, [requesting]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Icon source="account-plus" size={32} color={theme.colors.primary} />
    </Animated.View>
  );
}
