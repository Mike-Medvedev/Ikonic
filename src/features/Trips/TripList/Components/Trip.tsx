import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TripPublicParsed } from "@/types";
import { TripService } from "../../Services/tripService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteConfirmation } from "@/utils/ConfirmationModal";
import { Card } from "@/design-system/components/Card";
import UsersAvatarList from "@/components/UsersAvatarList";
import Entypo from "@expo/vector-icons/Entypo";
import { InviteService } from "@/features/Trips/Services/inviteService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";

export interface TripProps {
  trip: TripPublicParsed;
}
/**
 * Renders the UI for a Trip in a Trip List which is selectable and navigates to a specific trips details
 */
export default function Trip({ trip }: TripProps) {
  const queryClient = useQueryClient();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  //prettier-ignore
  const { data: attendees, isFetching, error } = useQuery({
    queryKey: ["attendees", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: !!selectedTripId,
  });
  const mutation = useMutation<void, unknown, string>({
    mutationFn: (trip_id) => TripService.delete(trip_id),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });
  const theme = useTheme();

  const onTripSelect = () => {
    router.push(`/trips/${trip.id}`);
  };
  /**
   * Event Handler for deleting a trip and prompts the user for confirmation
   */
  async function handleTripDelete(trip_id: string) {
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

  return (
    <View style={styles.tripContainer}>
      <Card
        coverSource={require("@/assets/images/react-logo.png")}
        overlayContent={
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
              <AntDesign
                name="closecircleo"
                onPress={() => handleTripDelete(trip.id)}
                size={20}
                color={theme.colors.error}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 8,
                alignItems: "flex-end",
              }}
            >
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
                  backgroundColor: theme.colors.onBackground,
                  flexDirection: "row",
                  height: 30,
                  gap: 10,
                  padding: 7,
                  alignItems: "center",
                }}
              >
                <Entypo name="calendar" size={14} color={theme.colors.primary} />
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
            <AsyncStateWrapper loading={isFetching} error={error}>
              <UsersAvatarList rsvp="accepted" size={24} attendees={attendees} />
              <Text style={{ color: "rgba(255, 255, 255, 0.50)" }}>2 Friends Joined</Text>
            </AsyncStateWrapper>
          </View>
          <Pressable
            onPress={onTripSelect}
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
    </View>
  );
}
