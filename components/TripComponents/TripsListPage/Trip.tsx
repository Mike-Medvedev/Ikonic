import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, View, GestureResponderEvent, StyleSheet } from "react-native";
import { Card, Avatar, useTheme, Text } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trip as TripModel } from "@/models/TripModel";
import { deleteTrip } from "@/http/TripApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIResponse } from "@/models/Api";
import { DeleteConfirmation } from "@/utils/ConfirmationModal";

export interface TripProps {
  trip: TripModel;
}

const Trip = ({ trip }: TripProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, number>({
    mutationFn: (trip_id) => deleteTrip(trip_id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const onTripSelect = () => {
    router.push(`/trips/${trip.id}`);
    setIsPressed(true);
  };
  async function handleTripDelete(event: GestureResponderEvent, trip_id: number) {
    event.stopPropagation();
    DeleteConfirmation({ deleteFn: () => mutation.mutate(trip_id) });
  }

  const styles = StyleSheet.create({
    tripContainer: { marginVertical: 10, alignItems: "center", width: "100%" },
    subtitleContainer: { gap: 3, padding: 10 },
    subtitleLabel: { flexDirection: "row", gap: 5 },
    cardContainer: {
      backgroundColor: `${isPressed ? theme.colors.primaryContainer : "white"}`,
      width: "99%",
    },
    cardTitleStyle: { fontSize: 20, marginVertical: 5 },
  });

  const CardSubTitle = ({ trip }: { trip: TripModel }) => {
    return (
      <View style={styles.subtitleContainer}>
        <View style={styles.subtitleLabel}>
          <Ionicons name="location" size={12} color="black" />
          <Text>{`${trip.mountain}\n`}</Text>
        </View>
        <View style={styles.subtitleLabel}>
          <AntDesign name="calendar" size={12} color="black" />
          <Text>{`${trip.startDate.toDateString()} - ${trip.endDate.toDateString()}`}</Text>
        </View>
      </View>
    );
  };
  return (
    <Pressable onPress={onTripSelect} onPressOut={() => setIsPressed(false)} style={styles.tripContainer}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title={<Text variant="titleMedium">{trip.title}</Text>}
          titleStyle={styles.cardTitleStyle}
          subtitle={<CardSubTitle trip={trip} />}
          subtitleNumberOfLines={2}
          left={(props) => <Avatar.Image {...props} source={{ uri: trip.image ?? "" }} size={50} />}
          rightStyle={{
            bottom: 30,
            left: 5,
          }}
          right={() => (
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
