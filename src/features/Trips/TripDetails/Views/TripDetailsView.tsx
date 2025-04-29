import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Chip, Divider, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import Background from "@/design-system/components/Background";
import { useAuth } from "@/context/AuthContext";
import { formatDateRangeShort } from "@/utils/dateUtils";

/**
 * Renders the UI for the trip details page
 * @todo handle getting a user and handling if a user is an owner
 */
export default function TripDetailsView() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const { session } = useAuth();
  const theme = useTheme();

  // prettier-ignore
  const { data: trip, isFetching, error } = useQuery({
    queryKey: ["trip", selectedTripID], queryFn: async () => {
      return TripService.getOne(selectedTripID as string);
    },
    enabled: !!selectedTripID
  });
  const isOwner = !!trip?.owner.id && trip.owner.id === session?.user.id;
  const styles = StyleSheet.create({
    scrollContainer: { flex: 1, width: "100%", padding: 16 },
    cover: { backgroundColor: theme.colors.secondary, height: 200 },
    coverActions: {
      position: "absolute",
      bottom: 0,
      right: 0,
      flexDirection: "row",
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
      <View style={styles.cover}>
        <View style={styles.coverActions}>
          <IconButton icon="share-variant" size={20} iconColor="white" />
          <IconButton icon="heart-outline" size={20} iconColor="white" />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tripOverview}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
            <Chip
              style={{
                borderRadius: 20,
              }}
            >
              {formatDateRangeShort(trip?.startDate ?? "", trip?.endDate ?? "")}
            </Chip>
          </View>
          <View style={{ marginVertical: 16 }}>
            <Text variant="labelLarge">Trip Members</Text>
            <View style={{ flexDirection: "row" }}>
              <Avatar.Text label="MM" size={24} />
              <Avatar.Text label="MM" size={24} style={{ marginLeft: -4 }} />
              <Avatar.Text label="MM" size={24} style={{ marginLeft: -4 }} />
            </View>
            {/* <AsyncStateWrapper loading={isFetching} error={error}>
              <UsersAvatarList attendees={attendees} rsvp="accepted" />
            </AsyncStateWrapper> */}
          </View>
        </View>
        <Divider />
        <View style={styles.tripDetails}>
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
        </View>
        <Divider style={{ marginVertical: 16 }} />
        <View style={styles.descritpion}>
          <Text variant="titleMedium">About this trip</Text>
          <Text>
            Join us for an epic winter getaway at Whistler! We&apos;ll be staying in a beautiful slope-side condo with
            easy access to the gondola. Perfect for both skiing and snowboarding, with plenty of après-ski activities
            planned. Bring your good vibes and winter gear!
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}

{
  /* <View>
  <Text variant="titleLarge" style={styles.text}>
    {trip.title}
  </Text>
  <View style={[styles.chip, styles.text]}>
    <View style={styles.iconStyle}>
      <Icon source="map-marker" color={theme.colors.secondary} size={20} />
    </View>
    <Text style={styles.label}>{trip.mountain}</Text>
  </View>
  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <AsyncStateWrapper loading={isFetching} error={error}>
      <UsersAvatarList attendees={attendees} rsvp="accepted" />
    </AsyncStateWrapper>

    <View style={styles.chip}>
      <Icon source="calendar" color={theme.colors.secondary} size={20} />
      <Text style={styles.label}>{getDaysUntil(trip.startDate)}</Text>
    </View>
  </View>
</View>; */
}
{
  /* <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AsyncStateWrapper loading={isFetching} error={error}>
            {isOwner && <EditButton onPress={() => setModalVisible(true)} />}
            <Text style={styles.tripTitle}>{trip?.title}</Text>
            {/* <TripImage tripImage={trip?.image} currentTripId={selectedTripID} /> */
}
//     {trip && <TripDetailsContent trip={trip} />}
//     <TripAttendeesView selectedTripID={selectedTripID as string} />
//     <TripDescription tripDesc={trip?.desc ?? ""} />
//     {trip && <EditTripModal currentTrip={trip} visible={modalVisible} setVisible={setModalVisible} />}
//   </AsyncStateWrapper>
// </ScrollView> */}
