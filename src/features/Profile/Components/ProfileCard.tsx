import { View, StyleSheet } from "react-native";
import { Avatar, Icon, useTheme } from "react-native-paper";
import { UserPublic } from "@/types";
import { Button, Text } from "@/design-system/components";
import CalculateInitials from "@/utils/CalculateInitials";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type riderType = "skier" | "boarder";

/**
 * Render the UI for Profile Information on the Profile Page
 */
export default function ProfileCard({ profile }: { profile: UserPublic }) {
  const [riderType, setSelectedRiderType] = useState<riderType>("skier");
  //prettier-ignore
  const { data: recentTrips, isFetching, error } = useQuery({ 
    queryKey: ["t"],
    queryFn: async () => null,
    enabled: false
  })
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { padding: 16 },
    profileCardContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
    profileCardContent: { gap: 8 },
    label: { textTransform: "capitalize", color: theme.colors.secondary, fontSize: 16 },
    squaresContainer: { flexDirection: "row", gap: 16, justifyContent: "space-evenly", marginVertical: 32 },
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
    riderTypeContainer: {
      borderWidth: 1,
      borderRadius: theme.roundness,
      borderColor: theme.colors.outlineVariant,
      paddingVertical: 8,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    recentTripsContainer: { marginVertical: 32 },
    recentTripsHeader: { flexDirection: "row", justifyContent: "space-between", marginVertical: 16 },
    recentTripsList: { gap: 16 },
    recentTrip: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      borderRadius: theme.roundness,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.profileCardContainer}>
        <Avatar.Text size={80} label={CalculateInitials(profile?.firstname ?? "?", profile?.lastname ?? "?")} />

        <View style={styles.profileCardContent}>
          <Text
            variant="titleLarge"
            style={{ textTransform: "capitalize" }}
          >{`${profile.firstname} ${profile.lastname}`}</Text>
          <Text style={styles.label}>Joined January 2025</Text>
        </View>
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
        <View style={styles.square}>
          <Text variant="headlineSmall">45</Text>
          <Text style={styles.squareLabel}>Friends</Text>
        </View>
      </View>

      <View style={styles.riderTypeContainer}>
        <Text style={styles.label}>Rider Type:</Text>
        <Button
          icon="ski"
          mode="text"
          textColor={riderType === "skier" ? undefined : theme.colors.onSurfaceVariant}
          onPress={() => setSelectedRiderType("skier")}
        >
          Skier
        </Button>
        <Button
          icon="snowboard"
          mode="text"
          textColor={riderType === "boarder" ? undefined : theme.colors.onSurfaceVariant}
          onPress={() => setSelectedRiderType("boarder")}
        >
          Snowboarder
        </Button>
      </View>
      <View style={styles.recentTripsContainer}>
        <View style={styles.recentTripsHeader}>
          <Text variant="titleMedium">Recent Trips</Text>
          <Text style={{ color: theme.colors.secondary }}>See All</Text>
        </View>
        <View style={styles.recentTripsList}>
          <View style={styles.recentTrip}>
            <View>
              <Text variant="bodyLarge">Winter Escape 2025</Text>
              <Text style={{ color: theme.colors.secondary }}>Whistler Blackcomb</Text>
              <Text style={{ color: theme.colors.secondary }}>Feb 15-22, 2025</Text>
            </View>
            <Icon source="ski" size={24} color={theme.colors.onSurfaceVariant} />
          </View>
        </View>
      </View>
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
