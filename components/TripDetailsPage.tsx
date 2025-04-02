import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Background from "@/ui/Background";
import { useLocalSearchParams } from "expo-router/build/hooks";
import TripDetailsModal from "@/components/EditTripModal";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectedTrip } from "@/http/TripApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import TripImage from "@/components/TripImage";
import EditButton from "@/components/EditButton";
import TripDetailsContent from "@/components/TripDetailsContent";
import TripAttendeesView from "@/components/TripAttendeesView";
import TripDescription from "@/components/TripDescription";
import EditTripModal from "@/components/EditTripModal";

export default function TripDetailsPage() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const [isOwner, setOwner] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>("");

  // prettier-ignore
  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", selectedTripID], queryFn: async () => {
      return fetchSelectedTrip(selectedTripID as string);
    },
    enabled: !!selectedTripID
  });

  useEffect(() => {
    if (!trip) return;
    retrieve().then((userId) => {
      console.log(trip.owner);
      setOwner(trip.owner === userId);
    });
  }, [trip]);

  // async function handleSubmit(image: string) {
  //   try {
  //     const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedTripID}/update-trip`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ image: image ? image : null }),
  //     });
  //     if (!response.ok) throw new Error("Error updating trip details");
  //     const result = await response.json();
  //     setTrips((trips) =>
  //       trips.map((trip) =>
  //         trip.id === selectedTripID
  //           ? {
  //               ...trip,
  //               image: image.trim() ? image : trip.image,
  //             }
  //           : trip
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
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
          <TripImage tripImage={trip.image} />
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
