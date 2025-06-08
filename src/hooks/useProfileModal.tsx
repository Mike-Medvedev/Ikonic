import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button } from "@/design-system/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { UserPublic } from "@/types";
import ProfileCard from "@/features/Profile/Components/ProfileCard";

export default function useProfileModal() {
  const insets = useSafeAreaInsets();
  const [modalState, setModalState] = useState<{
    visible: boolean;
    profile: UserPublic | undefined;
  }>({ visible: false, profile: undefined });
  const { session } = useAuth();
  const isOwner = session?.user?.id === modalState.profile?.id;

  const styles = StyleSheet.create({
    container: { marginTop: 32, padding: 16, flex: 1, justifyContent: "space-between" },
    profileContainer: {
      padding: 16,
      flex: 1,
      paddingTop: 16 + Math.max(insets.top, 16),
      paddingBottom: 16 + Math.max(insets.bottom, 16),
    },
  });

  const ProfileModal = () => {
    return (
      <Modal visible={modalState.visible} animationType="slide">
        <View style={styles.profileContainer}>
          {modalState.profile && <ProfileCard profile={modalState.profile} isOwner={isOwner} />}
          <Button mode="contained" onPress={() => setModalState({ visible: false, profile: undefined })}>
            Close
          </Button>
        </View>
      </Modal>
    );
  };

  return {
    setModalState,
    ProfileModal,
  };
}
