import { View, Image, ScrollView, Pressable } from "react-native";
import { Avatar, Text, useTheme, Dialog, Portal } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import useCarpool from "@/hooks/useCarpool";
import useProfile from "@/hooks/useProfile";
import { Car as CarType } from "@/models/Car";
import { useState } from "react";
import { useTripContext } from "@/context/TripContext";
import CalculateInitials from "@/utils/CalculateInitials";

interface CarProps {
  isDeleteMode: boolean;
  car: CarType;
}
export default function Car({ isDeleteMode, car: currentCar }: CarProps) {
  const theme = useTheme();
  const { removeCar, addPassenger } = useCarpool();
  const { profile, isLoading } = useProfile();
  const [visible, setVisible] = useState<boolean>(false);
  const { invitedUsers } = useTripContext();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const hideDialog = () => setVisible(false);
  return (
    <View style={{ alignItems: "center", margin: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Text variant="labelLarge">{profile ? `${profile.firstname}'s Car` : isLoading}</Text>
        <AntDesign name="closecircleo" onPress={() => removeCar(currentCar.id)} size={20} color={theme.colors.error} />
      </View>

      <View style={{ position: "relative" }}>
        <Image source={require("@/assets/images/seats.png")} style={{ width: 100, height: 200 }} resizeMode="cover" />
        {currentCar.owner ? (
          <Image
            source={require("@/assets/images/mike.png")}
            style={{ width: 44, height: 44, position: "absolute", top: 80, left: 2, borderRadius: 60 }}
          />
        ) : (
          <Ionicons
            name="add-circle-outline"
            size={44}
            color="green"
            style={{ position: "absolute", top: 80, left: 2 }}
          />
        )}
        <Pressable
          style={{ position: "absolute", top: 80, right: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(2);
          }}
        >
          {currentCar.passengers[0] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[0].firstname, currentCar.passengers[0].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
        <Pressable
          style={{ position: "absolute", bottom: 30, right: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(3);
          }}
        >
          {currentCar.passengers[1] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[1].firstname, currentCar.passengers[1].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
        <Pressable
          style={{ position: "absolute", bottom: 30, left: 2 }}
          onPress={() => {
            setVisible(true);
            setSelectedSeat(4);
          }}
        >
          {currentCar.passengers[2] ? (
            <Avatar.Text
              label={CalculateInitials(currentCar.passengers[2].firstname, currentCar.passengers[2].lastname)}
              size={44}
              labelStyle={{ fontSize: 22 }}
            />
          ) : (
            <Ionicons name="add-circle-outline" size={44} color="green" />
          )}
        </Pressable>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.ScrollArea>
            <Text variant="titleLarge" style={{ marginVertical: 20 }}>
              Select Passenger
            </Text>
            <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 24, flexDirection: "row", gap: 5 }}>
              {invitedUsers.going.map((user, index) => (
                <Pressable
                  onPress={async () => {
                    if (!selectedSeat) return;
                    await addPassenger(currentCar.id, user, selectedSeat);
                    setVisible(false);
                  }}
                  key={index}
                >
                  <Avatar.Text
                    key={user.user_id}
                    label={CalculateInitials(user.firstname, user.lastname)}
                    size={50}
                    labelStyle={{ fontSize: 22 }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </View>
  );
}
