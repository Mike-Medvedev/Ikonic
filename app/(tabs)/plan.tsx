import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import TripPlanner from "@/components/TripPlanner";

const Index = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TripPlanner />
      </SafeAreaView>
    </SafeAreaProvider>
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
