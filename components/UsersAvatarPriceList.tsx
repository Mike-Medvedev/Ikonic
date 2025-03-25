import { useTripContext } from "@/context/TripContext";
import { useUsers } from "@/hooks/useUsers";
import CalculateInitials from "@/utils/CalculateInitials";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import PriceCheck from "./PriceCheck";

type RSVPStatus = "going" | "maybe" | "not_going";

export default function UsersAvatarPriceList({ rsvp }: { rsvp: RSVPStatus }) {
  const { setAttendanceNumbers, invitedUsers, setInvitedUsers } = useTripContext();
  console.log("HERE IS RSVP STATUS!", rsvp);
  const params = useLocalSearchParams();
  console.log(params);
  useEffect(() => {
    if (!params.selectedTrip) return;
    (async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/invited-users/${params.selectedTrip}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "any",
        },
      });
      if (!response.ok) throw new Error("Error fetching users for selected trip");
      const result = await response.json();
      console.log(result);
      setInvitedUsers(result.invited_users);
      setAttendanceNumbers({
        going: result.invited_users.going.length,
        maybe: result.invited_users.maybe.length,
        notGoing: result.invited_users.not_going.length,
      });
    })();
  }, [params.selectedTrip]);
  //   if (isLoading) {
  //     return <ActivityIndicator />;
  //   }

  //   if (error) {
  //     return <Text>Error: {error.message}</Text>;
  //   }
  return (
    <View style={{ flexDirection: "row" }}>
      {invitedUsers[rsvp] && (
        <>
          {invitedUsers[rsvp].map((user, index) => (
            <View style={{ alignItems: "center", gap: 10 }} key={index}>
              <Avatar.Text
                key={user.user_id}
                label={CalculateInitials(user.firstname, user.lastname)}
                size={50}
                labelStyle={{ fontSize: 22 }}
                style={{ marginLeft: -15, borderColor: "black", borderWidth: 1 }}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
}
// import { useTripContext } from "@/context/TripContext";
// import { useUsers } from "@/hooks/useUsers";
// import CalculateInitials from "@/utils/CalculateInitials";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { Avatar, Text } from "react-native-paper";
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import PriceCheck from "./PriceCheck";

// type RSVPStatus = "going" | "maybe" | "not_going";

// export default function UsersAvatarPriceList({ rsvp }: { rsvp: RSVPStatus }) {
//   const { setAttendanceNumbers, invitedUsers, setInvitedUsers } = useTripContext();
//   console.log("HERE IS RSVP STATUS!", rsvp);
//   const params = useLocalSearchParams();
//   console.log(params);
//   useEffect(() => {
//     if (!params.selectedTrip) return;
//     (async () => {
//       const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/invited-users/${params.selectedTrip}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "any",
//         },
//       });
//       if (!response.ok) throw new Error("Error fetching users for selected trip");
//       const result = await response.json();
//       console.log(result);
//       setInvitedUsers(result.invited_users);
//       setAttendanceNumbers({
//         going: result.invited_users.going.length,
//         maybe: result.invited_users.maybe.length,
//         notGoing: result.invited_users.not_going.length,
//       });
//     })();
//   }, [params.selectedTrip]);
//   //   if (isLoading) {
//   //     return <ActivityIndicator />;
//   //   }

//   //   if (error) {
//   //     return <Text>Error: {error.message}</Text>;
//   //   }
//   return (
//     <View style={{ flexDirection: "row", gap: 25, overflow: "hidden" }}>
//       {invitedUsers[rsvp] && (
//         <>
//           {invitedUsers[rsvp].map((user, index) => (
//             <View style={{ alignItems: "center", gap: 10 }}>
//               <Avatar.Text
//                 key={user.user_id}
//                 label={CalculateInitials(user.firstname, user.lastname)}
//                 size={50}
//                 labelStyle={{ fontSize: 22 }}
//               />
//               <View style={{ flexDirection: "row" }}>
//                 {/* <FontAwesome6 name="sack-dollar" size={24} color="green" />
//                 <Text>94</Text> */}
//                 <PriceCheck paid={index / 2 == 0} />
//               </View>
//             </View>
//           ))}
//         </>
//       )}
//     </View>
//   );
// }
