import { useTripContext } from "@/context/TripContext";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button, useTheme, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TripDatePicker() {
  const { startDate, setStartDate, endDate, setEndDate } = useTripContext();
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = React.useCallback(({ startDate, endDate }: { startDate: any; endDate: any }) => {
    setOpen(false);
    setRange({ startDate, endDate });
    setStartDate(startDate);
    setEndDate(endDate);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          gap: 20,
        }}
      >
        <TextInput
          placeholder="Select Date Range"
          value={startDate && endDate ? `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}` : ""}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          right={
            <TextInput.Icon
              icon={({ size, color }) => <AntDesign name="calendar" size={size} color={color} />}
              onPress={() => setOpen(true)}
            />
          }
        />

        <DatePickerModal
          presentationStyle={"pageSheet"}
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          validRange={{ startDate: new Date(), endDate: undefined }}
          startYear={2023}
          endYear={2024}
          placeholder="HIHIHI"
        />
      </View>
    </SafeAreaView>
  );
}
