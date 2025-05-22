import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { SimpleForm } from "@/types";
import useToast from "@/hooks/useToast";
import { Text, Button, DividerText } from "@/design-system/components";
import PhoneInput, { Value } from "react-phone-number-input/react-native-input";
import { PhoneInputField } from "@/components/PhoneNumberInput";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { VERIFY_PATH } from "@/constants/constants";

export interface LoginForm {
  phoneNumber: SimpleForm<string>;
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
  });

  /**
   * Helper Function that validates whether a phone number is a valid number
   */
  function validateLogin(): boolean {
    const validPhone = isPossiblePhoneNumber(loginForm.phoneNumber.value);
    if (!validPhone) {
      setLoginForm((prev) => ({
        ...prev,
        phoneNumber: { value: prev.phoneNumber.value, error: "Please enter a valid phone number" },
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
      const phoneNumber = loginForm.phoneNumber.value;

      const { error } = await signIn(phoneNumber);
      if (error) {
        showFailure({ message: `Error We could not send you a text! Details: ${error.message}` });
      } else {
        showSuccess({
          message: "We sent you a OTP",
          url: VERIFY_PATH,
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

  function handlePhoneChange(value?: Value | undefined) {
    setLoginForm((prev) => ({
      ...prev,
      phoneNumber: { value: value ?? "", error: "" },
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
        <PhoneInput
          country="US"
          value={loginForm.phoneNumber.value}
          onChange={handlePhoneChange}
          error={!!loginForm.phoneNumber.error}
          errorText={loginForm.phoneNumber.error}
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputComponent={PhoneInputField as any}
          maxLength={16}
        />
      </View>
      <Text style={styles.secondaryLabel}>* We will send you a one time code</Text>
      <Button mode="contained" onPress={handleLogin} loading={isLoading} disabled={isLoading}>
        Continue with Phone
      </Button>

      <DividerText text="Or continue with" />
      <View style={styles.buttonGroup}>
        <Button icon="google" mode="outlined">
          Google
        </Button>
        <Button icon="apple" mode="outlined">
          Apple
        </Button>
      </View>
    </View>
  );
}
