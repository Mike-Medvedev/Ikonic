import Trip from "@/features/Trips/TripList/Components/Trip";
import TripListHeader from "@/features/Trips/TripList/Components/TripListHeader";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { TripService } from "@/features/Trips/Services/tripService";
import { Text, useTheme } from "react-native-paper";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import Background from "@/design-system/components/Background";
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
  });
  // useRefreshOnFocus(refetch);

  const emptyFallback = () => {
    return <Text style={{ color: theme.colors.secondary, opacity: 0.5 }}>No Trips Planned Yet</Text>;
  };
  return (
    <Background>
      <View style={styles.container}>
        <TripListHeader tripLength={trips?.length ?? 0} />
        <AsyncStateWrapper loading={isFetching} error={error}>
          <FlatList
            data={trips}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => <Trip trip={item} />}
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
  container: { flex: 1, paddingHorizontal: 16 },
});
