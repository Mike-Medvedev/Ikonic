import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Background from "@/ui/Background";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectedTrip } from "@/http/TripApi";
import TripImage from "@/features/Trips/TripDetails/Components/TripImage";
import EditButton from "@/ui/EditButton";
import TripDetailsContent from "@/features/Trips/TripDetails/Components/TripDetailsContent";
import TripAttendeesView from "@/features/Trips/TripDetails/Components/TripAttendeesView";
import TripDescription from "@/features/Trips/TripDetails/Components/TripDescription";
import EditTripModal from "@/features/Trips/TripDetails/Components/EditTripModal";
import useUser from "@/hooks/useUser";

export default function TripDetailsView() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { getUserId } = useUser();
  const [isOwner, setOwner] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  // prettier-ignore
  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", Number(selectedTripID)], queryFn: async () => {
      return fetchSelectedTrip(selectedTripID as string);
    },
    enabled: !!selectedTripID
  });

  useEffect(() => {
    console.log("hoit trip details");
    console.log(selectedTripID);
    (async () => {
      if (!trip) return;
      // setOwner(trip.owner.user_id === (await getUserId()));
      setOwner(true);
    })();
  }, [trip]);

  if (isLoading) return <ActivityIndicator />;

  if (isError || !trip) {
    return <Text>Trip not found.</Text>;
  }
  return (
    <Background>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {isOwner && <EditButton onPress={() => setModalVisible(true)} />}
          <Text style={styles.tripTitle}>{trip.title}</Text>
          <TripImage tripImage={trip.image} currentTripId={Number(selectedTripID)} />
          <TripDetailsContent trip={trip} />
          <TripAttendeesView selectedTripID={selectedTripID as string} />
          <TripDescription tripDesc={trip.desc} />
          <EditTripModal currentTrip={trip} visible={modalVisible} setVisible={setModalVisible} />
        </ScrollView>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  scrollContainer: {
    padding: 20,
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  tripTitle: { fontSize: 40, marginBottom: 10 },
});
