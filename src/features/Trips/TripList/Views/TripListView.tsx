import Trip from "@/features/Trips/TripList/Components/Trip";
import TripListHeader from "@/features/Trips/TripList/Components/TripListHeader";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import Background from "@/ui/Background";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyTripsFallback from "@/features/Trips/TripDetails/Components/EmptyTripsFallback";
import { TripService } from "@/features/Trips/Services/tripService";
import { ActivityIndicator, Text } from "react-native-paper";
export default function TripListView() {
  // prettier-ignore
  const { data: trips, isLoading, refetch, error } = useQuery({
    queryKey: ["trips"], queryFn: async () => {
      return TripService.getAll();
    },
    retry: false,
    throwOnError: true
  });
  useRefreshOnFocus(refetch);

  if (isLoading) return <ActivityIndicator />;

  return (
    <Background>
      <View style={styles.container}>
        <TripListHeader tripLength={trips.length} />
        <FlatList
          data={trips}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <Trip trip={item} />}
          onRefresh={refetch}
          refreshing={isLoading}
          ListEmptyComponent={EmptyTripsFallback}
        />
        {error && <Text style={{ color: "red" }}>{error.message}</Text>}
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
