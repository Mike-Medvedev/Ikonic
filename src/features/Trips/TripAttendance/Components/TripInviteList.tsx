import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Card, TextInput, Button, Avatar, ActivityIndicator, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import CalculateInitials from "@/utils/CalculateInitials";
import { UserPublic } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/features/Profile/Services/userService";
import { InviteService } from "@/features/Trips/Services/inviteService";
export default function TripInviteList() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["users"], queryFn: UserService.getAll, initialData: [] });
  const [isInviteSending, setIsInviteSending] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | undefined>(undefined);
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter((user) => user.firstname.toLowerCase().includes(searchTerm.toLowerCase()));

  async function handleInvite(user: UserPublic) {
    setIsInviteSending(true);
    console.log(user);
    const deepLink = Linking.createURL(`trips/${selectedTripId}/rsvp`);
    try {
      await InviteService.inviteUser(Number(selectedTripId), user.id, { deepLink });
      Alert.alert("Invite Sent Successfully!");
    } catch (error) {
      Alert.alert("Error: Invite Failed");
      // throw new Error("Error inviting user: " + user.user_id + String(error));
    } finally {
      setIsInviteSending(false);
    }
  }

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <Text>Error: {error.message}</Text>;
  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{ marginBottom: 15 }}
        mode="outlined"
        label={"Search Friends"}
        right={<TextInput.Icon icon={() => <AntDesign name="search1" size={24} color="black" />} />}
      />
      <ScrollView style={{ padding: 10 }}>
        {filteredUsers.map((user, index) => (
          <Card key={index} style={{ marginVertical: 10 }}>
            <Card.Title
              title={`${user.firstname} ${user.lastname}`}
              titleStyle={{ textTransform: "capitalize" }}
              left={() => <Avatar.Text size={44} label={CalculateInitials(user.firstname, user.lastname)} />}
              right={() => (
                <Button
                  mode="contained"
                  onPress={() => {
                    setSelectedButtonIndex(index);
                    handleInvite(user);
                  }}
                  loading={isInviteSending && index === selectedButtonIndex}
                >
                  Add
                </Button>
              )}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
});
