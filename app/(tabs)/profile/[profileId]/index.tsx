import PhoneNumberForm from "@/components/PhoneNumberForm";
import ProfileStatus from "@/components/ProfileComponents/ProfileStatus";
import useProfile from "@/hooks/useProfile";
import Background from "@/ui/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Avatar, Card, Divider, Text, useTheme } from "react-native-paper";
const Profile = () => {
  const [isActivityTabSelected, setisActivityTabSelected] = useState(false);
  const { profileId } = useLocalSearchParams();

  const theme = useTheme();
  const { profile, isLoading, error } = useProfile({ userId: Array.isArray(profileId) ? profileId[0] : profileId });

  if (!profileId) return <Text>Error no Profile Id found</Text>;

  if (isLoading || !profile) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={{ height: "15%", width: "100%", padding: 30 }}>
          <Text variant="headlineSmall" style={{ textAlign: "center" }}>
            Profile
          </Text>
          <Divider style={{ marginTop: 20 }} />
        </View>
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Card
            style={{
              backgroundColor: theme.colors.surface,
              marginVertical: 40,
            }}
          >
            <Card.Title
              title={`${profile.firstname} ${profile.lastname}`}
              titleStyle={{ textTransform: "capitalize" }}
              subtitle={profile.phone_number}
              left={(props) => <Avatar.Image {...props} source={require("@/assets/images/mike.png")} size={50} />}
            />
            <Card.Content>
              <PhoneNumberForm />
            </Card.Content>
          </Card>
        </View>
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#25292e",
  },
  AvatarImage: { width: 60, height: 60, borderRadius: 15, marginRight: 15 },
  ProfileTabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ProfileTab: {
    flexDirection: "row",
    gap: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#44494f",
  },
  selectedTab: {
    color: "#ffffff",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
});
export default Profile;
