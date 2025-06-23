import { Pressable, View, StyleSheet } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { TripCreateForm, TripComponentProps, TripUpdateForm } from "@/types";
import { useState, useCallback } from "react";
import { Text } from "@/design-system/components";
import { TimePickerModal } from "react-native-paper-dates";
import { calculateTimeFromHoursAndMinutes } from "@/utils/dateUtils";
/**
 * Renders a date selection component that allows users to choose a date for a trip during planning
 * @todo review the date transformations in the confirmation handler and any data type
 */
export default function TripDatePicker<T extends TripCreateForm | TripUpdateForm>({
  tripForm,
  setTripForm,
}: TripComponentProps<T>) {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: tripForm?.startDate?.value,
    endDate: tripForm?.endDate?.value,
  });
  const [timeRange, setTimeRange] = useState<{ startTime: string; endTime?: string }>({ startTime: "" });
  const theme = useTheme();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const onDismissTime = useCallback(() => {
    setOpenTimePicker(false);
  }, [setOpenTimePicker]);

  const onConfirmTime = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setOpenTimePicker(false);
      setTimeRange({ startTime: calculateTimeFromHoursAndMinutes(hours, minutes) });
      setTripForm((prev) => ({
        ...prev,
        startTime: { value: `${hours}:${minutes}` },
      }));
    },
    [setOpenTimePicker],
  );

  const onDismissDate = useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  const onConfirmDate = useCallback(
    ({ startDate, endDate }: { startDate: Date | undefined; endDate: Date | undefined }) => {
      console.log(startDate, endDate);
      setOpenDatePicker(false);
      setDateRange({ startDate, endDate });

      const finalStartDate = startDate
        ? new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())
        : undefined;

      const finalEndDate = endDate
        ? new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())
        : undefined;

      setTripForm((prev) => ({
        ...prev,
        startDate: { value: finalStartDate, error: "" },
        endDate: { value: finalEndDate, error: "" },
      }));
    },
    [setOpenDatePicker, setDateRange, setTripForm],
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
      <View style={{ flexDirection: "row", marginVertical: 16, justifyContent: "space-between" }}>
        <Pressable
          onPress={() => setOpenDatePicker(true)}
          style={[
            styles.datePicker,
            !!tripForm?.startDate?.error || !!tripForm?.endDate?.error ? styles.error : undefined,
          ]}
        >
          <Text style={tripForm?.startDate?.value && tripForm?.endDate?.value ? undefined : styles.placeholder}>
            {tripForm?.startDate?.value && tripForm?.endDate?.value
              ? `${tripForm?.startDate?.value?.toLocaleDateString()} - ${tripForm?.endDate?.value?.toLocaleDateString()}`
              : "Select Dates"}
          </Text>

          <IconButton
            onPress={() => setOpenDatePicker(true)}
            icon="calendar"
            size={28}
            iconColor={theme.colors.onSurfaceVariant}
          />
        </Pressable>
        <Pressable onPress={() => setOpenTimePicker(true)} style={[styles.datePicker]}>
          <Text style={styles.placeholder}>
            {tripForm?.startTime && tripForm.startTime?.value ? `${timeRange.startTime}` : "Select Time"}
          </Text>

          <IconButton
            onPress={() => setOpenTimePicker(true)}
            icon="clock"
            size={28}
            iconColor={theme.colors.onSurfaceVariant}
          />
        </Pressable>
      </View>

      <DatePickerModal
        presentationStyle={"pageSheet"}
        locale="en"
        mode="range"
        visible={openDatePicker}
        onDismiss={onDismissDate}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onConfirm={onConfirmDate}
        validRange={{ startDate: today, endDate: undefined }}
        placeholder="HIHIHI"
      />
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <TimePickerModal
          visible={openTimePicker}
          onDismiss={onDismissTime}
          onConfirm={onConfirmTime}
          hours={12}
          minutes={14}
        />
      </View>
    </View>
  );
}
