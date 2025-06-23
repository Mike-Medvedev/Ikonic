import useToast from "@/hooks/useToast";
import { TripService } from "@/features/Trips/Services/tripService";
import { InviteService } from "@/features/Trips/Services/inviteService";
import { InvitationEnum } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";
import { Avatar, Divider, Icon, useTheme } from "react-native-paper";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { Background, Text } from "@/design-system/components";
import TripTitleDetail from "@/components/TripTitleDetail";
import { ApiError, NetworkError } from "@/lib/errors";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

/**
 * Render RSVP page for a selected trip where users can decide to rsvp
 */
export default function RsvpView() {
  const { selectedTrip: selectedTripId, invite_token } = useLocalSearchParams() as {
    selectedTrip: string;
    invite_token: string;
  };
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("PRINTING INVITE TOKEN FROM RSVP PAGE: ", invite_token);
  }, [invite_token]);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const rsvpMutation = useMutation<boolean, Error, { tripId: string; inviteToken: string; rsvp: InvitationEnum }>({
    mutationFn: ({ tripId, inviteToken, rsvp }) => InviteService.rsvp(tripId, { inviteToken, rsvp }),
    onError: (error) => {
      console.error(error);
      if (error instanceof NetworkError) {
        showFailure({ message: "Error RSVPing Please check your network" });
      } else if (error instanceof ApiError) {
        if (error.status === 409) {
          showFailure({ message: "Error Invitation has already been Rsvp'ed" });
        }
      } else {
        showFailure({ message: `Error RSVPing` });
      }
    },
    onSuccess: () => {
      showSuccess({ message: "Successfully Rsvped!", url: DEFAULT_APP_PATH });
    },
    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  //prettier-ignore
  const { data: tripData, isFetching, error,
  } = useQuery({
    queryKey: ["trip", selectedTripId],
    queryFn: async () => TripService.getOne(selectedTripId),
  });

  const styles = StyleSheet.create({
    rsvpContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      padding: 16,
      width: "100%",
      borderRadius: theme.roundness,
    },
  });
  return (
    <Background>
      <View style={{ padding: 20 }}>
        <TripTitleDetail trip={tripData} />

        <View style={{ marginVertical: 16, gap: 8 }}>
          <Text>Organized by</Text>
          <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Avatar.Text label="M" size={32} />
            <Text style={{ textTransform: "capitalize" }}>
              {tripData?.owner?.firstname} {tripData?.owner?.lastname}
            </Text>
          </View>
        </View>

        <Divider />

        {loading ? (
          <LoadingScreen />
        ) : (
          <AsyncStateWrapper loading={isFetching} error={error}>
            <Text variant="headlineSmall" style={{ marginVertical: 16, textTransform: "capitalize" }}>
              {`You have been invited to ${tripData?.owner.firstname}'s trip🎉`}
            </Text>

            <View style={{ gap: 16, marginVertical: 16 }}>
              <Pressable
                style={styles.rsvpContainer}
                onPress={() => {
                  setLoading(true);
                  rsvpMutation.mutate({ tripId: selectedTripId, inviteToken: invite_token, rsvp: "accepted" });
                }}
              >
                <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                  <Icon source="check" size={32} color={theme.colors.secondary} />

                  <Text>Count me in</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.rsvpContainer}
                onPress={() => {
                  setLoading(true);
                  rsvpMutation.mutate({ tripId: selectedTripId, inviteToken: invite_token, rsvp: "uncertain" });
                }}
              >
                <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                  <Icon source="help" size={32} color={theme.colors.secondary} />

                  <Text>Need to check</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.rsvpContainer}
                onPress={() => {
                  setLoading(true);
                  rsvpMutation.mutate({ tripId: selectedTripId, inviteToken: invite_token, rsvp: "declined" });
                }}
              >
                <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                  <Icon source="close" size={32} color={theme.colors.secondary} />

                  <Text>Can&apos;t make it</Text>
                </View>
              </Pressable>
            </View>
          </AsyncStateWrapper>
        )}
      </View>
    </Background>
  );
}
