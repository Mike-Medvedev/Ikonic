import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Pressable, TextInput as BaseInput } from "react-native";
import { BlurView } from "expo-blur";
import Logo from "@/ui/Logo";
import { Button, useTheme, Text, TextInput as PaperInput, Avatar } from "react-native-paper";
import { nameValidator, passwordValidator, phoneValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/ui/TextInput";
import Background from "@/ui/Background";
import { ExternalPathString, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SimpleForm } from "@/models/SimpleForm";
import { supabase } from "@/utils/Supabase";
import PercentLayout from "@/ui/PercentLayout";
import { sendCode } from "@/http/AuthApi";
import useToast from "@/hooks/useToast";
import { LinearGradient } from "expo-linear-gradient";
import AvatarGlowImage from "@/ui/AvatarGlowImage";
import { Card } from "@/ui/Card";
import TitleText from "@/ui/TitleText";

export interface LoginForm {
  phoneNumber: SimpleForm<string>;
  countryCode: SimpleForm<string>;
  password: SimpleForm<string>;
}

export default function Login() {
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const { callback: rsvpPathCallback } = useLocalSearchParams();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    phoneNumber: { value: "", error: "" },
    countryCode: { value: "1", error: "" },
    password: { value: "", error: "" },
  });

  function validateLogin() {
    const phoneError = phoneValidator(loginForm.phoneNumber.value);
    // const passwordError = passwordValidator(loginForm.password.value);

    if (phoneError) {
      setLoginForm((prev) => ({ ...prev, phoneNumber: { value: prev.phoneNumber.value, error: phoneError } }));
      // setLoginForm((prev) => ({ ...prev, password: { value: prev.password.value, error: passwordError } }));
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if (!validateLogin()) return;
    const phoneNumber = `${loginForm.countryCode.value}${loginForm.phoneNumber.value}`;

    const { data, error } = await sendCode(phoneNumber);

    if (error) showFailure({ message: error.message });

    router.push({ pathname: "/verify", params: { phoneNumber: loginForm.phoneNumber.value } });
  };

  const handlePhoneChange = useCallback(
    (text) => {
      setLoginForm((prev) => ({
        ...prev,
        phoneNumber: { value: text, error: "" },
      }));
    },
    [setLoginForm]
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },

      center: {
        justifyContent: "center",
        alignItems: "center",
      },
      phoneInput: {
        borderColor: theme.colors.onSurface,
        backgroundColor: theme.colors.surface,
      },
      sendButton: { flex: 1, justifyContent: "center", alignItems: "center" },
      header: { textTransform: "capitalize", color: theme.colors.primary, paddingVertical: 14 },
      header2: { textTransform: "capitalize", color: theme.colors.tertiary, paddingVertical: 14 },
      label: { color: theme.colors.secondaryText },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Background>
        <View>
          <View style={{ flexDirection: "row", position: "relative" }}>
            <TitleText welcomeText="Welcome" headline1="Enter Your" headline2="Phone Number" />
            <AvatarGlowImage />
          </View>

          <View style={{ marginTop: 50 }}>
            {/* <Text variant="headlineMedium" style={styles.header}>
              Enter Your Phone Number
            </Text>
            <Text variant="labelLarge" style={styles.label}>
              We will send you a 6 digit verification code
            </Text> */}
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                <Avatar.Icon
                  icon="cellphone"
                  size={48}
                  color={theme.colors.primary}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderWidth: 1,
                    borderColor: theme.colors.onSurface,
                  }}
                />
                <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                  Welcome
                </Text>
              </View>

              <TextInput
                style={styles.phoneInput}
                label="Enter Phone Number"
                returnKeyType="done"
                value={loginForm.phoneNumber.value}
                onChangeText={handlePhoneChange}
                error={!!loginForm.phoneNumber.error}
                errorText={loginForm.phoneNumber.error}
                autoCapitalize="none"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                maxLength={10}
                left={<PaperInput.Affix text="+1" textStyle={{ color: theme.colors.secondary }} />}
              />
              <Text style={{ color: theme.colors.secondary, marginVertical: 8 }}>We will send you a one time code</Text>
              <Pressable
                style={{
                  width: "100%",
                  padding: 15,
                  borderRadius: 12,
                  backgroundColor: theme.colors.surface,
                  alignItems: "center",
                }}
                onPress={handleLogin}
              >
                <Text variant="headlineSmall" style={{ color: theme.colors.onError }}>
                  Continue
                </Text>
              </Pressable>
            </Card>
          </View>
        </View>
      </Background>
    </View>
  );
}
