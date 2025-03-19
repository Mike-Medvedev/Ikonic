import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Card, Avatar, useTheme, Text } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTripContext } from "@/context/TripContext";

interface Trip {
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
  async function handleTripDelete(event, trip_id) {
    event.stopPropagation();
    console.log(typeof trip_id);
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/delete-trip/${trip_id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting trip!");
    setTrips((trips) => trips.filter((trip) => trip.id !== trip_id));
    console.log(response);
  }
  return (
    <Pressable onPressIn={onPressHandler} onPressOut={() => setIsPressed(false)}>
      <Card style={{ backgroundColor: `${isPressed ? theme.colors.primaryContainer : "white"}` }}>
        <Card.Title
          title={`${trip.mountain} Trip`}
          subtitle={`${trip.startDate.toDateString()} - ${trip.endDate.toDateString()}`}
          left={(props) => <Avatar.Image {...props} source={require("@/assets/images/snow1.jpeg")} size={40} />}
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
