import useToast from "@/hooks/useToast";
import { TripService } from "@/features/Trips/Services/tripService";
import { InviteService } from "@/features/Trips/Services/inviteService";
import { RSVPStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";
import { Avatar, Divider, Icon, useTheme } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { Background, Text } from "@/design-system/components";
import TripTitleDetail from "@/components/TripTitleDetail";

/**
 * Render RSVP page for a selected trip where users can decide to rsvp
 */
export default function RsvpView() {
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const { session } = useAuth();
  const theme = useTheme();
  const userId = session?.user.id;
  const { showSuccess, showFailure } = useToast();

  //prettier-ignore
  const { data: tripData, isFetching, error,
  } = useQuery({
    queryKey: ["trip", selectedTripId],
    queryFn: async () => TripService.getOne(selectedTripId),
  });

  /**
   * Event handler for rsvp selection and redirects user upon rsvp
   */
  async function rsvpHandler(userResponse: RSVPStatus) {
    if (!userId) {
      showFailure({ message: "Invalid User Id please sign in again" });
      return;
    }
    try {
      await InviteService.rsvp(selectedTripId, userId, { rsvp: userResponse });
      showSuccess({ message: "Successfully Rsvped!", url: `/trips/${selectedTripId}` });
    } catch (error) {
      showFailure({ message: `Error, ${(error as Error).message}` });
      console.error(error);
    }
  }

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

        <AsyncStateWrapper loading={isFetching} error={error}>
          <Text variant="headlineSmall" style={{ marginVertical: 16, textTransform: "capitalize" }}>
            {`You have been invited to ${tripData?.owner.firstname}'s trip🎉`}
          </Text>

          <View style={{ gap: 16, marginVertical: 16 }}>
            <Pressable style={styles.rsvpContainer} onPress={() => rsvpHandler("accepted")}>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Icon source="check" size={32} color={theme.colors.secondary} />
                <View>
                  <Text>Count me in</Text>
                  <Text>Ready to hit the slopes</Text>
                </View>
              </View>
            </Pressable>
            <Pressable style={styles.rsvpContainer} onPress={() => rsvpHandler("uncertain")}>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Icon source="help" size={32} color={theme.colors.secondary} />
                <View>
                  <Text>Need to check</Text>
                  <Text>Still figuring things out</Text>
                </View>
              </View>
            </Pressable>
            <Pressable style={styles.rsvpContainer} onPress={() => rsvpHandler("declined")}>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Icon source="close" size={32} color={theme.colors.secondary} />
                <View>
                  <Text>Can&apos;t make it</Text>
                  <Text>Maybe next time!</Text>
                </View>
              </View>
            </Pressable>
            {/* <Button
              icon="check"
              i
              theme={{ roundness: theme.roundness }}
              mode="outlined"
              onPress={() => rsvpHandler("accepted")}
            >
              Going✅
            </Button> */}
            {/* <Button mode="contained" onPress={() => rsvpHandler("uncertain")}>
              Maybe🤔
            </Button>
            <Button mode="contained" onPress={() => rsvpHandler("declined")}>
              Cant🚫
            </Button> */}
          </View>
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}
