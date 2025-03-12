import ContentPost from "@/components/FeedComponents/ContentPost";
import ContentPostImage from "@/components/FeedComponents/ContestPostImage";
import { View, StyleSheet, ScrollView } from "react-native";

const Feed = () => {
  return (
    <ScrollView style={styles.container}>
      <ContentPost />
      <ContentPostImage />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#25292e",
  },
});
export default Feed;
