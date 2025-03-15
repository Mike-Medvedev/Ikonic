import { useTripContext } from "@/context/TripContext";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripDatePicker() {
  const { date, setDate } = useTripContext();
  const [range, setRange] = React.useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const [open, setOpen] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = React.useCallback(({ startDate, endDate }: { startDate: any; endDate: any }) => {
    setOpen(false);
    setRange({ startDate, endDate });
    setDate({ startDate: startDate, endDate: endDate });
    console.log(date);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          gap: 20,
        }}
      >
        <Button onPress={() => setOpen(true)} uppercase={false} mode="contained-tonal">
          Select Date Range
        </Button>
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
