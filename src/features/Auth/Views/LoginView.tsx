import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { useTheme, TextInput as PaperInput, Avatar, Text, ActivityIndicator } from "react-native-paper";
import { phoneValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import TextInput from "@/ui/TextInput";
import Background from "@/ui/Background";
import { SimpleForm } from "@/types";
import useToast from "@/hooks/useToast";
import AvatarGlowImage from "@/ui/AvatarGlowImage";
import { Card } from "@/ui/Card";
import TitleText from "@/ui/TitleText";

export interface LoginForm {
  phoneNumber: SimpleForm<string>;
  countryCode: SimpleForm<string>;
  password: SimpleForm<string>;
}

/**
 * Render the UI for the login page
 */
export default function LoginView() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useToast();
  const { signIn } = useAuth();
  // const { callback: rsvpPathCallback } = useLocalSearchParams();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    phoneNumber: { value: "", error: "" },
    countryCode: { value: "1", error: "" },
    password: { value: "", error: "" },
  });

  /**
   * Helper Function that validates whether a phone number is a valid number
   */
  function validateLogin() {
    const phoneError = phoneValidator(loginForm.phoneNumber.value);
    // const passwordError = passwordValidator(loginForm.password.value);

    if (phoneError) {
      setLoginForm((prev) => ({
        ...prev,
        phoneNumber: { value: prev.phoneNumber.value, error: phoneError },
      }));
      // setLoginForm((prev) => ({ ...prev, password: { value: prev.password.value, error: passwordError } }));
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    if (!validateLogin()) return;
    const phoneNumber = `${loginForm.countryCode.value}${loginForm.phoneNumber.value}`;

    await signIn(phoneNumber);

    setIsLoading(false);

    showSuccess({
      message: "We sent you a OTP",
      url: "/(auth)/verify",
      params: { phoneNumber: loginForm.phoneNumber.value },
    });
  };

  const handlePhoneChange = useCallback(
    (text) => {
      setLoginForm((prev) => ({
        ...prev,
        phoneNumber: { value: text, error: "" },
      }));
    },
    [setLoginForm],
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
            <AvatarGlowImage imageUri="@/assets/images/penguin.png" size={100} glowColor="#00e5ff" glowIntensity={15} />
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
                <Text variant="titleMedium" style={{ color: theme.colors.primary, fontFamily: "Poppins" }}>
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
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text variant="headlineSmall" style={{ color: theme.colors.onError }}>
                    Continue
                  </Text>
                )}
              </Pressable>
            </Card>
          </View>
        </View>
      </Background>
    </View>
  );
}
