import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Logo from "@/ui/Logo";
import { Button, useTheme } from "react-native-paper";
import { nameValidator, passwordValidator, phoneValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/ui/TextInput";
import Background from "@/ui/Background";
import { ExternalPathString, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SimpleForm } from "@/models/SimpleForm";
import { supabase } from "@/utils/Supabase";

export interface LoginForm {
  phoneNumber: SimpleForm<string>;
  password: SimpleForm<string>;
}

export default function LoginPage() {
  const theme = useTheme();
  const { login, isLoggingIn } = useAuth();
  const { callback: rsvpPathCallback } = useLocalSearchParams();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    phoneNumber: { value: "", error: "" },
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
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: loginForm.phoneNumber.value,
    });
    console.log(data);

    router.push("/verify");
    // const { data: asf, error: erq } = await supabase.auth.verifyOtp({ phone: loginForm.username.value, token, type: 'sms'})
    // console.log(data);

    // const isLoginSuccessful = await login(loginForm.username.value, loginForm.password.value);

    // if (isLoginSuccessful) {
    //   //if a user clicks on an rsvp link and logs in, redirect to rsvp page
    //   rsvpPathCallback ? router.navigate(rsvpPathCallback as ExternalPathString) : router.navigate("/");
    // } else {
    //   setLoginForm((prev) => ({
    //     ...prev,
    //     username: { value: prev.username.value, error: "Account not found. Please try again!" },
    //   }));
    // }
  };

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

  return (
    <View style={styles.container}>
      <Background>
        <Logo />

        <Text style={styles.header}>Welcome</Text>

        <TextInput
          label="Enter Phone Number"
          returnKeyType="next"
          value={loginForm.phoneNumber.value}
          onChangeText={(text) => setLoginForm((prev) => ({ ...prev, phoneNumber: { value: text, error: "" } }))}
          error={!!loginForm.phoneNumber.error}
          errorText={loginForm.phoneNumber.error}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />

        {/* <TextInput
          label="Password"
          returnKeyType="done"
          value={loginForm.password.value}
          onChangeText={(text) => setLoginForm((prev) => ({ ...prev, password: { value: text, error: "" } }))}
          error={!!loginForm.password.error}
          errorText={loginForm.password.error}
          secureTextEntry
        /> */}

        <Button mode="contained" onPress={handleLogin} loading={isLoggingIn}>
          Send Code
        </Button>
      </Background>
    </View>
  );
}
