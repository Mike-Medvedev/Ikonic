import { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Background from "@/ui/Background";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useTripContext } from "@/context/TripContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import UsersAvatarList from "@/components/UsersAvatarList";
export default function TripDetails() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { trips } = useTripContext();
  const selectedTrip = trips.find((trip) => {
    console.log(trip.id, selectedTripID);
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
      overflow: "hidden",
    },
    iconText: { flexDirection: "row", gap: 10 },
    imageContainer: { height: "70%" },
    link: {},
  });
  return (
    <Background>
      <View style={styles.container}>
        <Text style={{ fontSize: 40, marginBottom: 10 }}>{selectedTrip.title}</Text>
        <View style={styles.imageContainer}>
          <Image source={require("@/assets/images/snow1.jpeg")} style={{ height: "100%" }} resizeMode="contain" />
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
        <View style={{ marginTop: 20, gap: 15 }}>
          <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
            <Text>Whose Going?</Text>
            <Link href={`/trips/${selectedTripID}/attendance`} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Add People</Text>
              <Entypo name="add-user" size={24} color="black" />
            </Link>
          </View>
          <UsersAvatarList />
        </View>
      </View>
    </Background>
  );
}
