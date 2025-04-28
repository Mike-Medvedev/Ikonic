import React, { useMemo, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";
import OTPForm from "@/features/Auth/Components/OTPForm";
import BackButton from "@/design-system/components/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import TitleText from "@/design-system/components/TitleText";
import { Card } from "@/design-system/components/Card";
import useToast from "@/hooks/useToast";
import { LOGIN_PATH } from "@/constants/constants";

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

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      },
      subHeaderContainer: {
        marginTop: 23,
        alignItems: "center",
      },
      subHeaderText: {
        color: theme.colors.secondary,
      },
      cardContainer: {
        marginTop: 50,
      },
      verifyButton: {
        width: "100%",
        padding: 15,
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        marginTop: 24,
      },
      verifyButtonText: {
        color: theme.colors.onPrimary,
      },
      resendContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
      },
      secondaryText: {
        color: theme.colors.secondary,
      },
      primaryTextLink: {
        color: theme.colors.primary,
        fontWeight: "bold",
      },
      backButton: {
        marginTop: 50,
        alignSelf: "center",
      },
    });
  }, [theme]);

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

  return (
    <View style={styles.container}>
      <TitleText welcomeText="Verify Your Number" headline1="Enter The" headline2="6-Digit Code" />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>We sent a code to +1 {phoneNumber}</Text>
      </View>

      <View style={styles.cardContainer}>
        <Card>
          <OTPForm code={code} setCode={setCode} />
          <Pressable style={styles.verifyButton} onPress={handleVerify} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator animating={true} color={theme.colors.onPrimary} />
            ) : (
              <Text variant="headlineSmall" style={styles.verifyButtonText}>
                Continue
              </Text>
            )}
          </Pressable>
          <View style={styles.resendContainer}>
            <Text style={styles.secondaryText}>Didn&apos;t receive code?</Text>
            <Pressable onPress={handleResendCode} disabled={isLoading}>
              <Text style={styles.primaryTextLink}>Resend Code</Text>
            </Pressable>
          </View>
        </Card>
      </View>
      <Pressable onPress={() => router.back()} disabled={isLoading}>
        <BackButton style={styles.backButton} />
      </Pressable>
    </View>
  );
}
