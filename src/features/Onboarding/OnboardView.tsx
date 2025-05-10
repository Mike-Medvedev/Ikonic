import { View, StyleSheet } from "react-native";
import { Background, Button, Text, TextInput } from "@/design-system/components";
import { useTheme } from "react-native-paper";
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
import SelectProfileAvatar from "@/design-system/components/SelectProfileAvatar";
import * as ImagePicker from "expo-image-picker";
interface OnBoardForm {
  fullname: SimpleForm<string>;
  username: SimpleForm<string>;
}
/**
 * Renders the onboarding form for new users
 */
export default function OnboardView() {
  const queryClient = useQueryClient();
  const { session, signOut } = useAuth();
  if (!session) return null;
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    onSettled: () => setLoading(false),
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
  async function handleSubmit() {
    setLoading(true);
    if (!session) {
      showFailure({ message: "Error No valid session, signing out" });
      await signOut();
      return;
    }
    const user_id = session?.user?.id;
    if (!user_id) {
      showFailure({ message: "Error No User Id found in app group", url: LOGIN_PATH });
      return;
    }

    if (!isFormValid()) {
      showFailure({ message: "Please correct errors" });
      return;
    }
    if (!image || image.canceled) {
      showFailure({ message: "Error: Image is missing or cancelled by user" });
      console.log("image missing or cancelled");
      return;
    }
    const avatarStoragePath = await UserService.upload(image, session.user.id);
    const fullNameValue = onboardForm.fullname.value?.trim() ?? "";
    const nameParts = fullNameValue.split(/\s+/);
    const firstname = nameParts[0] ?? "";
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    let userUpdate: UserUpdate = {
      firstname: firstname,
      lastname: lastname,
      username: onboardForm.username.value ?? "",
    };
    if (image) {
      userUpdate = { ...userUpdate, avatarStoragePath };
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
        <SelectProfileAvatar image={image} setImage={setImage} />

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

        <Button mode="contained" onPress={handleSubmit} loading={loading}>
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
