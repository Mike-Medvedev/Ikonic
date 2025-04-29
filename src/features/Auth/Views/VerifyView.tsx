import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Appbar } from "react-native-paper";
import OTPForm from "@/features/Auth/Components/OTPForm";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import useToast from "@/hooks/useToast";
import { LOGIN_PATH } from "@/constants/constants";
import Button from "@/design-system/components/Button";
import Text from "@/design-system/components/Text";

/**
 * Render the UI for the verify page
 */
export default function VerifyView() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { verifyOTP } = useAuth();
  const { showFailure } = useToast();
  const { phoneNumber } = useLocalSearchParams() as { phoneNumber: string };
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
      const phone = `1${phoneNumber}`;
      const otp = code.join("");
      const { error } = await verifyOTP(phone, otp);
      if (error) {
        showFailure({ message: `Error Invalid or Expired Code please try again: ${error.message}` });
      }
    } catch (unexpectedError) {
      console.error("Unexpected verification error:", unexpectedError);
      showFailure({ message: "An unexpected error occurred during verification." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = () => {
    router.replace({
      pathname: LOGIN_PATH,
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerText: { textAlign: "center", marginVertical: 4 },
    label: { color: theme.colors.secondary },
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
        We&apos;ve sent a code to {`+1 ${phoneNumber}`}
      </Text>
      <OTPForm code={code} setCode={setCode} />
      <Button mode="contained" onPress={handleVerify} loading={isLoading} disabled={isLoading}>
        Verify
      </Button>
      <Text style={[styles.label, styles.centerText]}>
        Didn&apos;t receive code? <Text onPress={handleResendCode}>Resend</Text>
      </Text>
    </View>
  );
}
