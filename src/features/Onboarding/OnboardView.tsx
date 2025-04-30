import { View, StyleSheet } from "react-native";
import { Background, Button, Text, TextInput } from "@/design-system/components";
import { Icon, useTheme } from "react-native-paper";
import { useState } from "react";
import { SimpleForm, UserPublic, UserUpdate } from "@/types";
import { fullnameValidator, nameValidator } from "@/utils/validators";
import { ValidateErrors } from "@/utils/FormBuilder";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../Profile/Services/userService";
import { ApiError, NetworkError } from "@/lib/errors";
import { useAuth } from "@/context/AuthContext";
import { LOGIN_PATH } from "@/constants/constants";
interface OnBoardForm {
  fullname: SimpleForm<string>;
  username: SimpleForm<string>;
}
/**
 * Renders the onboarding form for new users
 */
export default function OnboardView() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const updateProfileMutation = useMutation<UserPublic, Error, UserUpdate & { user_id: string }>({
    mutationFn: ({ user_id, ...UserUpdate }) => UserService.updateOne(UserUpdate, user_id),
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error(error);
        showFailure({ message: "Error Completing Profile" });
      }
      if (error instanceof NetworkError) {
        console.error(error);
        showFailure({ message: "Error Please check your network" });
      } else {
        console.error(error);
        showFailure({ message: "Error Please Try again" });
      }
    },
    onSuccess: () => {
      showSuccess({ message: "Successfully Updated " });
      completeOnboardingMutation.mutate();
    },
  });
  const completeOnboardingMutation = useMutation<boolean, Error, void>({
    mutationFn: () => UserService.completeOnboard(),
    onError: (error) => {
      if (error instanceof ApiError) {
        console.error(error);
        showFailure({ message: "Error Updating onboarding request " });
      }
      if (error instanceof NetworkError) {
        console.error(error);
        showFailure({ message: "Error Please check your network" });
      } else {
        console.error(error);
        showFailure({ message: "Error Please Try again" });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const [onboardForm, setOnboardForm] = useState<OnBoardForm>({
    fullname: { value: "", error: "" },
    username: { value: "", error: "" },
  });

  /**
   * Helper Function to check whether the trip planning form has valid input
   */
  function isFormValid(): boolean {
    const errors = {
      fullname: fullnameValidator(onboardForm.fullname.value),
      username: nameValidator(onboardForm.username.value),
    };

    //sets errors in onboard form and returns if there is an error
    return ValidateErrors<OnBoardForm>(errors, setOnboardForm);
  }

  /**
   * Validates and submits onboarding form
   * dissects full name into first name and last name variables, joining middle names to last names
   */
  function handleSubmit() {
    if (!isFormValid()) {
      showFailure({ message: "Please correct errors" });
      return;
    }
    const fullNameValue = onboardForm.fullname.value?.trim() ?? "";
    const nameParts = fullNameValue.split(/\s+/);
    const firstname = nameParts[0] ?? "";
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    const userUpdate: UserUpdate = {
      firstname: firstname,
      lastname: lastname,
      username: onboardForm.username.value ?? "",
    };

    const user_id = session?.user?.id;
    if (!user_id) {
      showFailure({ message: "Error No User Id found in app group", url: LOGIN_PATH });
      return;
    }
    updateProfileMutation.mutate({ ...userUpdate, user_id });
  }

  const styles = StyleSheet.create({
    container: { padding: 16 },
    photoContainer: { alignItems: "center", gap: 8 },
    photoCircle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: theme.colors.secondaryContainer,
      width: 72,
      height: 72,
    },
    label: { marginBottom: 8 },
  });
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Icon source="camera" size={24} color={theme.colors.secondary} />
          </View>
          <Text>Add Profile Photo</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          value={onboardForm.fullname.value}
          onChangeText={(text) => setOnboardForm((prev) => ({ ...prev, fullname: { value: text, error: "" } }))}
          error={!!onboardForm.fullname.error}
          errorText={onboardForm.fullname.error}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Choose a username"
          value={onboardForm.username.value}
          onChangeText={(text) => setOnboardForm((prev) => ({ ...prev, username: { value: text, error: "" } }))}
          error={!!onboardForm.username.error}
          errorText={onboardForm.username.error}
        />

        {/* <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter your email" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput placeholder="(555) 000-0000" left={<PaperInput.Affix text="+1 " />} /> */}

        <Button mode="contained" onPress={handleSubmit}>
          Complete Profile
        </Button>
      </View>
    </Background>
  );
}
{
  /* <View style={styles.photoCircle}></View>
      <Text>Add Profle Photo</Text> */
}
