import { View, Text, Image, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const ContentPost = () => {
  return (
    <View style={styles.ContentPostContainer}>
      <View style={{ flexDirection: "row", gap: 5, marginBottom: 20 }}>
        <Image
          source={require("@/assets/images/mike.png")}
          style={styles.AvatarImage}
        />
        <View>
          <Text style={{ color: "#ffffff" }}>Michael Medvedev</Text>
          <Text style={{ color: "#ffffff", fontSize: 10 }}>
            Today at 11:30pm - Stamford, Connecticut
          </Text>
        </View>
      </View>
      <View style={{ gap: 20 }}>
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: 700 }}>
          Going To Stratton Tomorrow
        </Text>
        <Text style={{ color: "#ffffff", fontSize: 10 }}>
          Who tryna hit up stratton parks?
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <AntDesign name="like2" size={24} color="white" />
        <FontAwesome5 name="comment-alt" size={24} color="white" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ContentPostContainer: {
    height: 200,
    backgroundColor: "#383c40",
    padding: 10,
    marginVertical: 5,
  },
  AvatarImage: { width: 40, height: 40, borderRadius: 15 },
});
export default ContentPost;
