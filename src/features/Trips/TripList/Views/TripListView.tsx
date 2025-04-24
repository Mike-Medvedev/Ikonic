import Trip from "@/features/Trips/TripList/Components/Trip";
import TripListHeader from "@/features/Trips/TripList/Components/TripListHeader";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import Background from "@/ui/Background";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyTripsFallback from "@/features/Trips/TripDetails/Components/EmptyTripsFallback";
import { TripService } from "@/features/Trips/Services/tripService";
import { ActivityIndicator, Text } from "react-native-paper";
import { ApiError, NetworkError, errors } from "@/lib/errors";
import { router } from "expo-router";
import { LOGIN_PATH } from "@/constants/constants";
export default function TripListView() {
  // prettier-ignore
  const { data: trips, isLoading, refetch } = useQuery({
    queryKey: ["trips"], queryFn: async () => {
      return TripService.getAll();
    },
    initialData: [],
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
