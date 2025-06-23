import Trip from "@/features/Trips/TripList/Components/Trip";
import TripListHeader from "@/features/Trips/TripList/Components/TripListHeader";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { TripService } from "@/features/Trips/Services/tripService";
import { Text, useTheme } from "react-native-paper";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import Background from "@/design-system/components/Background";
import { TripPublicParsed } from "@/types";

/**
 * Render the UI for the page that displays List of selectable Trips and their quick information
 */
export default function TripListView() {
  const theme = useTheme();
  // prettier-ignore
  const { data: trips, isFetching, error, refetch} = useQuery({
    queryKey: ["trips"], queryFn: async () => {
      return TripService.getAll();
    },
    staleTime: 60 * 1000 //1 hour cache
   });

  // Get current date at midnight for consistent comparison
  const now = new Date();
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Filter for active and upcoming trips
  const activeAndUpcomingTrips = trips?.filter((trip) => {
    // Trip is active or upcoming if it hasn't ended yet
    return trip.endDate >= currentDate;
  });

  // Sort by start date (closest first)
  const sortedTrips = activeAndUpcomingTrips?.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const emptyFallback = () => {
    return <Text style={{ color: theme.colors.secondary, opacity: 0.5 }}>No Trips Planned Yet</Text>;
  };

  const renderTripItem = ({ item }: { item: TripPublicParsed }) => {
    // Check if trip is currently active
    const isActive = currentDate >= item.startDate && currentDate <= item.endDate;

    return <Trip trip={item} isActive={isActive} />;
  };

  return (
    <Background>
      <View style={styles.container}>
        <TripListHeader tripLength={activeAndUpcomingTrips?.length ?? 0} />
        <AsyncStateWrapper loading={isFetching} error={error}>
          <FlatList
            data={sortedTrips}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderTripItem}
            onRefresh={refetch}
            refreshing={isFetching}
            ListEmptyComponent={emptyFallback}
          />
        </AsyncStateWrapper>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
