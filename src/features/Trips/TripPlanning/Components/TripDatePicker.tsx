import { Pressable, View, StyleSheet } from "react-native";
import { useTheme, HelperText } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NewTripForm, TripComponentProps, TripUpdateForm } from "@/types";
import { useState, useCallback } from "react";
import { Text } from "@/design-system/components";
/**
 * Renders a date selection component that allows users to choose a date for a trip during planning
 * @todo review the date transformations in the confirmation handler and any data type
 */
export default function TripDatePicker<T extends NewTripForm | TripUpdateForm>({
  tripForm,
  setTripForm,
}: TripComponentProps<T>) {
  const [range, setRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: tripForm?.startDate?.value,
    endDate: tripForm?.endDate?.value,
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirm = useCallback(
    ({ startDate, endDate }: { startDate: Date | undefined; endDate: Date | undefined }) => {
      setOpen(false);
      setRange({ startDate, endDate });

      const finalStartDate = startDate
        ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        : undefined;

      const finalEndDate = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : undefined;

      setTripForm((prev) => ({
        ...prev,
        startDate: { value: finalStartDate, error: "" },
        endDate: { value: finalEndDate, error: "" },
      }));
    },
    [setOpen, setRange, setTripForm],
  );

  const styles = StyleSheet.create({
    datePicker: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      padding: 12,
      zIndex: -1,
    },
    placeholder: { color: theme.colors.onSurfaceVariant },
    error: { borderColor: theme.colors.error },
  });

  return (
    <View style={{ zIndex: -2 }}>
      <View>
        <Pressable
          onPress={() => setOpen(true)}
          style={[
            styles.datePicker,
            !!tripForm?.startDate?.error || !!tripForm?.endDate?.error ? styles.error : undefined,
          ]}
        >
          <Text style={tripForm?.startDate?.value && tripForm?.endDate?.value ? undefined : styles.placeholder}>
            {tripForm?.startDate?.value && tripForm?.endDate?.value
              ? `${tripForm?.startDate?.value?.toLocaleDateString()} - ${tripForm?.endDate?.value?.toLocaleDateString()}`
              : "Select Date Range"}
          </Text>

          <AntDesign name="calendar" size={28} color={theme.colors.onSurfaceVariant} />
        </Pressable>
        <HelperText type="error" visible={!!tripForm?.startDate?.error || !!tripForm?.endDate?.error}>
          {tripForm?.startDate?.error || tripForm?.endDate?.error}
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
  );
}
