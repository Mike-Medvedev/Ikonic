import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Appbar } from "react-native-paper";
import OTPForm from "@/features/Auth/Components/OTPForm";
import { ExternalPathString, useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import useToast from "@/hooks/useToast";

import { Text, Button } from "@/design-system/components";
import useLocalStorage from "@/hooks/useLocalStorage";

/**
 * Render the UI for the verify page
 * @todo CANT ALLOW PHONENUMBER FROM URL params TO RECIEVE A TEXT
 */
export default function VerifyView() {
  const theme = useTheme();
  const { get, remove } = useLocalStorage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, verifyOTP } = useAuth();
  const { showSuccess, showFailure } = useToast();
  const { phoneNumber } = useLocalSearchParams() as { phoneNumber: string }; //very unsafe
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  /**
   * Event Handler for verifying a SMS otp input by the user
   * @todo fix phone verification, since we will support us numbers only
   */
  async function handleVerify() {
    if (code.some((digit) => digit === "")) {
      showFailure({ message: "Please fill all 6 digits." });
      return;
    }
    setIsLoading(true);
    try {
      const phone = phoneNumber;
      const otp = code.join("");
      const { error } = await verifyOTP(phone, otp);
      if (error) {
        showFailure({ message: `Error Invalid or Expired Code please try again: ${error.message}` });
      } else {
        const { data, error } = await get<ExternalPathString>({ key: "rsvp_callback" });
        const intendedPath = data;

        // Attempt to remove the key regardless of whether it was found or if redirection will use it
        const { error: removeError } = await remove({ key: "rsvp_callback" });
        if (removeError) {
          console.error("Error removing rsvp_callback from storage:", removeError);
        }
        if (error !== undefined) {
          console.error(error);
          showFailure({ message: "Error Getting intended path", url: "/" });
        }
        if (intendedPath) {
          router.replace(intendedPath);
        } else {
          router.replace("/");
        }
      }
    } catch (unexpectedError) {
      console.error("Unexpected verification error:", unexpectedError);
      showFailure({ message: "An unexpected error occurred during verification." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = async () => {
    try {
      const { error } = await signIn(phoneNumber);
      if (error) {
        showFailure({ message: `Error We could not send you a text! Details: ${error.message}` });
      } else {
        showSuccess({
          message: "We sent you another OTP",
        });
      }
    } catch (unexpectedError) {
      console.error("Unexpected login error:", unexpectedError);
      showFailure({ message: "An unexpected error occurred during login." });
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerText: { textAlign: "center", marginVertical: 4 },
    label: { color: theme.colors.secondary },
    resendCodeContainer: { marginVertical: 16 },
    resendCode: { fontWeight: 600, textDecorationLine: "underline" },
  });
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
      </Appbar.Header>
      <Text variant="headlineSmall" style={styles.centerText}>
        Verify Your Number
      </Text>
      <Text variant="labelLarge" style={styles.centerText}>
        We&apos;ve sent a code to {phoneNumber}
      </Text>
      <OTPForm code={code} setCode={setCode} />
      <Button mode="contained" onPress={handleVerify} loading={isLoading} disabled={isLoading}>
        Verify
      </Button>
      <Text style={[styles.label, styles.centerText, styles.resendCodeContainer]}>
        Didn&apos;t receive code?
        <Text onPress={handleResendCode} style={styles.resendCode}>
          Resend
        </Text>
      </Text>
    </View>
  );
}
