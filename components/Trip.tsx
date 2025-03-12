import { View, Text, Image } from "react-native";
interface Trip {
  mountain: string;
  date: { startDate: Date; endDate: Date };
}

interface TripProps {
  trip: Trip;
}
const Trip = ({ trip }: TripProps) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20, gap: 10 }}>
      <Image
        source={require("@/assets/images/snow1.jpeg")}
        style={{ width: 100, height: 100 }}
      />
      <View style={{ gap: 10 }}>
        <Text>{trip.mountain} Trip</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text>{trip.date.startDate.toDateString()}</Text>
          <Text>-</Text>
          <Text>{trip.date.endDate.toDateString()}</Text>
        </View>
      </View>
    </View>
  );
};

export default Trip;
