import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, View, GestureResponderEvent, StyleSheet, ImageBackground } from "react-native";
import { Avatar, useTheme, Text } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TripPublic } from "@/client";
import { deleteTrip } from "@/http/TripApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteConfirmation } from "@/utils/ConfirmationModal";
import { Card } from "@/ui/Card";
import UsersAvatarList from "@/ui/UsersAvatarList";
import Entypo from "@expo/vector-icons/Entypo";

export interface TripProps {
  trip: TripPublic;
}

const Trip = ({ trip }: TripProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, number>({
    mutationFn: (trip_id) => deleteTrip(trip_id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });
  const theme = useTheme();

  const onTripSelect = () => {
    router.push(`/trips/${trip.id}`);
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
      backgroundColor: `${"white"}`,
      width: "99%",
    },
    cardTitleStyle: { fontSize: 20, marginVertical: 5 },
  });

  const CardSubTitle = ({ trip }: { trip: TripPublic }) => {
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
    <Pressable onPress={onTripSelect} style={styles.tripContainer}>
      <Card
        coverSource={require("@/assets/images/react-logo.png")}
        overlayContent={
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
              <AntDesign
                name="closecircleo"
                onPress={(event) => handleTripDelete(event, trip.id)}
                size={20}
                color={theme.colors.error}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 8, alignItems: "flex-end" }}>
              <View style={{ alignItems: "center" }}>
                <Text variant="headlineMedium" style={{ color: "#fff", margin: 8 }}>
                  {trip.title}
                </Text>
                <Text variant="labelSmall" style={{ color: "#fff", margin: 8 }}>
                  {trip.title}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: theme.colors.onSurface,
                  flexDirection: "row",
                  height: 30,
                  gap: 10,
                  padding: 7,
                  alignItems: "center",
                }}
              >
                <Entypo name="calendar" size={14} color="black" />
                <Text style={{ color: "white" }}>Feb 15 - 20</Text>
                {/* {date ?? ""} */}
              </View>
            </View>
          </View>
        }
      >
        {/* Overlay content goes here */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <UsersAvatarList selectedTripId={trip.id as string} rsvp="accepted" size={24} />
            <Text style={{ color: "rgba(255, 255, 255, 0.50)" }}>2 Friends Joined</Text>
          </View>
          <Pressable
            style={{
              alignSelf: "center",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: theme.colors.onSurface,
              paddingVertical: 8,
              paddingHorizontal: 18,
            }}
          >
            <Text style={{ color: theme.colors.primary }}>View Trip</Text>
          </Pressable>
        </View>
      </Card>
      {/* <Card style={styles.cardContainer}>
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
      </Card> */}
    </Pressable>
  );
};

export default Trip;
