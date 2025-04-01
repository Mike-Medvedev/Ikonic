import Trip from "@/components/Trip";
import { useTripContext } from "@/context/TripContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { fetchTrips } from "@/http/TripApi";
import Background from "@/ui/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
const Trips = () => {
  const { setTrips } = useTripContext();
  const theme = useTheme();

  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const {
    data: trips,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const userID = await retrieve();
      return fetchTrips(userID);
    },
    initialData: [],
  });

  const styles = StyleSheet.create({
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
    container: {
      padding: 10,
      flex: 1,
    },
  });
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTrips();
  //   }, [])
  // );
  return (
    <Background>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 350,
            margin: 10,
          }}
        >
          <Text variant="headlineLarge" style={styles.header}>
            Upcoming Trips
          </Text>
          <Badge
            size={30}
            style={{
              alignSelf: "flex-start",
              backgroundColor: theme.colors.background,
              color: theme.colors.primary,
            }}
          >
            {trips.length}
          </Badge>
        </View>
        <FlatList
          data={trips}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => <Trip trip={item} />}
          onRefresh={refetch}
          refreshing={isLoading}
        />
      </View>
    </Background>
  );
};
export default Trips;
