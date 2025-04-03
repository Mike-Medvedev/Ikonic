import Background from "@/ui/Background";
import { supabase } from "@/utils/Supabase";
import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import OTPForm from "@/components/LoginComponents/OTPForm";
import BackButton from "@/ui/BackButton";
import { useLocalSearchParams } from "expo-router";
import PercentLayout from "@/ui/PercentLayout";
import Logo from "@/ui/Logo";

export default function VerifyCodePage() {
  const theme = useTheme();
  const { phoneNumber } = useLocalSearchParams() as { phoneNumber: string };
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const { data: asf, error: erq } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: code.join(""),
      type: "sms",
    });
    console.log(asf);
    console.log(erq);
    setLoading(false);
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
