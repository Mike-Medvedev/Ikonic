import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Logo from "@/ui/Logo";
import Header from "@/ui/Header";
import { Button, useTheme } from "react-native-paper";
import TextInput from "@/ui/TextInput";
import { nameValidator, passwordValidator } from "@/utils/validators";
import { useAuth } from "@/context/AuthContext";
import Background from "@/ui/Background";
import { router } from "expo-router";

const Login = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onLoginPressed = async () => {
    const nameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (nameError || passwordError) {
      setUsername({ ...username, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      await login(username.value, password.value);
      router.push("/plan");
    } catch (error) {
      setUsername({ ...username, error: "Account not found. Please try again!" });
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
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
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Background>
        <Logo />

        <Header>Welcome</Header>

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
          <TouchableOpacity>
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </View>
  );
};

export default memo(Login);
