import Background from "@/ui/Background";
import { useMemo, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useTheme, Text, ActivityIndicator } from "react-native-paper";
import OTPForm from "@/ui/OTPForm";
import BackButton from "@/ui/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import TitleText from "@/ui/TitleText";
import { Card } from "@/ui/Card";

/**
 * Render the UI for the verify page
 */
export default function VerifyView() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { verifyOTP } = useAuth();
  const { phoneNumber } = useLocalSearchParams() as { phoneNumber: string };
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      center: { alignItems: "center", justifyContent: "center" },
      header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: "bold",
        paddingVertical: 14,
      },
      backButtonContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    });
  }, [theme]);

  /**
   * Event Handler for verifying a SMS otp input by the user
   * @todo fix phone verification, since we will support us numbers only
   */
  async function handleVerify() {
    setIsLoading(true);
    const phone = `1${phoneNumber}`;
    const otp = code.join("");
    await verifyOTP(phone, otp);

    setIsLoading(false);
  }

  const handleResendCode = async () => {
    router.replace({
      pathname: "/(auth)/login",
    });
  };
  return (
    <View style={styles.container}>
      <Background>
        <View>
          <TitleText welcomeText="Verify Your Number" headline1="Enter The" headline2="6-Digit Code" />
          <View style={{ marginTop: 23 }}>
            <Text style={{ color: theme.colors.secondary }}>We sent a code to {phoneNumber}</Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <Card>
              <OTPForm code={code} setCode={setCode} />
              <Pressable
                style={{
                  width: "100%",
                  padding: 15,
                  borderRadius: 12,
                  backgroundColor: theme.colors.surface,
                  alignItems: "center",
                }}
                onPress={handleVerify}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text variant="headlineSmall" style={{ color: theme.colors.onError }}>
                    Continue
                  </Text>
                )}
              </Pressable>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: theme.colors.secondary }}>Didn&apos;t recieve code?</Text>
                <Text style={{ color: theme.colors.primary }}>Resend Code</Text>
              </View>
            </Card>
          </View>
          <Pressable onPress={handleResendCode}>
            <BackButton style={{ marginTop: 50, alignSelf: "center" }} />
          </Pressable>
        </View>
      </Background>
    </View>
  );
}
