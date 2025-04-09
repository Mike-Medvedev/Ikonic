import React, { useMemo, useState } from "react";
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
  const TitleText = () => {
    theme;
    return (
      <View style={{ marginBottom: 100 }}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginBottom: 15 }}>
          <Avatar.Icon
            icon="phone"
            size={48}
            color="black" // icon color (can be theme-based)
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Welcome Back
          </Text>
        </View>
        <View>
          <Text variant="displayMedium" style={{ color: theme.colors.text }}>
            Enter Your
          </Text>
          <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
            Phone Number
          </Text>
        </View>
      </View>
    );
  };

  const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
  };

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      card: {
        width: 400,
        gap: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.10)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.4,
        shadowRadius: 40,
        elevation: 20,
        padding: 20, // for Android shadow
        // backdrop-filter is not supported directly in React Native
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
          <View
            style={{
              position: "absolute",
              width: 800,
              height: 800,
              borderWidth: 2,
              borderRadius: 120000,
              borderColor: "rgba(255, 255, 255, 0.02)",
              top: -70,
              left: -260,
              bottom: 0,
              right: 0,
            }}
          ></View>
          <View style={{ flexDirection: "row", position: "relative" }}>
            <TitleText />
            <AvatarGlowImage />
          </View>

          <View>
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
                  Welcome Back
                </Text>
              </View>

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
              <Text style={{ color: theme.colors.secondary }}>We will send you a one time code</Text>
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

          {/* <Button mode="contained" onPress={handleLogin}>
            Send Code
          </Button> */}
        </View>

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
