import { Pressable, View, TextInput as NativeInput, StyleSheet } from "react-native";
import { Icon, useTheme, IconButton } from "react-native-paper";
import { DividerText, Text } from "@/design-system/components";
import * as Clipboard from "expo-clipboard";
import useToast from "@/hooks/useToast";
import { useState } from "react";
import { SimpleForm } from "@/types";
import useInvite from "@/hooks/useInvite";
import { useLocalSearchParams } from "expo-router";
import PhoneInput, { Value } from "react-phone-number-input/react-native-input";
import { PhoneInputField } from "@/components/PhoneNumberInput";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import * as Linking from "expo-linking";
/**
 * Renders a Component to manually invite a user via phone number directly
 */
export default function ManualInvite() {
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const { inviteUsersMutation } = useInvite({
    options: {
      onError: (error) => {
        showFailure({ message: String(error) });
      },
      onSuccess: () => {
        showSuccess({ message: "Successfully invited User!" });
      },
      onSettled: () => {},
    },
  });
  const [phone, setPhone] = useState<SimpleForm<string>>({ value: "", error: "" });
  const inviteLink = Linking.createURL(`trips/${selectedTripId}/rsvp`, {
    scheme: "myapp",
    queryParams: { invite_token: selectedTripId },
    isTripleSlashed: true,
  });
  console.log(inviteLink);

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(inviteLink);
      showSuccess({ message: "Copied! Invite link copied to clipboard" });
    } catch (e) {
      console.error("Failed to copy text to clipboard", e);
      showFailure({ message: "Error, Could not copy link." });
    }
  };
  const styles = StyleSheet.create({
    label: { marginVertical: 8, color: theme.colors.secondary },
    linkLabel: { marginVertical: 8 },
    nativeInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.roundness,
      paddingHorizontal: 12,
      height: 50,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceVariant,
      overflow: "hidden",
    },
    nativeInput: {
      flex: 1,
      marginRight: 8,
      fontSize: 16,
      color: theme.colors.primary,
      textAlignVertical: "center",
    },
    iconContainer: {
      padding: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {},
  });
  function handlePhoneChange(value?: Value | undefined) {
    setPhone({
      value: value ?? "",
      error: "",
    });
  }

  function handleManualInvite(phone: string) {
    const isValidNumber = isPossiblePhoneNumber(phone);
    if (!isValidNumber) {
      setPhone((prev) => ({ ...prev, error: "Please enter a valid phone number" }));
      return;
    }
    inviteUsersMutation.mutate({
      tripId: selectedTripId,
      invitees: [{ type: "external", phoneNumber: phone }],
    });
  }

  return (
    <View>
      <Text style={styles.label}>Invite By Phone</Text>
      <View style={styles.inputContainer}>
        <PhoneInput
          country="US"
          value={phone.value}
          onChange={handlePhoneChange}
          error={!!phone.error}
          errorText={phone.error}
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={PhoneInputField as any}
          maxLength={16}
          rightIcon={
            <IconButton
              loading={inviteUsersMutation.isPending}
              disabled={inviteUsersMutation.isPending}
              onPress={() => handleManualInvite(phone.value)}
              icon="send"
              size={24}
            />
          }
        />
      </View>
      <DividerText text="Or" />
      <Text style={[styles.linkLabel, styles.label]}>Share Link</Text>
      <View style={styles.nativeInputContainer}>
        <NativeInput value={inviteLink} style={styles.nativeInput} editable={false} />
        <Pressable onPress={copyToClipboard} style={styles.iconContainer}>
          <Icon source="content-copy" size={24} color={theme.colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}
