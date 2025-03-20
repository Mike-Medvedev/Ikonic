import { useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Pressable } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Background from "@/ui/Background";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useTripContext } from "@/context/TripContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, router } from "expo-router";
import UsersAvatarList from "@/components/UsersAvatarList";
export default function TripDetails() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { trips } = useTripContext();
  console.log(trips, "5555");
  const selectedTrip = trips.find((trip) => {
    console.log(trips);
    return trip.id == selectedTripID;
  });
  console.log(selectedTrip);
  if (!selectedTrip) return <Text>selected Trip doesnt exist in db</Text>;
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      height: "100%",
      width: "100%",
      flex: 1,
      alignItems: "center",
    },
    iconText: { flexDirection: "row", gap: 10 },
    link: {},
  });
  return (
    <Background>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, marginBottom: 10 }}>{selectedTrip.title}</Text>
        <View style={{ height: "40%" }}>
          <Image
            source={require("@/assets/images/snow1.jpeg")}
            style={{ height: "100%", width: 400 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.iconText}>
            <Ionicons name="location" size={24} color="black" />
            <Text variant="titleLarge">{selectedTrip.mountain}</Text>
          </View>
          <View style={styles.iconText}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text variant="titleMedium">
              {selectedTrip.startDate.toDateString()} - {selectedTrip.endDate.toDateString()}
            </Text>
          </View>
        </View>
        <Pressable
          style={{ marginTop: 20, gap: 15, alignItems: "center" }}
          onPress={() => router.replace(`/trips/${selectedTripID}/attendance`)}
        >
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
            <Text>Whose Going?</Text>
          </View>
          <UsersAvatarList rsvp="going" />
        </Pressable>
      </View>
    </Background>
  );
}
