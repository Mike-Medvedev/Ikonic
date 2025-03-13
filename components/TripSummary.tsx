import React from "react";
import { View } from "react-native";
import { useTripContext } from "@/context/TripContext";
import { Card, Text, Avatar } from "react-native-paper";
const TripSummary = () => {
  const { mountain, date } = useTripContext();
  return (
    <>
      {date && mountain ? (
        <Card>
          <Card.Title
            title={mountain}
            left={(props) => <Avatar.Image {...props} source={require("@/assets/images/snow1.jpeg")} size={50} />}
          />
          <Card.Content style={{ gap: 7 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text variant="titleMedium">{date.startDate.toDateString()}</Text>
              <Text variant="titleMedium"> - </Text>
              <Text variant="titleMedium">{date.endDate.toDateString()}</Text>
            </View>
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};

export default TripSummary;
