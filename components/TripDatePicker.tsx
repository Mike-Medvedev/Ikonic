import { useTripContext } from "@/context/TripContext";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripDatePicker() {
  const { setDate } = useTripContext();
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

  const onConfirm = React.useCallback(
    ({ startDate, endDate }: { startDate: any; endDate: any }) => {
      setOpen(false);
      setRange({ startDate, endDate });
      setDate({ startDate: startDate, endDate: endDate });
    },
    []
  );

  return (
    <SafeAreaView>
      <View
        style={{
          gap: 20,
        }}
      >
        <Button
          onPress={() => setOpen(true)}
          uppercase={false}
          mode="contained-tonal"
        >
          Select a Date
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
          startYear={2023}
          endYear={2024}
        />

        {range.startDate instanceof Date && range.endDate instanceof Date ? (
          <>
            <Text style={{ fontSize: 16, marginTop: 16 }}>Date Selected</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text>{range.startDate.toDateString()}</Text>
              <Text> - </Text>
              <Text>{range.endDate.toDateString()}</Text>
            </View>
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
