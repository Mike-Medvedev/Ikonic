import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Background, Button, Text, TextInput, SelectProfileAvatar, SignOutButton } from "@/design-system/components";
import { useTheme, Icon } from "react-native-paper";
import { SimpleForm, UserPublic, UserUpdate } from "@/types";
import useToast from "@/hooks/useToast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/features/Profile/Services/userService";
import { ApiError, NetworkError } from "@/lib/errors";
import { fullnameValidator, nameValidator } from "@/utils/validators";
import { ValidateErrors } from "@/utils/FormBuilder";
import { useAuth } from "@/context/AuthContext";
import { LOGIN_PATH } from "@/constants/constants";
import storageClient from "@/lib/storage";
import useImagePicker from "@/hooks/useImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
interface ProfileEditProps {
  profile: UserPublic;
  close: () => void;
}

type UpdateProfileForm = {
  fullname: SimpleForm<string>;
  username: SimpleForm<string>;
};
/**
 * Render the ui for Profile Edit page for users to update profile
 */
export default function ProfileEditView({ profile, close }: ProfileEditProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const { image, pickImage } = useImagePicker();
  const { showSuccess, showFailure } = useToast();
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
      close();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", profile.id] });
      queryClient.invalidateQueries({ queryKey: ["attendees"], exact: false });
      setLoading(false);
    },
  });
  const [profileForm, setProfileForm] = useState<UpdateProfileForm>({
    fullname: { value: `${profile?.firstname ?? ""} ${profile?.lastname ?? ""}`, error: "" },
    username: { value: profile?.username ?? "", error: "" },
  });

  /**
   * Helper Function to check whether the trip planning form has valid input
   */
  function isFormValid(): boolean {
    const errors = {
      fullname: profileForm.fullname.value ? fullnameValidator(profileForm.fullname.value) : "",
      username: profileForm.username.value ? nameValidator(profileForm.username.value) : "",
    };

    //sets errors in onboard form and returns if there is an error
    return ValidateErrors<UpdateProfileForm>(errors, setProfileForm);
  }

  /**
   * Validates and submits onboarding form
   * dissects full name into first name and last name variables, joining middle names to last names
   *
   * If Field has been modified, submit change otherwise exclude field from update
   */
  async function handleSubmit() {
    setLoading(true);

    //If no values are modifed then close page
    if (!Object.values(profileForm).some((val) => val.value?.trim?.())) close();
    if (!isFormValid()) {
      showFailure({ message: "Please correct errors" });
      setLoading(false);
      return;
    }

    const userUpdate: UserUpdate = {};
    const fullNameValue = profileForm.fullname.value?.trim() ?? "";
    const nameParts = fullNameValue.split(/\s+/);
    const firstname = nameParts[0] ?? "";
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    if (image && !image.canceled) {
      const avatarStoragePath = await storageClient.uploadImage({
        file: image,
        bucket: "profile",
        path: `${profile.id}/avatar`,
      });
      userUpdate.avatarStoragePath = avatarStoragePath;
    }
    if (profile.firstname != firstname) userUpdate.firstname = firstname;
    if (profile.lastname != lastname) userUpdate.lastname = lastname;
    if (profile.username != profileForm.username.value) userUpdate.username = profileForm.username.value;

    const user_id = session?.user?.id;
    if (!user_id) {
      showFailure({ message: "Error No User Id found in app group, signing out!", url: LOGIN_PATH });
      setLoading(false);
      return;
    }
    if (Object.keys(userUpdate).length === 0) {
      setLoading(false);
      return;
    }
    updateProfileMutation.mutate({ ...userUpdate, user_id });
  }
  const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { padding: 16 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <Pressable style={{ padding: 8, zIndex: 10 }} onPress={close}>
              <Icon source="close" size={24} />
            </Pressable>
            <SignOutButton />
          </View>

          <SelectProfileAvatar uri={image?.assets?.[0]?.uri} pickImage={pickImage} />

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

          {/* <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter your email" /> */}

          <Button mode="contained" onPress={handleSubmit} loading={loading}>
            Save Changes
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
