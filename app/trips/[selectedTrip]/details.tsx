import { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Background from "@/ui/Background";
export default function TripDetails() {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      height: "100%",
      width: "100%",
      flex: 1,
    },
    iconText: { flexDirection: "row", gap: 10 },
    imageContainer: { height: "70%" },
  });
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("@/assets/images/snow1.jpeg")} style={{ width: "100%", height: "100%" }} />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.iconText}>
            <Ionicons name="location" size={24} color="black" />
            <Text variant="titleLarge">Killington</Text>
          </View>
          <View style={styles.iconText}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text variant="titleMedium">March 12th, 2025 - March 13th, 2025 </Text>
          </View>
        </View>
        <View style={{ marginTop: 20, gap: 15 }}>
          <Text>Whose Going?</Text>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image source={require("@/assets/images/mike.png")} />
            <Avatar.Image source={require("@/assets/images/mike.png")} />
            <Avatar.Image source={require("@/assets/images/mike.png")} />
            <Avatar.Image source={require("@/assets/images/mike.png")} />
            <Avatar.Text
              label={`+${2}`}
              style={{ backgroundColor: "grey", marginRight: 4 }}
              labelStyle={{ fontSize: 16 }}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}
