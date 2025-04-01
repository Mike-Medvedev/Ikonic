import useLocalStorage from "@/hooks/useLocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
export default function RSVP() {
  const params = useLocalSearchParams();
  const { retrieve } = useLocalStorage<string>({ key: "user_id" });
  const tripId = params.selectedTrip;
  async function handleRSVP(userResponse: string) {
    try {
      const user_id = await retrieve();
      if (!user_id) throw new Error("Please sign in to RSVP");
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user_id,
        },
        body: JSON.stringify({ trip_id: tripId, user_response: userResponse }),
      });
      if (!response.ok) throw new Error("Error RSVPing");
      Alert.alert("Successfully Rsvped!");
      window.alert("Successfully Rsvped!");
      router.replace(`/trips/${tripId}`);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
      console.error(error);
    }
  }
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text variant="displayMedium" style={{ marginBottom: 30 }}>
        You have been invited to michaels trip🎉
      </Text>
      <Text variant="displaySmall">Rsvp here</Text>
      <View style={{ flexDirection: "row", gap: 40, marginVertical: 40 }}>
        <Button mode="contained" onPress={() => handleRSVP("going")}>
          Going✅
        </Button>
        <Button mode="contained" onPress={() => handleRSVP("maybe")}>
          Maybe🤔
        </Button>
        <Button mode="contained" onPress={() => handleRSVP("not_going")}>
          Cant🚫
        </Button>
      </View>
    </View>
  );
}
