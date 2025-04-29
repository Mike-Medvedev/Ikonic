import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, TextInput as PaperInput } from "react-native-paper";
import { phoneValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import { SimpleForm } from "@/types";
import useToast from "@/hooks/useToast";
import { Text, TextInput, Button, DividerText } from "@/design-system/components";

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
      centerMargin: { textAlign: "center", marginVertical: 8 },
      label: {
        color: theme.colors.secondary,
      },
      secondaryLabel: {
        textAlign: "center",
        color: theme.colors.onSurfaceVariant,
        marginBottom: 8,
      },
      buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
      formContainer: { marginTop: 32 },
    });
  }, [theme]);

  return (
    <View style={styles.container}>
      <View style={{ height: "15%" }}></View>
      <Text variant="headlineMedium" style={styles.centerMargin}>
        Welcome to Ikonic
      </Text>
      <Text variant="titleMedium" style={[styles.label, styles.centerMargin]}>
        Sign in to plan your next mountain adventure
      </Text>
      <View style={styles.formContainer}>
        <Text variant="labelLarge" style={styles.label}>
          Phone Number
        </Text>
        <TextInput
          placeholder="(555) 000-000"
          returnKeyType="done"
          value={loginForm.phoneNumber.value}
          onChangeText={handlePhoneChange}
          error={!!loginForm.phoneNumber.error}
          errorText={loginForm.phoneNumber.error}
          autoCapitalize="none"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          maxLength={10}
          left={<PaperInput.Affix text="+1 " />}
        />
      </View>
      <Text style={styles.secondaryLabel}>* We will send you a one time code</Text>
      <Button mode="contained" onPress={handleLogin} loading={isLoading} disabled={isLoading}>
        Continue with Phone
      </Button>

      <DividerText text="Or continue with" />
      <View style={styles.buttonGroup}>
        <Button icon="google" mode="outlined">
          {" "}
          Google
        </Button>
        <Button icon="apple" mode="outlined">
          Apple
        </Button>
      </View>
    </View>
  );
}
