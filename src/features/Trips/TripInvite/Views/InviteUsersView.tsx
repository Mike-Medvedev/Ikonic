import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Background, SearchBar, Button } from "@/design-system/components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { InviteService } from "@/features/Trips/Services/inviteService";

import useToast from "@/hooks/useToast";
import { UserPublic } from "@/types";
import * as Linking from "expo-linking";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/features/Profile/Services/userService";
import Pill from "@/design-system/components/Pill";

import FriendsList from "@/features/Trips/TripInvite/Components/FriendsList";
import ContactsList from "@/features/Trips/TripInvite/Components/ContactsList";
import ManualInvite from "@/features/Trips/TripInvite/Components/ManualInvite";
/**
 * Route for displaying Invite Friends page
 */
export default function InviteUsersView() {
  const theme = useTheme();
  const { session } = useAuth();
  if (!session) return null;
  const mockUser = {
    firstname: "a",
    lastname: "a",
    username: "mev",
    id: "e25b2f98-f6e0-4a54-84f6-16f42cb849b4",
    phone: "2038587135",
    isOnboarded: true,
    riderType: "skier",
    avatarPublicUrl: null,
  };
  const { showSuccess, showFailure } = useToast();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  //prettier-ignore
  const { data: s, isFetching, error } = useQuery({
    queryKey: ["friends", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: false,
  });

  //prettier-ignore
  const { data: friends, isFetching: isFriendsFetching, error: friendsError,
  } = useQuery({ queryKey: ["friends", session.user.id], queryFn: async () => UserService.getFriends(session.user.id) });
  const filteredFriends = friends?.filter((friend) =>
    friend.firstname?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const [selectedPill, setSelectedPill] = useState<string>("Friends");
  const [isInviteSending, setIsInviteSending] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | undefined>(undefined);

  /**
   * Event Handler for inviting a user to a trip
   */
  async function handleInvite(user: UserPublic) {
    setIsInviteSending(true);
    const deepLink = Linking.createURL(`trips/${selectedTripId}/rsvp`);
    try {
      await InviteService.inviteUser(selectedTripId, user.id, { deepLink });
      showSuccess({ message: "Invite Sent Successfully!" });
    } catch (error) {
      showFailure({ message: "Error: Invite Failed" });
      console.error(error);
    } finally {
      setIsInviteSending(false);
      setSelectedButtonIndex(undefined);
    }
  }
  function renderList(selectedPill: string) {
    switch (selectedPill.toLowerCase().trim()) {
      case "friends":
        return (
          <FriendsList
            filteredFriends={filteredFriends}
            isFriendsFetching={isFriendsFetching}
            friendsError={friendsError}
            selectedUserIds={selectedUsers}
            setSelectedUserIds={setSelectedUsers}
          />
        );
      case "contacts":
        return <ContactsList selectedUserIds={selectedUsers} setSelectedUserIds={setSelectedUsers} />;
      case "manual":
        return <ManualInvite />;
    }
  }
  const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16 },
    searchContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
    searchBarContainer: { flex: 1 },
    searchBar: { padding: 0 },
    label: { marginVertical: 8, color: theme.colors.secondary },
    linkLabel: { marginVertical: 8 },
    nativeInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: theme.roundness,
      paddingHorizontal: 12,
      height: 50,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceVariant,
      overflow: "hidden",
    },
    nativeInput: {
      flex: 1,
      marginRight: 8,
      fontSize: 16,
      color: theme.colors.primary,
      textAlignVertical: "center",
    },
    iconContainer: {
      padding: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollContainer: {},
    inviteSmsContainer: {},
    inputContainer: { flexDirection: "row" },

    pillsContainer: { flexGrow: 0, marginVertical: 8 },
  });
  return (
    <Background>
      <View style={styles.container}>
        {/* <TripTitleDetail /> */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search Friends"
            onChangeText={setSearchQuery}
            value={searchQuery}
            containerStyle={styles.searchBarContainer}
          />
          <Button mode="text" disabled={selectedUsers.length < 1}>
            Invite ({selectedUsers.length})
          </Button>
        </View>
        <ScrollView horizontal style={styles.pillsContainer}>
          {["Friends", "Contacts", "manual"].map((option, index) => (
            <Pill
              label={option}
              isSelected={option === selectedPill}
              onPress={() => setSelectedPill(option)}
              key={index}
            />
          ))}
        </ScrollView>
        {renderList(selectedPill)}
      </View>
    </Background>
  );
}
