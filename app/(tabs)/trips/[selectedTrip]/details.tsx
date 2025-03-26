import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Pressable, Modal } from "react-native";
import { Avatar, Button, Paragraph, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Background from "@/ui/Background";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useTripContext } from "@/context/TripContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, router } from "expo-router";
import UsersAvatarList from "@/components/UsersAvatarList";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditTripForm from "@/components/EditTripForm";
import TripDetailsModal from "@/components/TripDetailsModal";
import * as ImagePicker from "expo-image-picker";

export default function TripDetails() {
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const { setTrips } = useTripContext();
  const [isOwner, setOwner] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>("");
  const { trips } = useTripContext();
  const selectedTrip = trips.find((trip) => {
    return trip.id == selectedTripID;
  });
  useEffect(() => {
    AsyncStorage.getItem("user_id").then((result) => {
      console.log(selectedTrip);
      if (result && selectedTrip && result === selectedTrip.owner) {
        setOwner(result);
      }
    });
  }, [selectedTrip]);
  if (!selectedTrip) return <Text>selected Trip doesnt exist in db</Text>;
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      height: "100%",
      width: "100%",
      flex: 1,
      alignItems: "center",
    },
    iconText: { flexDirection: "row", gap: 10 },
    link: {},
  });
  async function handleSubmit(image: string) {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedTripID}/update-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: image ? image : null }),
      });
      if (!response.ok) throw new Error("Error updating trip details");
      const result = await response.json();
      setTrips((trips) =>
        trips.map((trip) =>
          trip.id === selectedTripID
            ? {
                ...trip,
                image: image.trim() ? image : trip.image,
              }
            : trip
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    await handleSubmit(result.assets[0].uri);
  };
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <ScrollView contentContainerStyle={styles.container}>
          {isOwner && (
            <Feather
              name="edit-3"
              size={24}
              color="black"
              style={{ alignSelf: "flex-end" }}
              onPress={() => setModalVisible(true)}
            />
          )}
          <Text style={{ fontSize: 40, marginBottom: 10 }}>{selectedTrip.title}</Text>
          <View style={{ height: "40%" }}>
            {selectedTrip.image ? (
              <Image source={{ uri: selectedTrip.image }} style={{ height: "100%", width: 400 }} resizeMode="contain" />
            ) : (
              <View style={styles.container}>
                <Button onPress={pickImage}>Pick an image from camera roll</Button>
                {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : null}
              </View>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.iconText}>
              <Ionicons name="location" size={24} color="black" />
              <Text variant="titleLarge">{selectedTrip.mountain}</Text>
            </View>
            <View style={styles.iconText}>
              <AntDesign name="calendar" size={24} color="black" />
              <Text variant="titleMedium">
                {selectedTrip.startDate.toDateString()} - {selectedTrip.endDate.toDateString()}
              </Text>
            </View>
          </View>
          <Pressable
            style={{ marginTop: 20, gap: 15, alignItems: "center" }}
            onPress={() => router.replace(`/trips/${selectedTripID}/attendance`)}
          >
            <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <Text>Whose Going?</Text>
              <AntDesign name="addusergroup" size={24} color="black" />
            </View>
            {<UsersAvatarList rsvp="going" />}
          </Pressable>
          <View style={{ alignSelf: "flex-start", marginVertical: 20 }}>
            <Text variant="headlineMedium">Description:</Text>
            <Paragraph>{selectedTrip.desc}</Paragraph>
          </View>
          <TripDetailsModal currentTrip={selectedTrip} visible={modalVisible} setVisible={setModalVisible} />
        </ScrollView>
      </View>
    </Background>
  );
}
