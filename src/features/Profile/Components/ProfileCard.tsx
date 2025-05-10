import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Avatar, Icon, useTheme } from "react-native-paper";
import { UserPublic } from "@/types";
import { Text } from "@/design-system/components";
import { useState } from "react";
import FriendsListModal from "@/features/Profile/Components/FriendsListModal";
import ProfileEditModal from "@/features/Profile/Components/ProfileEditModal";
import { useQuery } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { formatDateRangeShort } from "@/utils/dateUtils";
import { router } from "expo-router";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import UserAvatar from "@/components/UserAvatar";

/**
 * Render the UI for Profile Information on the Profile Page
 */
export default function ProfileCard({ profile }: { profile: UserPublic }) {
  const [friendsModalVisible, setFriendsModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  //prettier-ignore
  const { data: recentTrips, isFetching, error } = useQuery({
    queryKey: ["trips", "past"],
    queryFn: async () => TripService.getAll({ past: true }),
  })
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { padding: 16 },
    profileCardContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
    profileCardContent: { gap: 8, flex: 1 },
    label: { textTransform: "capitalize", color: theme.colors.secondary, fontSize: 16 },
    squaresContainer: {
      flexDirection: "row",
      gap: 16,
      justifyContent: "space-evenly",
      marginTop: 24,
      marginBottom: 16,
    },
    square: {
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      padding: 16,
      flex: 1,
      borderRadius: theme.roundness,
      justifyContent: "center",
      alignItems: "center",
    },
    squareLabel: { textTransform: "capitalize", color: theme.colors.secondary, fontSize: 14 },

    recentTripsContainer: { marginVertical: 0 },
    recentTripsHeader: { flexDirection: "row", justifyContent: "space-between", marginVertical: 16 },
    recentTrip: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      borderRadius: theme.roundness,
    },
    avatarOverlay: { position: "absolute", bottom: -10, right: 0 },
    iconContainer: { backgroundColor: theme.colors.secondaryContainer },
  });
  return (
    <View style={styles.container}>
      <View style={styles.profileCardContainer}>
        <View>
          <UserAvatar profile={profile} size={64} />
          <View style={styles.avatarOverlay}>
            <Avatar.Icon icon="ski" size={24} color={theme.colors.onSecondaryContainer} style={styles.iconContainer} />
          </View>
        </View>

        <View style={styles.profileCardContent}>
          <Text
            variant="titleLarge"
            style={{ textTransform: "capitalize" }}
          >{`${profile.firstname} ${profile.lastname}`}</Text>
          <Text style={styles.label}>Joined January 2025</Text>
        </View>
        <Pressable onPress={() => setEditModalVisible(true)}>
          <Icon source="cog" size={32} color={theme.colors.primary} />
        </Pressable>
      </View>

      <View style={styles.squaresContainer}>
        <View style={styles.square}>
          <Text variant="headlineSmall">12</Text>
          <Text style={styles.squareLabel}>Trips</Text>
        </View>
        <View style={styles.square}>
          <Text variant="headlineSmall">8</Text>
          <Text style={styles.squareLabel}>Resorts</Text>
        </View>
        <Pressable style={styles.square} onPress={() => setFriendsModalVisible(true)}>
          <Text variant="headlineSmall">45</Text>
          <Text style={styles.squareLabel}>Friends</Text>
        </Pressable>
      </View>

      <View style={styles.recentTripsContainer}>
        <View style={styles.recentTripsHeader}>
          <Text variant="titleMedium">Recent Trips</Text>
        </View>
        <AsyncStateWrapper loading={isFetching} error={error}>
          <ScrollView>
            {recentTrips
              ? recentTrips.map((trip) => (
                  <Pressable
                    style={styles.recentTrip}
                    key={trip.id}
                    onPress={() =>
                      router.push({
                        pathname: `${DEFAULT_APP_PATH}/[selectedTrip]/details`,
                        params: { selectedTrip: trip.id },
                      })
                    }
                  >
                    <View>
                      <Text variant="bodyLarge">{trip.title}</Text>
                      <Text style={{ color: theme.colors.secondary }}>{trip.mountain}</Text>
                      <Text style={{ color: theme.colors.secondary }}>
                        {formatDateRangeShort(trip.startDate, trip.endDate)}
                      </Text>
                    </View>
                    <Icon source="ski" size={24} color={theme.colors.onSurfaceVariant} />
                  </Pressable>
                ))
              : null}
          </ScrollView>
        </AsyncStateWrapper>
      </View>

      <FriendsListModal visible={friendsModalVisible} setVisible={setFriendsModalVisible} />
      <ProfileEditModal visible={editModalVisible} callback={() => setEditModalVisible(false)} />

      {/* <AsyncStateWrapper loading={isFetching} error={error}>
        <FlatList
          data={recentTrips}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <Trip trip={item} />}
          ListEmptyComponent={<Text>No Items</Text>}
        />
        </AsyncStateWrapper> */}
    </View>
  );
}
