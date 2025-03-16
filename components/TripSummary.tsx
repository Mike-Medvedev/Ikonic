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
            title={<Text variant="titleLarge">{mountain}</Text>}
            subtitle={
              <View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text variant="titleSmall">{date.startDate.toDateString()}</Text>
                  <Text variant="titleSmall">-</Text>
                  <Text variant="titleSmall">{date.endDate.toDateString()}</Text>
                </View>
              </View>
            }
            subtitleNumberOfLines={2}
            left={(props) => <Avatar.Image {...props} source={require("@/assets/images/snow1.jpeg")} size={50} />}
          />
        </Card>
      ) : null}
    </>
  );
};

export default TripSummary;
