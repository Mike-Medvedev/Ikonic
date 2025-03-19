import React from "react";
import { StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import TripPlanner from "@/components/TripPlanner";

const Index = () => {
  return (
    <View style={styles.container}>
      <TripPlanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Index;
