import React from "react";
import { View } from "react-native";
import { useTheme, TextInput, HelperText } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NewTripForm } from "@/models/TripModel";

interface TripDatePickerProps {
  tripForm: NewTripForm;
  setTripForm: React.Dispatch<React.SetStateAction<NewTripForm>>;
}

export default function TripDatePicker({ tripForm, setTripForm }: TripDatePickerProps) {
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
    setTripForm((prev) => ({
      ...prev,
      startDate: { value: startDate, error: "" },
      endDate: { value: endDate, error: "" },
    }));
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          gap: 20,
        }}
      >
        <View>
          <TextInput
            placeholder="Select Date Range"
            value={
              tripForm.startDate.value && tripForm.endDate.value
                ? `${tripForm.startDate?.value?.toLocaleDateString()} - ${tripForm.endDate?.value?.toLocaleDateString()}`
                : ""
            }
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            mode="outlined"
            error={!!tripForm.startDate.error || !!tripForm.endDate.error}
            right={
              <TextInput.Icon
                icon={({ size, color }) => <AntDesign name="calendar" size={size} color={color} />}
                onPress={() => setOpen(true)}
              />
            }
          />
          <HelperText type="error" visible={!!tripForm.startDate.error || !!tripForm.endDate.error}>
            {tripForm.startDate.error || tripForm.endDate.error}
          </HelperText>
        </View>

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
