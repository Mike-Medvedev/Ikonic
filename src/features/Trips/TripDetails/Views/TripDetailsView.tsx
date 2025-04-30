import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Avatar, Chip, Divider, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import Background from "@/design-system/components/Background";
import { useAuth } from "@/context/AuthContext";
import { formatDateRangeShort } from "@/utils/dateUtils";
import { Button, EditButton } from "@/design-system/components";
import { DeleteConfirmation } from "@/utils/ConfirmationModal";
import useToast from "@/hooks/useToast";
import { NetworkError } from "@/lib/errors";
import { router } from "expo-router";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";

/**
 * Renders the UI for the trip details page
 * @todo handle getting attendess of userInvites list
 */
export default function TripDetailsView() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  // const [modalVisible, setModalVisible] = useState(false);
  const { session } = useAuth();
  const { showFailure } = useToast();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, string>({
    mutationFn: (trip_id) => TripService.delete(trip_id),
    onError: (error) => {
      console.error(error);
      if (error instanceof NetworkError) {
        showFailure({ message: "Error Deleting Trip! Please check your network" });
      } else {
        showFailure({ message: "Error Deleting Trip!" });
      }
    },
    onSuccess: () => {
      router.replace(DEFAULT_APP_PATH);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });

  // prettier-ignore
  const { data: trip, isFetching, error } = useQuery({
    queryKey: ["trip", selectedTripID], queryFn: async () => {
      return TripService.getOne(selectedTripID as string);
    },
    enabled: !!selectedTripID
  });
  const isOwner = !!trip?.owner.id && trip.owner.id === session?.user.id;

  /**
   * Event Handler for deleting a trip and prompts the user for confirmation
   */
  async function handleTripDelete(trip_id: string) {
    DeleteConfirmation({ deleteFn: () => mutation.mutate(trip_id) });
  }

  const styles = StyleSheet.create({
    scrollContainer: { width: "100%", padding: 16 },
    cover: { backgroundColor: theme.colors.secondary, height: 200 },
    coverActions: {
      position: "absolute",
      bottom: 0,
      right: 0,
      flexDirection: "row",
      marginHorizontal: 8,
      marginVertical: 16,
    },
    tripOverview: {},
    tripTitle: {},
    chip: { flexDirection: "row", gap: 8, alignItems: "center" },
    label: { color: theme.colors.secondary },
    iconStyle: { marginLeft: -4, marginRight: -4 },
    text: { marginVertical: 8 },
    tripDetails: { marginVertical: 8 },
    descritpion: {},
    tripDetailsContent: {
      gap: 16,
    },
  });
  return (
    <Background>
      <AsyncStateWrapper loading={isFetching} error={error}>
        <View style={styles.cover}>
          <View style={styles.coverActions}>
            <IconButton icon="share-variant" size={20} iconColor={theme.colors.primary} mode="contained" />
            <IconButton icon="heart-outline" size={20} iconColor={theme.colors.primary} mode="contained" />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tripOverview}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View>
                <Text variant="titleLarge" style={styles.tripTitle}>
                  {trip?.title}
                </Text>

                <View style={[styles.chip, styles.text]}>
                  <View style={styles.iconStyle}>
                    <Icon source="map-marker" color={theme.colors.secondary} size={20} />
                  </View>
                  <Text style={styles.label}>{trip?.mountain}</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: 16 }}>
                {isOwner && (
                  <EditButton size={18} color={theme.colors.primary} onPress={() => console.log("editing!")} />
                )}
                <Chip
                  style={{
                    borderRadius: 20,
                  }}
                >
                  <Text>{formatDateRangeShort(trip?.startDate ?? new Date(), trip?.endDate ?? new Date())}</Text>
                </Chip>
              </View>
            </View>
            <View style={{ marginVertical: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="labelLarge" style={{ marginBottom: 16 }}>
                  Trip Members
                </Text>
                <Pressable onPress={() => router.push(`${DEFAULT_APP_PATH}/${trip?.id}/attendance`)}>
                  <Text style={{ color: theme.colors.secondary }}>Manage</Text>
                </Pressable>
              </View>

              <Pressable
                style={{ flexDirection: "row", gap: 16 }}
                onPress={() => router.push(`${DEFAULT_APP_PATH}/${trip?.id}/attendance`)}
              >
                <View style={{ flexDirection: "row" }}>
                  <Avatar.Text label="MM" size={24} />
                  <Avatar.Text label="MM" size={24} style={{ marginLeft: -4 }} />
                  <Avatar.Text label="MM" size={24} style={{ marginLeft: -4 }} />
                </View>
                <View>
                  <Avatar.Icon icon="plus" size={24} style={{ backgroundColor: theme.colors.secondaryContainer }} />
                </View>
              </Pressable>
              {/* <AsyncStateWrapper loading={isFetching} error={error}>
              <UsersAvatarList attendees={attendees} rsvp="accepted" />
            </AsyncStateWrapper> */}
            </View>
          </View>
          <Divider />
          <View style={styles.tripDetails}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                Trip Details
              </Text>
              {isOwner && <EditButton size={18} color={theme.colors.primary} onPress={() => console.log("editing!")} />}
            </View>

            <View style={styles.tripDetailsContent}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Icon source="home" size={16} color={theme.colors.secondary} />
                <Text style={{ flex: 1 }}>Accommodation</Text>
                <Text>Slope-side Condo</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Icon source="bed" size={16} color={theme.colors.secondary} />
                <Text style={{ flex: 1 }}>Bedrooms</Text>
                <Text>3 beds . 2 baths</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Icon source="currency-usd" size={16} color={theme.colors.secondary} />
                <Text style={{ flex: 1 }}>Price per night</Text>
                <Text>$350</Text>
              </View>
            </View>
          </View>
          <Divider style={{ marginVertical: 16 }} />
          <View style={styles.descritpion}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                About this trip
              </Text>
              {isOwner && <EditButton size={18} color={theme.colors.primary} onPress={() => console.log("editing!")} />}
            </View>
            <Text>
              Join us for an epic winter getaway at Whistler! We&apos;ll be staying in a beautiful slope-side condo with
              easy access to the gondola. Perfect for both skiing and snowboarding, with plenty of après-ski activities
              planned. Bring your good vibes and winter gear! Join us for an epic winter getaway at Whistler! We&apos;ll
              be staying in a beautiful slope-side condo with easy access to the gondola. Perfect for both skiing and
              snowboarding, with plenty of après-ski activities planned. Bring your good vibes and winter gear!Join us
              for an epic winter getaway at Whistler!
            </Text>
          </View>
          {isOwner && (
            <Button
              onPress={() => handleTripDelete(trip?.id)}
              style={{ marginVertical: 16 }}
              icon="trash-can"
              mode="contained"
            >
              Delete Trip
            </Button>
          )}
        </ScrollView>
      </AsyncStateWrapper>
    </Background>
  );
}
