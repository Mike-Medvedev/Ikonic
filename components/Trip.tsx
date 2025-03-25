import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, View, GestureResponderEvent } from "react-native";
import { Card, Avatar, useTheme, Text, Divider } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTripContext } from "@/context/TripContext";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Trip {
  image: string | null;
  mountain: string;
  startDate: Date;
  endDate: Date;
}

interface TripProps {
  trip: Trip;
}

const Trip = ({ trip }: TripProps) => {
  const theme = useTheme();
  const { setTrips } = useTripContext();
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const onPressHandler = () => {
    setIsPressed(true);
    router.push(`/trips/${trip.id}`);
  };
  async function handleTripDelete(event: GestureResponderEvent, trip_id: number) {
    event.stopPropagation();
    console.log(typeof trip_id);
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/delete-trip/${trip_id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting trip!");
    setTrips((trips) => trips.filter((trip) => trip.id !== trip_id));
    console.log(response);
  }

  const CardTitle = ({ trip }: { trip: Trip }) => {
    return (
      <View style={{ width: "100%" }}>
        <Text variant="titleMedium">{trip.title}</Text>
      </View>
    );
  };

  const CardSubTitle = ({ trip }: { trip: Trip }) => {
    return (
      <View style={{ gap: 3, padding: 10 }}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Ionicons name="location" size={12} color="black" />
          <Text>{`${trip.mountain}\n`}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <AntDesign name="calendar" size={12} color="black" />
          <Text>{`${trip.startDate.toDateString()} - ${trip.endDate.toDateString()}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <Pressable
      onPress={onPressHandler}
      onPressOut={() => setIsPressed(false)}
      style={{ marginVertical: 10, alignItems: "center", width: "100%" }}
    >
      <Card
        style={{
          backgroundColor: `${isPressed ? theme.colors.primaryContainer : "white"}`,
          width: "99%",
        }}
      >
        <Card.Title
          title={<CardTitle trip={trip} />}
          titleStyle={{ fontSize: 20, marginVertical: 5 }}
          subtitle={<CardSubTitle trip={trip} />}
          subtitleNumberOfLines={2}
          left={(props) => <Avatar.Image {...props} source={{ uri: trip.image ?? "" }} size={50} />}
          rightStyle={{
            bottom: 30,
            left: 5,
          }}
          right={(props) => (
            <AntDesign
              name="closecircleo"
              onPress={(event) => handleTripDelete(event, trip.id)}
              size={20}
              color={theme.colors.error}
              style={{ marginRight: 10 }}
            />
          )}
        />
      </Card>
    </Pressable>
  );
};

export default Trip;
