import Background from "@/ui/Background";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button, Avatar } from "react-native-paper";
export default function TripAttendance() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
  });
  const friends = [
    { firstname: "Mike", lastname: "Medvedev", userId: "6556cf1c-88e7-4f6a-bff7-b8be7d546628" },
    { firstname: "Johnny", lastname: "Roslin", userId: "6556cf1c-88e7-4f6a-bff7-b8be7d546628" },
  ];
  const filteredUsers = friends.filter((friend) => friend.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
  function CalculateInitials(firstname: string, lastname: string, middlename?: string) {
    return (firstname[0] + lastname[0] + (middlename?.[0] ?? "")).toUpperCase();
  }
  async function handleInvite(userId: string) {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) throw new Error("Error inviting user: " + userId);
  }
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <TextInput
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={{ marginBottom: 15 }}
            mode="outlined"
            label={"Search Friends"}
            right={<TextInput.Icon icon={({ size, color }) => <AntDesign name="search1" size={24} color="black" />} />}
          />
          <View style={{ gap: 15 }}>
            {filteredUsers.map((friend, index) => (
              <Card key={index}>
                <Card.Title
                  title={`${friend.firstname} ${friend.lastname}`}
                  left={(props) => (
                    <Avatar.Text size={44} label={CalculateInitials(friend.firstname, friend.lastname)} />
                  )}
                />
                <Card.Actions>
                  <Button mode="contained" onPress={() => handleInvite(friend.userId)}>
                    Invite
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Background>
  );
}
