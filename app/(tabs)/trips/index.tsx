import Trip from "@/components/Trip";
import { useTripContext } from "@/context/TripContext";
import Background from "@/ui/Background";
import { StyleSheet, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
const Trips = () => {
  const { trips } = useTripContext();
  const theme = useTheme();

  const styles = StyleSheet.create({
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
    container: {
      padding: 10,
      flex: 1,
    },
  });
  return (
    <Background>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 350,
            margin: 10,
          }}
        >
          <Text variant="headlineLarge" style={styles.header}>
            Upcoming Trips
          </Text>
          <Badge
            size={30}
            style={{
              alignSelf: "flex-start",
              backgroundColor: theme.colors.background,
              color: theme.colors.primary,
            }}
          >
            {trips.length}
          </Badge>
        </View>
        <View style={{ gap: 10 }}>
          {trips.map((trip, index) => (
            <Trip key={index} trip={trip} />
          ))}
        </View>
      </View>
    </Background>
  );
};
export default Trips;
