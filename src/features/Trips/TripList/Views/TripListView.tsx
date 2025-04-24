import Trip from "@/features/Trips/TripList/Components/Trip";
import TripListHeader from "@/features/Trips/TripList/Components/TripListHeader";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import Background from "@/ui/Background";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import { TripService } from "@/features/Trips/Services/tripService";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { ApiError, NetworkError, errors } from "@/lib/errors";
import { router } from "expo-router";
import { LOGIN_PATH } from "@/constants/constants";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
export default function TripListView() {
  const theme = useTheme();
  // prettier-ignore
  const { data: trips, isLoading, isFetching, isError, error, refetch} = useQuery({
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
        <AsyncStateWrapper isLoading={isFetching} error={error}>
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
  container: {
    padding: 10,
    flex: 1,
  },
});
