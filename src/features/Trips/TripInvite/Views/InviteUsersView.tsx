import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Background, SearchBar, Button } from "@/design-system/components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { InviteService } from "@/features/Trips/Services/inviteService";

import { useAuth } from "@/context/AuthContext";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import Pill from "@/design-system/components/Pill";

import FriendsList from "@/features/Trips/TripInvite/Components/FriendsList";
import ContactsList from "@/features/Trips/TripInvite/Components/ContactsList";
import ManualInvite from "@/features/Trips/TripInvite/Components/ManualInvite";
import { UserPublic } from "@/types";
import useInvite from "@/hooks/useInvite";
/**
 * Route for displaying Invite Friends page
 */
export default function InviteUsersView() {
  const theme = useTheme();
  const { session } = useAuth();
  if (!session) return null;

  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [selectedUsers, setSelectedUsers] = useState<UserPublic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { invite, loading } = useInvite();
  //prettier-ignore
  const { data: s, isFetching, error } = useQuery({
    queryKey: ["friends", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    enabled: false,
  });

  //prettier-ignore
  const { data: friends, isFetching: isFriendsFetching, error: friendsError,
  } = useQuery({ queryKey: ["friends", "me", session.user.id], queryFn: async () => FriendshipService.getFriends() });
  const filteredFriends = friends?.filter((friend) =>
    friend.firstname?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const [selectedPill, setSelectedPill] = useState<string>("Friends");

  function renderList(selectedPill: string) {
    switch (selectedPill.toLowerCase().trim()) {
      case "friends":
        return (
          <FriendsList
            filteredFriends={filteredFriends ?? []}
            isFriendsFetching={isFriendsFetching}
            friendsError={friendsError}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        );
      case "contacts":
        return <ContactsList query={searchQuery} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />;
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

    pillsContainer: { flexDirection: "row", marginVertical: 16 },
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
          <Button
            mode="text"
            onPress={() => {
              // if (!selectedUsers[0]) return;
              const mock: UserPublic = {
                firstname: "michael",
                lastname: "medvededev",
                id: "e25b2f98-f6e0-4a54-84f6-16f42cb849b4",
                phone: "12038587135",
                username: "mev",
                riderType: "skier",
                isOnboarded: true,
                avatarPublicUrl: "1",
              };
              invite(mock);
            }}
          >
            Invite ({selectedUsers.length})
          </Button>
        </View>

        <View style={styles.pillsContainer}>
          {["Friends", "Contacts", "manual"].map((option, index) => (
            <Pill
              label={option}
              isSelected={option === selectedPill}
              onPress={() => setSelectedPill(option)}
              key={index}
            />
          ))}
        </View>
        {renderList(selectedPill)}
      </View>
    </Background>
  );
}
