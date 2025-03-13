import ProfileStatus from "@/components/ProfileComponents/ProfileStatus";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
const Profile = () => {
  const [isActivityTabSelected, setisActivityTabSelected] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Image source={require("@/assets/images/mike.png")} style={styles.AvatarImage} />
        <View>
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Michael Medvedev</Text>
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
      <ScrollView>
        <ProfileStatus />
      </ScrollView>
    </View>
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
