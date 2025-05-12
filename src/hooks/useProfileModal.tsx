import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "@/design-system/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { UserPublic } from "@/types";
import ProfileCard from "@/features/Profile/Components/ProfileCard";

export default function useProfileModal() {
  const [modalState, setModalState] = useState<{
    visible: boolean;
    profile: UserPublic | undefined;
  }>({ visible: false, profile: undefined });
  const { session } = useAuth();
  const isOwner = session?.user?.id === modalState.profile?.id;
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: { marginTop: 32, padding: 16, flex: 1, justifyContent: "space-between" },
    profileContainer: {},
  });

  const ProfileModal = () => {
    return (
      <Modal visible={modalState.visible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.profileContainer}>
            {modalState.profile && <ProfileCard profile={modalState.profile} isOwner={isOwner} />}
          </View>

          <Button mode="contained" onPress={() => setModalState({ visible: false, profile: undefined })}>
            Close
          </Button>
        </SafeAreaView>
      </Modal>
    );
  };

  return {
    setModalState,
    ProfileModal,
  };
}
