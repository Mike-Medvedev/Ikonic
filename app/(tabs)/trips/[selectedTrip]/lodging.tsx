import UsersAvatarList from "@/components/UsersAvatarList";
import Background from "@/ui/Background";
import { useState } from "react";
import { Alert, Linking, Pressable, View, StyleSheet } from "react-native";
import { Button, Card, Paragraph, Text, TextInput, Title } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { nameValidator } from "@/utils/validators";
import UsersAvatarPriceList from "@/components/UsersAvatarPriceList";
export default function TripLodging() {
  const [airbnbLink, setLink] = useState<{ value: string; error: string }>({ value: "", error: "" });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function handleLinkSubmit() {
    if (nameValidator(airbnbLink.value)) return;
    setIsSubmitted(true);
  }

  const openAirbnbLink = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      Linking.openURL(url).catch(() => {
        Alert.alert("Failed to open URL");
      });
    } else {
      Alert.alert("Invalid URL", "Please provide a valid link that starts with http:// or https://");
    }
  };
  const styles = StyleSheet.create({
    link: {
      color: "#1B95E0", // typical blue link color
      textDecorationLine: "none",
      fontSize: 28,
      marginVertical: 8,
      textAlign: "center",
    },
  });
  const airbnb = {
    title: "Cozy Mountain Retreat",
    location: "Aspen, CO",
    rating: 4.8,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Airbnb+Image", // Replace with the actual image URL.
    totalCost: 400, // Total lodging cost for the trip.
  };
  return (
    <Background>
      <View style={{ flex: 1, width: "100%", height: "100%", alignItems: "center" }}>
        {/* <Card>
          <Card.Cover source={require("@/assets/images/airbnb.png")} />
          <Card.Content>
            <Title>{airbnb.title}</Title>
            <Paragraph>{airbnb.location}</Paragraph>
            <Paragraph>Rating: {airbnb.rating} ⭐</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => console.log("View Details pressed")}>
              View Details
            </Button>
          </Card.Actions>
        </Card> */}
        {isSubmitted ? (
          <View style={{ flexDirection: "row", width: "70%", alignItems: "center" }}>
            <View style={{ width: 24 }}></View>
            <Pressable onPress={() => openAirbnbLink(airbnbLink.value)} style={{ flex: 1 }}>
              <Text style={styles.link}>View Airbnb Listing</Text>
            </Pressable>
            <Feather name="edit-3" size={24} color="black" onPress={() => setIsSubmitted(false)} />
          </View>
        ) : (
          <TextInput
            mode="outlined"
            label="Enter Airbnb link"
            style={{ width: "80%" }}
            value={airbnbLink.value}
            error={!!airbnbLink.error}
            onChangeText={(text) => setLink({ value: text, error: "" })}
            right={
              <TextInput.Icon
                icon={({ size, color }) => <AntDesign name="enter" size={24} color="black" />}
                onPress={handleLinkSubmit}
              />
            }
          />
        )}
        <View style={{ marginTop: 70, width: "100%", alignItems: "center" }}>
          <Text variant="displayMedium" style={{ marginVertical: 15 }}>
            Pay tracker
          </Text>
          <Text variant="labelLarge">Cost per person: ${100}</Text>
          <View style={{ padding: 20, alignItems: "center" }}>
            <UsersAvatarPriceList rsvp="going" />
          </View>
        </View>
      </View>
    </Background>
  );
}
