import React, { memo, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Logo from "@/ui/Logo";
import { Button, useTheme } from "react-native-paper";
import TextInput from "@/ui/TextInput";
import { nameValidator, passwordValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import Background from "@/ui/Background";
import { ExternalPathString, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SimpleForm } from "@/models/SimpleForm";

const Login = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const { callback: rsvpPathCallback } = useLocalSearchParams();
  const [username, setUsername] = useState<SimpleForm>({ value: "", error: "" });
  const [password, setPassword] = useState<SimpleForm>({ value: "", error: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    const nameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || passwordError) {
      setUsername({ ...username, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const isLoginSuccessful = await login(username.value, password.value);
    if (isLoginSuccessful) {
      rsvpPathCallback ? router.navigate(rsvpPathCallback as ExternalPathString) : router.navigate("/");
    } else {
      setUsername({ ...username, error: "Account not found. Please try again!" });
    }
    setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    forgotPassword: {
      width: "100%",
      alignItems: "flex-end",
      marginBottom: 24,
    },
    row: {
      flexDirection: "row",
      marginTop: 4,
    },
    label: {
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    header: { fontSize: 26, color: theme.colors.primary, fontWeight: "bold", paddingVertical: 14 },
  });

  return (
    <View style={styles.container}>
      <Background>
        <Logo />

        <Text style={styles.header}>Welcome</Text>

        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onChangeText={(text) => setUsername({ value: text, error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
          textContentType="username"
          keyboardType="default"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <View style={styles.forgotPassword}>
          <Pressable>
            <Text style={styles.label}>Forgot your password?</Text>
          </Pressable>
        </View>

        <Button mode="contained" onPress={handleLogin} loading={loading}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <Pressable>
            <Text style={styles.link}>Sign up</Text>
          </Pressable>
        </View>
      </Background>
    </View>
  );
};

export default memo(Login);
