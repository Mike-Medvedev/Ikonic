import React from "react";
import { View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import { NewTripForm } from "@/types";

const TripSummary = ({ tripForm }: { tripForm: NewTripForm }) => {
  return (
    <>
      {tripForm.startDate.value && tripForm.endDate.value && tripForm.mountain.value ? (
        <Card>
          <Card.Title
            title={<Text variant="titleLarge">{tripForm.mountain.value}</Text>}
            subtitle={
              <View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text variant="titleSmall">{tripForm.startDate.value.toDateString()}</Text>
                  <Text variant="titleSmall">-</Text>
                  <Text variant="titleSmall">{tripForm.endDate.value.toDateString()}</Text>
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
