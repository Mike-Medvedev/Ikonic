import React, { useMemo, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Logo from "@/ui/Logo";
import { Button, useTheme, Text, TextInput as PaperInput } from "react-native-paper";
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

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      center: {
        justifyContent: "center",
        alignItems: "center",
      },
      phoneInput: { marginTop: 20 },
      sendButton: { flex: 1, justifyContent: "center", alignItems: "center" },
      header: { textTransform: "capitalize", color: theme.colors.primary, paddingVertical: 14 },
      header2: { textTransform: "capitalize", color: theme.colors.tertiary, paddingVertical: 14 },
      label: { color: theme.colors.secondary },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Background>
        <PercentLayout percentLayout={[[10], [30, styles.center], [30, styles.center], [20, styles.sendButton], [10]]}>
          <></>
          <Logo />
          <>
            <Text variant="headlineMedium" style={styles.header}>
              Enter Your Phone Number
            </Text>
            <Text variant="labelLarge" style={styles.label}>
              We will send you a 6 digit verification code
            </Text>

            <TextInput
              style={styles.phoneInput}
              label="Enter Phone Number"
              returnKeyType="done"
              value={loginForm.phoneNumber.value}
              onChangeText={(text) =>
                setLoginForm((prev) => ({
                  ...prev,
                  phoneNumber: { value: text, error: "" },
                }))
              }
              error={!!loginForm.phoneNumber.error}
              errorText={loginForm.phoneNumber.error}
              autoCapitalize="none"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              maxLength={10}
              left={<PaperInput.Affix text="+1" textStyle={{ color: theme.colors.secondary }} />}
            />
          </>

          <Button mode="contained" onPress={handleLogin}>
            Send Code
          </Button>
          <></>
        </PercentLayout>

        {/* <TextInput
          label="Password"
          returnKeyType="done"
          value={loginForm.password.value}
          onChangeText={(text) => setLoginForm((prev) => ({ ...prev, password: { value: text, error: "" } }))}
          error={!!loginForm.password.error}
          errorText={loginForm.password.error}
          secureTextEntry
        /> */}
      </Background>
    </View>
  );
}
