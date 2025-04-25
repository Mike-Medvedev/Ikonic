import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Background from "@/ui/Background";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import TripImage from "@/features/Trips/TripDetails/Components/TripImage";
import EditButton from "@/ui/EditButton";
import TripDetailsContent from "@/features/Trips/TripDetails/Components/TripDetailsContent";
import TripAttendeesView from "@/features/Trips/TripDetails/Components/TripAttendeesView";
import TripDescription from "@/features/Trips/TripDetails/Components/TripDescription";
import EditTripModal from "@/features/Trips/TripDetails/Components/EditTripModal";
import useUser from "@/hooks/useUser";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";

export default function TripDetailsView() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { getUserId } = useUser();
  const [isOwner, setOwner] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  // prettier-ignore
  const { data: trip, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["trip", selectedTripID], queryFn: async () => {
      return TripService.getOne(selectedTripID as string);
    },
    enabled: !!selectedTripID
  });

  useEffect(() => {
    (async () => {
      if (!trip) return;
      // setOwner(trip.owner.user_id === (await getUserId()));
      setOwner(true);
    })();
  }, [trip]);

  // if (isLoading) return <ActivityIndicator />;

  // if (isError || !trip) {
  //   return <Text>Trip not found.</Text>;
  // }
  return (
    <Background>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AsyncStateWrapper isLoading={isFetching} error={error}>
            {isOwner && <EditButton onPress={() => setModalVisible(true)} />}
            <Text style={styles.tripTitle}>{trip?.title}</Text>
            <TripImage tripImage={trip?.image} currentTripId={selectedTripID} />
            <TripDetailsContent trip={trip} />
            <TripAttendeesView selectedTripID={selectedTripID as string} />
            <TripDescription tripDesc={trip?.desc} />
            <EditTripModal currentTrip={trip} visible={modalVisible} setVisible={setModalVisible} />
          </AsyncStateWrapper>
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
