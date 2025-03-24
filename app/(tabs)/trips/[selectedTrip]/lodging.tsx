// import Background from "@/ui/Background";
// import { View } from "react-native";
// import { Text } from "react-native-paper";
// export default function TripLodging() {
//   return (
//     <Background>
//       <View style={{ flex: 1, width: "100%", height: "100%" }}>
//         <Text>Lodging!</Text>
//       </View>
//     </Background>
//   );
// }
import Background from "@/ui/Background";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button, Text, IconButton } from "react-native-paper";

export default function Lodging() {
  const airbnb = {
    title: "Cozy Mountain Retreat",
    location: "Aspen, CO",
    rating: 4.8,
    imageUrl: require("@/assets/images/airbnb.png"),
    totalCost: 400,
  };

  const [guests, setGuests] = useState(2);

  const costPerPerson = (airbnb.totalCost / guests).toFixed(2);

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  return (
    <Background>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={airbnb.imageUrl} />
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
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Lodging Cost Forecast</Title>
            <Paragraph>Total Cost: ${airbnb.totalCost}</Paragraph>
            <Paragraph>Guests: {guests}</Paragraph>
            <Paragraph>Cost Per Person: ${costPerPerson}</Paragraph>
            <View style={styles.guestControls}>
              <IconButton icon="minus" size={20} onPress={decrementGuests} />
              <Text style={styles.guestText}>{guests}</Text>
              <IconButton icon="plus" size={20} onPress={incrementGuests} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    marginVertical: 8,
  },
  guestControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  guestText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
});
