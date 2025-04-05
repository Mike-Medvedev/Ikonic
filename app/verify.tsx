import Background from "@/ui/Background";
import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import OTPForm from "@/ui/OTPForm";
import BackButton from "@/ui/BackButton";
import { router, useLocalSearchParams } from "expo-router";
import PercentLayout from "@/ui/PercentLayout";
import Logo from "@/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { verifyCode } from "@/http/AuthApi";
import useToast from "@/hooks/useToast";

export default function Verify() {
  const theme = useTheme();
  const { loading, setLoading } = useAuth();
  const { showSuccess, showFailure } = useToast();
  const { phoneNumber } = useLocalSearchParams() as { phoneNumber: string };
  const [code, setCode] = useState<string[]>(Array(6).fill(""));

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      center: { alignItems: "center", justifyContent: "center" },
      header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
      backButtonContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    });
  }, [theme]);

  async function handleLogin() {
    setLoading(true); //sets to false in AuthStateSubscription
    const phone = `1${phoneNumber}`;
    const otp = code.join("");
    const { data, error } = await verifyCode(phone, otp);

    if (error) showFailure({ message: error.message });
  }
  return (
    <View style={styles.container}>
      <Background>
        <PercentLayout
          percentLayout={[
            [40, styles.center],
            [20, styles.center],
            [10, styles.backButtonContainer],
            [30, styles.center],
          ]}
        >
          <Logo />
          <OTPForm code={code} setCode={setCode} />
          <Button mode="contained" onPress={handleLogin} loading={loading}>
            Verify Code
          </Button>
          <BackButton />
        </PercentLayout>
      </Background>
    </View>
  );
}
