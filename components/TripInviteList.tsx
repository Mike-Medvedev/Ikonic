import Background from "@/ui/Background";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Card, Text, TextInput, Button, Avatar } from "react-native-paper";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import CalculateInitials from "@/utils/CalculateInitials";
import { useUsers } from "@/hooks/useUsers";
import User from "@/models/User";
export default function TripInviteList() {
  const { users, isLoading, error } = useUsers();
  const [isInviteSending, setIsInviteSending] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | undefined>(undefined);
  const tripID = useLocalSearchParams().selectedTrip;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
  });

  const filteredUsers = users.filter((user) => user.firstname.toLowerCase().includes(searchTerm.toLowerCase()));

  async function handleInvite(user: User) {
    setIsInviteSending(true);
    const deepLink = Linking.createURL(`trips/${tripID}/rsvp`);
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, deep_link: deepLink }),
    });
    if (!response.ok) {
      setIsInviteSending(false);
      throw new Error("Error inviting user: " + user.user_id);
    }
    Alert.alert("Invite Sent Successfully!");
    const result = await response.json();
    setIsInviteSending(false);
  }
  return (
    <View style={styles.container}>
      <TextInput
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{ marginBottom: 15 }}
        mode="outlined"
        label={"Search Friends"}
        right={<TextInput.Icon icon={({ size, color }) => <AntDesign name="search1" size={24} color="black" />} />}
      />
      <ScrollView style={{ padding: 10 }}>
        {filteredUsers.map((user, index) => (
          <Card key={index} style={{ marginVertical: 10 }}>
            <Card.Title
              title={`${user.firstname} ${user.lastname}`}
              titleStyle={{ textTransform: "capitalize" }}
              left={(props) => <Avatar.Text size={44} label={CalculateInitials(user.firstname, user.lastname)} />}
              right={(props) => (
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
