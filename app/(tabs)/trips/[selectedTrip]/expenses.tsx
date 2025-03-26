import UsersAvatarList from "@/components/UsersAvatarList";
import Background from "@/ui/Background";
import { useState } from "react";
import { Alert, Linking, Pressable, View, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Paragraph,
  Surface,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { nameValidator } from "@/utils/validators";
import UsersAvatarPriceList from "@/components/UsersAvatarPriceList";
import CalculateInitials from "@/utils/CalculateInitials";
import { useTripContext } from "@/context/TripContext";
import PriceCheck from "@/components/PriceCheck";
import { useLocalSearchParams } from "expo-router";
import User from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Expenses() {
  const [airbnbLink, setLink] = useState<{ value: string; error: string }>({ value: "", error: "" });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { invitedUsers, trips, setInvitedUsers } = useTripContext();
  const { selectedTrip: selectedTripID } = useLocalSearchParams();
  const theme = useTheme();
  const selectedTrip = trips.find((trip) => {
    return trip.id == selectedTripID;
  });
  if (!selectedTrip) return <Text>selected Trip doesnt exist in db</Text>;

  async function togglePaid(user: User) {
    const currentUser = await AsyncStorage.getItem("user_id");
    if (currentUser != selectedTrip.owner) return;
    setLoading(true);
    setSelectedUser(user);
    const updatedPaidStatus = !user.paid;
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedTripID}/${user.user_id}/update-paid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_status: updatedPaidStatus }),
      });
      if (!response.ok) throw new Error("Error updating paid status");
      const result = await response.json();
      setInvitedUsers((prev) => ({
        ...prev,
        going: prev.going.map((u) => (u.user_id === user.user_id ? { ...u, paid: updatedPaidStatus } : u)),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleLinkSubmit() {
    if (nameValidator(airbnbLink.value)) return;
    setIsSubmitted(true);
  }

  const openAirbnbLink = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(url).catch(() => {
        Alert.alert("Failed to open URL");
      });
    } else {
      Alert.alert("Invalid URL", "Please provide a valid link that starts with http:// or https://");
    }
  };
  const styles = StyleSheet.create({
    link: {
      color: "#1B95E0", // typical blue link color
      textDecorationLine: "none",
      fontSize: 28,
      marginVertical: 8,
      textAlign: "center",
    },
    surfaceLeft: {
      padding: 8,
      height: 180,
      width: 165,
      justifyContent: "flex-end",
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: theme.colors.primary,
    },
    surfaceRight: {
      padding: 8,
      height: 180,
      width: 165,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: theme.colors.surface,
    },
    card: {
      marginVertical: 8,
      backgroundColor: theme.colors.surface,
    },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  const airbnb = {
    title: "Cozy Mountain Retreat",
    location: "Aspen, CO",
    rating: 4.8,
    imageUrl: require("@/assets/images/airbnb.png"), // Replace with the actual image URL.
    totalCost: 400, // Total lodging cost for the trip.
  };
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%", alignItems: "center" }}>
        {/* <View style={{ marginBottom: 50, width: "100%", alignItems: "center" }}>
          {isSubmitted ? (
            <View style={{ flexDirection: "row", width: "70%", alignItems: "center" }}>
              <View style={{ width: 24 }}></View>
              <Pressable onPress={() => openAirbnbLink(airbnbLink.value)} style={{ flex: 1 }}>
                <Text style={styles.link}>View Airbnb Listing</Text>
              </Pressable>
              <Feather name="edit-3" size={24} color="black" onPress={() => setIsSubmitted(false)} />
            </View>
          ) : (
            <TextInput
              mode="outlined"
              label="Enter Airbnb link"
              style={{ width: "80%" }}
              value={airbnbLink.value}
              error={!!airbnbLink.error}
              onChangeText={(text) => setLink({ value: text, error: "" })}
              right={
                <TextInput.Icon
                  icon={({ size, color }) => <AntDesign name="enter" size={24} color="black" />}
                  onPress={handleLinkSubmit}
                />
              }
            />
          )}
        </View> */}
        <View style={{ flexDirection: "row", gap: 10, flex: 1, alignItems: "center" }}>
          <Surface style={styles.surfaceLeft} elevation={4}>
            <View style={{ marginBottom: 50, marginLeft: 20 }}>
              <Text variant="headlineSmall" style={{ color: "white" }}>
                {`\$${selectedTrip.total_cost}`}
              </Text>
              <Text style={{ color: "white" }} variant="labelLarge">
                AirBnb Total Cost
              </Text>
            </View>
          </Surface>
          <Surface style={styles.surfaceRight} elevation={4}>
            <View style={{ width: "100%", height: "100%", justifyContent: "space-evenly", marginLeft: 30 }}>
              <UsersAvatarPriceList rsvp="going" />
              <Text style={{ color: theme.colors.secondary }}>Participants</Text>
            </View>
          </Surface>
        </View>
        <ScrollView style={{ width: 300, marginVertical: 30 }}>
          {invitedUsers["going"].map((user, index) => (
            <Pressable
              style={{ marginVertical: 10, alignItems: "center", width: "100%" }}
              key={index}
              onPress={() => togglePaid(user)}
            >
              <View style={{ width: "99%", position: "relative" }}>
                <Card
                  style={{
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <Card.Title
                    title={`${user.firstname} ${user.lastname}`}
                    titleStyle={{ textTransform: "capitalize" }}
                    right={(props) => (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 20,
                          gap: 10,
                        }}
                      >
                        <Text>{`\$${Math.floor(selectedTrip.total_cost / invitedUsers.going.length)}`}</Text>
                        <PriceCheck paid={user.paid} />
                      </View>
                    )}
                    left={(props) => (
                      <Avatar.Text
                        label={CalculateInitials(user.firstname, user.lastname)}
                        size={50}
                        labelStyle={{ fontSize: 22 }}
                      />
                    )}
                  />
                </Card>
                {isLoading && user.user_id === selectedUser?.user_id && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        {/* <View style={{ marginTop: 70, width: "100%", alignItems: "center" }}>
          <Text variant="displayMedium" style={{ marginVertical: 15 }}>
            Pay tracker
          </Text>
          <Text variant="labelLarge">Cost per person: ${100}</Text>
          <View style={{ padding: 20, alignItems: "center" }}>
            <UsersAvatarPriceList rsvp="going" />
          </View>
        </View> */}
      </View>
    </Background>
  );
}
