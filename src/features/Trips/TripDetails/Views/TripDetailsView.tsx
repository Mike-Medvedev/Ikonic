import { View, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { ActivityIndicator, Chip, Divider, Icon, Text, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import Background from "@/design-system/components/Background";
import { formatDateRangeShort } from "@/utils/dateUtils";
import { router } from "expo-router";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import UsersAvatarList from "@/components/UsersAvatarList";
import { InviteService } from "@/features/Trips/Services/inviteService";
import storageClient from "@/lib/storage";
import { useMemo } from "react";
import { Button } from "@/design-system/components";
import { useAuth } from "@/context/AuthContext";

/**
 * Renders the UI for the trip details page
 * @todo handle getting attendess of userInvites list
 */
export default function TripDetailsView() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams() as { selectedTrip: string };
  const { session } = useAuth();
  if (!session) return null;
  // const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  // prettier-ignore
  const { data: trip, isFetching: fTrips, error: eTrips } = useQuery({
    queryKey: ["trip", selectedTripID], queryFn: async () => {
      return TripService.getOne(selectedTripID as string);
    },
    enabled: !!selectedTripID,
  });
  const isOwner = trip?.owner.id === session.user.id;

  //prettier-ignore
  const { data: attendees, isFetching: fAttendees, error: eAttendees } = useQuery({
     queryKey: ["attendees", selectedTripID],
     queryFn: async () => InviteService.getInvitedUsers(selectedTripID),
     enabled: !!selectedTripID,
   });
  const {
    data: imageUrl,
    isFetching: fetchingImage,
    error: imageError,
  } = useQuery({
    queryKey: ["trip-image", trip?.id],
    queryFn: async () => {
      if (!trip?.tripImageStoragePath) return null;
      return await storageClient.downloadPrivateImage({
        bucket: "trips",
        path: trip.tripImageStoragePath,
      });
    },
    enabled: !!trip?.tripImageStoragePath,
  });

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
    imageContainer: { width: "100%", height: "100%", justifyContent: "center" },
    image: { width: "100%", height: "100%", objectFit: "cover" },
  });
  const cacheBustedUrl = useMemo(() => {
    return imageUrl ? `${imageUrl}&cache_bust=${Date.now()}` : undefined;
  }, [imageUrl]);
  return (
    <Background>
      <AsyncStateWrapper loading={fTrips || fetchingImage} error={eTrips || imageError}>
        <View style={styles.cover}>
          <View style={styles.imageContainer}>
            {cacheBustedUrl ? (
              <>
                <Image source={{ uri: imageUrl! }} style={styles.image} />
                {fetchingImage && <ActivityIndicator style={StyleSheet.absoluteFill} color={theme.colors.surface} />}
              </>
            ) : (
              <Text style={{ textAlign: "center", color: theme.colors.primary }}>Tap the Cog to upload an image</Text>
            )}
          </View>

          {/* <View style={styles.coverActions}>
            <IconButton icon="share-variant" size={20} iconColor={theme.colors.primary} mode="contained" />
            <IconButton icon="heart-outline" size={20} iconColor={theme.colors.primary} mode="contained" />
          </View> */}
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
                <Chip
                  style={{
                    borderRadius: 20,
                  }}
                >
                  <Text>{formatDateRangeShort(trip?.startDate ?? new Date(), trip?.endDate ?? new Date())}</Text>
                </Chip>
              </View>
            </View>
            <View style={{ marginVertical: 16, gap: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text variant="titleMedium">{`Trip Members (${attendees?.accepted.length})`}</Text>
                {isOwner && (
                  <Button
                    mode="elevated"
                    icon="account-plus"
                    onPress={() => router.push(`${DEFAULT_APP_PATH}/${trip?.id}/invite`)}
                    theme={{ roundness: theme.roundness }}
                  >
                    Invite
                  </Button>
                )}
              </View>

              <Pressable
                style={{ flexDirection: "row", gap: 16 }}
                onPress={() => router.push(`${DEFAULT_APP_PATH}/${trip?.id}/attendance`)}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                  <AsyncStateWrapper loading={fAttendees} error={eAttendees}>
                    <UsersAvatarList attendees={attendees} rsvp="accepted" size={40} />
                  </AsyncStateWrapper>
                  <Icon source="chevron-right" size={40} />
                </View>
              </Pressable>
              {/* <AsyncStateWrapper loading={isFetching} error={error}>
              <UsersAvatarList attendees={attendees} rsvp="accepted" />
            </AsyncStateWrapper> */}
            </View>
          </View>
          {/* <Divider /> */}
          {/* <View style={styles.tripDetails}>
            <Text variant="titleMedium" style={{ marginBottom: 16 }}>
              Trip Details
            </Text>

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
          </View> */}
          <Divider style={{ marginVertical: 16 }} />
          {trip?.desc ? (
            <View style={styles.descritpion}>
              <Text variant="titleMedium" style={{ marginBottom: 16 }}>
                About this trip
              </Text>

              <Text>{trip?.desc}</Text>
            </View>
          ) : null}
        </ScrollView>
      </AsyncStateWrapper>
    </Background>
  );
}
