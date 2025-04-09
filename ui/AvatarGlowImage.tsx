import { View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";

export default function AvatarGlowImage() {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          right: -20,
          top: 0,
          width: 100, // explicit width
          height: 100, // explicit height
          borderRadius: 50, // half of the width/height for a perfect circle
          borderWidth: 2,
          borderColor: theme.colors.primary,
          overflow: "hidden", // clip any overflow that might show slivers
          alignItems: "center", // center the Avatar.Image within the View
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          size={100}
          style={{
            backgroundColor: "transparent",
          }}
          source={require("@/assets/images/penguin.png")}
        />
      </View>
    </View>
  );
}
