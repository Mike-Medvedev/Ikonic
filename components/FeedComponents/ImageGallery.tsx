import { ScrollView, Image, Text, View, StyleSheet } from "react-native";

const img1 = require("@/assets/images/snow1.jpeg");
const img2 = require("@/assets/images/snow2.jpeg");
const img3 = require("@/assets/images/snow3.jpeg");
const ImageGallery = () => {
  return (
    <ScrollView
      style={{ flexDirection: "row", marginVertical: 30 }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <Image source={img1} style={styles.FeedImage} />

      <Image source={img2} style={styles.FeedImage} />

      <Image source={img3} style={styles.FeedImage} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  FeedImage: {
    width: 200,
    height: 300,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});
export default ImageGallery;
