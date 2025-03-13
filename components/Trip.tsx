import React from "react";
import { Image } from "react-native";
import { Card, Avatar, useTheme, Text } from "react-native-paper";

interface Trip {
  mountain: string;
  date: { startDate: Date; endDate: Date };
}

interface TripProps {
  trip: Trip;
}

const Trip = ({ trip }: TripProps) => {
  const theme = useTheme();
  return (
    <Card>
      <Card.Title
        title={`${trip.mountain} Trip`}
        subtitle={`${trip.date.startDate.toDateString()} - ${trip.date.endDate.toDateString()}`}
        left={(props) => <Avatar.Image {...props} source={require("@/assets/images/snow1.jpeg")} size={40} />}
      />
    </Card>
  );
};

export default Trip;
