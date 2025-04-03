import Background from "@/ui/Background";
import { supabase } from "@/utils/Supabase";
import { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import OTPForm from "@/components/LoginComponents/OTPForm";

export default function VerifyCodePage() {
  const theme = useTheme();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
    });
  }, [theme]);

  async function handleLogin() {
    setLoading(true);
    const { data: asf, error: erq } = await supabase.auth.verifyOtp({ phone: "12038587135", token: code, type: "sms" });
    console.log(asf);
    console.log(erq);
    setLoading(false);
  }
  return (
    <View style={styles.container}>
      <Background>
        <OTPForm />
        {/* <TextInput
          mode="outlined"
          label="Enter Code"
          returnKeyType="next"
          value={code}
          onChangeText={(text) => setCode(text)}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        /> */}
        <Button mode="contained" onPress={handleLogin} loading={loading}>
          Verify Code
        </Button>
      </Background>
    </View>
  );
}
