import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, TextInput as PaperInput } from "react-native-paper";
import { phoneValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import { SimpleForm } from "@/types";
import useToast from "@/hooks/useToast";
import Text from "@/design-system/components/Text";
import TextInput from "@/design-system/components/TextInput";
import Button from "@/design-system/components/Button";
import DividerWithText from "@/design-system/components/DividerText";
export interface LoginForm {
  phoneNumber: SimpleForm<string>;
  countryCode: SimpleForm<string>;
}

/**
 * Render the UI for the login page
 */
export default function LoginView() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showFailure } = useToast();
  const { signIn } = useAuth();
  // const { callback: rsvpPathCallback } = useLocalSearchParams(); // Example usage if needed
  const [loginForm, setLoginForm] = useState<LoginForm>({
    phoneNumber: { value: "", error: "" },
    countryCode: { value: "1", error: "" },
  });

  /**
   * Helper Function that validates whether a phone number is a valid number
   */
  function validateLogin(): boolean {
    const phoneError = phoneValidator(loginForm.phoneNumber.value);
    if (phoneError) {
      setLoginForm((prev) => ({
        ...prev,
        phoneNumber: { value: prev.phoneNumber.value, error: phoneError },
      }));
      return false;
    }
    return true;
  }

  async function handleLogin() {
    if (!validateLogin()) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const phoneNumber = `${loginForm.countryCode.value}${loginForm.phoneNumber.value}`;

      const { error } = await signIn(phoneNumber);
      if (error) {
        showFailure({ message: `Error We could not send you a text! Details: ${error.message}` });
      } else {
        showSuccess({
          message: "We sent you a OTP",
          url: "/(auth)/verify",
          params: { phoneNumber: loginForm.phoneNumber.value },
        });
      }
    } catch (unexpectedError) {
      console.error("Unexpected login error:", unexpectedError);
      showFailure({ message: "An unexpected error occurred during login." });
    } finally {
      setIsLoading(false);
    }
  }

  function handlePhoneChange(text: string) {
    setLoginForm((prev) => ({
      ...prev,
      phoneNumber: { value: text, error: "" },
    }));
  }

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      headerGroup: {
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
      },
      cardContainer: {
        width: "90%",
        maxWidth: 400,
        marginTop: 50,
      },
      cardContentContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        marginBottom: 20,
      },
      avatarIcon: {
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderWidth: 1,
        borderColor: theme.colors.onSurface,
      },
      welcomeText: {
        color: theme.colors.primary,
        fontFamily: "Poppins",
      },
      phoneInput: {
        borderColor: theme.colors.onSurface,
        backgroundColor: theme.colors.surface,
        marginBottom: 8,
      },
      affixText: {
        color: theme.colors.secondary,
      },
      label: {
        color: theme.colors.secondary,
      },
      loginButton: {
        width: "100%",
        padding: 15,
        borderRadius: 12,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
      },
      loginButtonText: {
        color: theme.colors.onPrimary,
      },
      buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Welcome to SnowTrip</Text>
      <Text variant="labelLarge" style={styles.label}>
        Sign in to plan your next mountain adventure
      </Text>
      <Text variant="labelLarge" style={styles.label}>
        Phone Number
      </Text>
      <TextInput placeholder="(555) 000-000" left={<PaperInput.Affix textStyle={styles.label} text="+1" />} />
      <Button mode="contained">Continue with Phone</Button>
      <DividerWithText text="Or continue with" />
      <View style={styles.buttonGroup}>
        <Button icon="google" mode="outlined">
          {" "}
          Google
        </Button>
        <Button icon="apple" mode="outlined">
          Apple
        </Button>
      </View>

      {/* <View style={styles.headerGroup}>
        <TitleText welcomeText="Welcome" headline1="Enter Your" headline2="Phone Number" />
        <AvatarGlowImage size={100} glowColor="#00e5ff" glowIntensity={15} />
      </View>

      <View style={styles.cardContainer}>
        <Card>
          <View style={styles.cardContentContainer}>
            <Avatar.Icon icon="cellphone" size={48} color={theme.colors.primary} style={styles.avatarIcon} />
            <Text variant="titleMedium" style={styles.welcomeText}>
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
            left={<PaperInput.Affix text="+1 " textStyle={styles.affixText} />}
          />
          <Text style={styles.label}>We will send you a one time code</Text>
          <Pressable style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator animating={true} color={theme.colors.onPrimary} />
            ) : (
              <Text variant="headlineSmall" style={styles.loginButtonText}>
                Continue
              </Text>
            )}
          </Pressable>
        </Card>
      </View> */}
    </View>
  );
}
