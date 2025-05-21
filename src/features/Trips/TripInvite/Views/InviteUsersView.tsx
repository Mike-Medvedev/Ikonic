import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Background, SearchBar, Button } from "@/design-system/components";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import Pill from "@/design-system/components/Pill";

import FriendsList from "@/features/Trips/TripInvite/Components/FriendsList";
import ContactsList from "@/features/Trips/TripInvite/Components/ContactsList";
import ManualInvite from "@/features/Trips/TripInvite/Components/ManualInvite";
import { ExternalInvitee, RegisteredInvitee } from "@/types";
import useInvite from "@/hooks/useInvite";
import useToast from "@/hooks/useToast";

/**
 * Route for displaying Invite Friends page
 */
export default function InviteUsersView() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { session } = useAuth();
  if (!session) return null;

  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  const [selectedInvitees, setSelectedInvitees] = useState<(RegisteredInvitee | ExternalInvitee)[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const { showSuccess, showFailure } = useToast();
  const { inviteUsersMutation } = useInvite({
    options: {
      onError: (error) => {
        showFailure({ message: String(error) });
      },
      onSuccess: () => {
        showSuccess({ message: "Successfully invited Users!" });
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["trip", selectedTripId] });
        queryClient.invalidateQueries({ queryKey: ["attendees", selectedTripId] });
      },
    },
  });

  //prettier-ignore
  const { data: friends, isFetching: isFriendsFetching, error: friendsError,
  } = useQuery({ queryKey: ["friends", "me", session.user.id], queryFn: async () => FriendshipService.getFriends() });
  const filteredFriends = friends?.filter((friend) =>
    friend.user.firstname?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            selectedInvitees={selectedInvitees}
            setSelectedInvitees={setSelectedInvitees}
          />
        );
      case "contacts":
        return (
          <ContactsList
            query={searchQuery}
            selectedInvitees={selectedInvitees}
            setSelectedInvitees={setSelectedInvitees}
          />
        );
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
            loading={inviteUsersMutation.isPending}
            disabled={inviteUsersMutation.isPending}
            onPress={() => {
              if (!selectedInvitees || selectedInvitees.length < 1) return;
              inviteUsersMutation.mutate({
                tripId: selectedTripId,
                invitees: selectedInvitees,
              });
            }}
          >
            Invite ({selectedInvitees.length})
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
