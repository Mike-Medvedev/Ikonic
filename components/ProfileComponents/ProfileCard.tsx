import { View } from "react-native";
import { Avatar, Card, useTheme } from "react-native-paper";
import { User } from "@/models/User";

export default function ProfileCard({ profile }: { profile: User }) {
  const theme = useTheme();
  return (
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
        {/* <Card.Content>
          <PhoneNumberForm profile={profile} />
        </Card.Content> */}
      </Card>
    </View>
  );
}
