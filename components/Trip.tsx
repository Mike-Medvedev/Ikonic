import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Card, Avatar, useTheme } from "react-native-paper";

interface Trip {
  mountain: string;
  date: { startDate: Date; endDate: Date };
}

interface TripProps {
  trip: Trip;
}

const Trip = ({ trip }: TripProps) => {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const onPressHandler = () => {
    setIsPressed(true);
    let rand = Math.floor(Math.random() * 10);
    router.push(`/trips/${rand}`);
  };
  return (
    <Pressable onPressIn={onPressHandler} onPressOut={() => setIsPressed(false)}>
      <Card style={{ backgroundColor: `${isPressed ? theme.colors.primaryContainer : "white"}` }}>
        <Card.Title
          title={`${trip.mountain} Trip`}
          subtitle={`${trip.date.startDate.toDateString()} - ${trip.date.endDate.toDateString()}`}
          left={(props) => <Avatar.Image {...props} source={require("@/assets/images/snow1.jpeg")} size={40} />}
        />
      </Card>
    </Pressable>
  );
};

export default Trip;
