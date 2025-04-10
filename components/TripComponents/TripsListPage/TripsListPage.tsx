import Trip from "@/components/TripComponents/TripsListPage/Trip";
import TripListHeader from "@/components/TripComponents/TripsListPage/TripListHeader";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { fetchTrips } from "@/http/TripApi";
import Background from "@/ui/Background";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyTripsFallback from "@/components/TripComponents/EditTripPage/EmptyTripsFallback";
const TripsListPage = () => {
  // prettier-ignore
  const { data: trips, isLoading, refetch } = useQuery({
    queryKey: ["trips"], queryFn: async () => {
      return fetchTrips();
    },
    initialData: [],
  });

  useRefreshOnFocus(refetch);

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
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});
export default TripsListPage;
