import { View, StyleSheet, ScrollView } from "react-native";
import { Background, Button, Text, TextInput } from "@/design-system/components";
import { Avatar, useTheme, TextInput as PaperInput } from "react-native-paper";
import { SimpleForm, UserPublic, UserUpdate } from "@/types";
import useToast from "@/hooks/useToast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/features/Profile/Services/userService";
import { ApiError, NetworkError } from "@/lib/errors";
import { fullnameValidator, nameValidator, phoneValidator } from "@/utils/validators";
import { ValidateErrors } from "@/utils/FormBuilder";
import { useAuth } from "@/context/AuthContext";
import { LOGIN_PATH } from "@/constants/constants";

type UpdateProfileForm = {
  fullname: SimpleForm<string>;
  username: SimpleForm<string>;
  phone: SimpleForm<string>;
  riderType: SimpleForm<string>;
  biography: SimpleForm<string>;
};
/**
 * Render the ui for Profile Edit page for users to update profile
 */
export default function ProfileEditView() {
  const theme = useTheme();
  const { session } = useAuth();
  const { showSuccess, showFailure } = useToast();
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
    },
  });
  const [profileForm, setProfileForm] = useState<UpdateProfileForm>({
    fullname: { value: "", error: "" },
    username: { value: "", error: "" },
    phone: { value: "", error: "" },
    riderType: { value: "", error: "" },
    biography: { value: "", error: "" },
  });

  /**
   * Helper Function to check whether the trip planning form has valid input
   */
  function isFormValid(): boolean {
    const errors = {
      fullname: fullnameValidator(profileForm.fullname.value),
      username: nameValidator(profileForm.username.value),
      phone: phoneValidator(profileForm.phone.value),
      riderType: nameValidator(profileForm.riderType.value),
      biography: nameValidator(profileForm.biography.value),
    };

    //sets errors in onboard form and returns if there is an error
    return ValidateErrors<UpdateProfileForm>(errors, setProfileForm);
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
    const fullNameValue = profileForm.fullname.value?.trim() ?? "";
    const nameParts = fullNameValue.split(/\s+/);
    const firstname = nameParts[0] ?? "";
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    const userUpdate: UserUpdate = {
      firstname: firstname,
      lastname: lastname,
      username: profileForm.username.value ?? "",
      phone: profileForm.phone.value,
    };

    const user_id = session?.user?.id;
    if (!user_id) {
      showFailure({ message: "Error No User Id found in app group", url: LOGIN_PATH });
      return;
    }
    // updateProfileMutation.mutate({ ...userUpdate, user_id });
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
      <ScrollView style={styles.container}>
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Avatar.Text label="?" />
          </View>
          <Text>Add Profile Photo</Text>
        </View>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          value={profileForm.fullname.value}
          onChangeText={(text) => setProfileForm((prev) => ({ ...prev, fullname: { value: text, error: "" } }))}
          error={!!profileForm.fullname.error}
          errorText={profileForm.fullname.error}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Choose a username"
          value={profileForm.username.value}
          onChangeText={(text) => setProfileForm((prev) => ({ ...prev, username: { value: text, error: "" } }))}
          error={!!profileForm.username.error}
          errorText={profileForm.username.error}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter your email" />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput placeholder="(555) 000-0000" left={<PaperInput.Affix text="+1 " />} />

        <Button mode="contained" onPress={handleSubmit}>
          Save Changes
        </Button>
      </ScrollView>
    </Background>
  );
}
