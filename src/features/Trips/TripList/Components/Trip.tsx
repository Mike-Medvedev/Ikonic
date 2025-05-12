import { router } from "expo-router";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useTheme, Text, Icon } from "react-native-paper";
import { TripPublicParsed } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/design-system/components";
import UsersAvatarList from "@/components/UsersAvatarList";
import { InviteService } from "@/features/Trips/Services/inviteService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { formatDateRangeShort, getDaysUntil } from "@/utils/dateUtils";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import storageClient from "@/lib/storage";

export interface TripProps {
  trip: TripPublicParsed;
}
/**
 * Renders the UI for a Trip in a Trip List which is selectable and navigates to a specific trips details
 */
export default function Trip({ trip }: TripProps) {
  //prettier-ignore
  const { data: attendees, isFetching, error } = useQuery({
    queryKey: ["attendees", trip.id],
    queryFn: async () => InviteService.getInvitedUsers(trip.id),
    enabled: !!trip.id,
  });
  const { data: imageUrl } = useQuery({
    queryKey: ["trip-image", trip.id],
    queryFn: async () => {
      if (!trip.tripImageStoragePath) return null;
      return await storageClient.downloadPrivateImage({
        bucket: "trips",
        path: trip.tripImageStoragePath,
      });
    },
    enabled: !!trip.tripImageStoragePath,
  });

  const theme = useTheme();

  const handleTripSelect = () => {
    router.push({ pathname: `${DEFAULT_APP_PATH}/[selectedTrip]/details`, params: { selectedTrip: trip.id } });
  };

  const styles = StyleSheet.create({
    tripContainer: { marginVertical: 8, alignItems: "center", width: "100%" },
    chip: { flexDirection: "row", gap: 8, alignItems: "center", backgroundColor: theme.colors.surfaceVariant },
    label: { color: theme.colors.secondary },
    iconStyle: { marginLeft: -4, marginRight: -4 },
    text: { marginBottom: 8 },
  });

  return (
    <Pressable style={styles.tripContainer} onPress={handleTripSelect}>
      <Card uri={imageUrl ?? undefined} date={formatDateRangeShort(trip.startDate, trip.endDate)}>
        <View>
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
        </View>
      </Card>
    </Pressable>
  );
}
