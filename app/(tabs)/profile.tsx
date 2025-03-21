import PhoneNumberForm from "@/components/PhoneNumberForm";
import ProfileStatus from "@/components/ProfileComponents/ProfileStatus";
import useProfile from "@/hooks/useProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
const Profile = () => {
  const [isActivityTabSelected, setisActivityTabSelected] = useState(false);
  const { profile, isLoading, error } = useProfile();

  if (isLoading || !profile) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Image source={require("@/assets/images/mike.png")} style={styles.AvatarImage} />
          <View>
            <Text style={{ color: "#ffffff", fontSize: 20 }}>{`${profile.firstname} ${profile.lastname}`}</Text>
          </View>
        </View>
        <View style={styles.ProfileTabContainer}>
          <View style={styles.ProfileTab}>
            <Text
              style={[styles.selectedTab, isActivityTabSelected ? {} : { borderBottomColor: "red" }]}
              onPress={() => setisActivityTabSelected((prev) => !prev)}
            >
              Status
            </Text>
            <Text
              style={[styles.selectedTab, isActivityTabSelected ? { borderBottomColor: "red" } : {}]}
              onPress={() => setisActivityTabSelected((prev) => !prev)}
            >
              Activity
            </Text>
          </View>
        </View>
        <ProfileStatus />
        <View>
          <PhoneNumberForm />
        </View>
      </View>
    </KeyboardAvoidingView>
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
