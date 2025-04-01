import Trip from "@/components/Trip";
import { useTripContext } from "@/context/TripContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import Background from "@/ui/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
const Trips = () => {
  const { trips, setTrips } = useTripContext(); //memoize
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { retrieve } = useLocalStorage({ key: "user_id" });
  const fetchTrips = async () => {
    setIsLoading(true);
    try {
      const userID = await retrieve(); //make custom hok for getting async storage stuff
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/get-trips`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "any",
          authorization: `${userID}`,
        },
      });
      if (!response.ok) throw new Error("Error Fetching trips");
      const data = await response.json();
      const tripsWithDates = data.trips.map((trip) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: new Date(trip.endDate),
      }));
      setTrips(tripsWithDates);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const styles = StyleSheet.create({
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
    container: {
      padding: 10,
      flex: 1,
    },
  });
  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [])
  );
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
          onRefresh={async () => fetchTrips()}
          refreshing={isLoading}
        />
      </View>
    </Background>
  );
};
export default Trips;
