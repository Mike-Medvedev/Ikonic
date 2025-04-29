import { View, StyleSheet, ScrollView, Pressable, TextInput as NativeInput } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { Background, Text, SearchBar, Button } from "@/design-system/components";
import TripTitleDetail from "@/components/TripTitleDetail";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { InviteService } from "@/features/Trips/Services/inviteService";
import UserCard from "@/components/UserCard";
import * as Clipboard from "expo-clipboard";
import useToast from "@/hooks/useToast";
import { UserPublic } from "@/types";
import * as Linking from "expo-linking";
/**
 * Route for displaying Invite Friends page
 */
export default function InviteUsersView() {
  const theme = useTheme();
  const { showSuccess, showFailure } = useToast();
  const { selectedTrip: selectedTripId } = useLocalSearchParams() as { selectedTrip: string };
  //prettier-ignore
  const { data: friends, isFetching, error } = useQuery({
    queryKey: ["friends", selectedTripId],
    queryFn: async () => InviteService.getInvitedUsers(selectedTripId),
    initialData: { accepted: [], pending: [], uncertain: [], declined: [] },
    enabled: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteSending, setIsInviteSending] = useState<boolean>(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | undefined>(undefined);
  const inviteLink = "https://tripapp.com/invite/winter-shred-2025";

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(inviteLink);
      showSuccess({ message: "Copied!, Invite link copied to clipboard" });
    } catch (e) {
      console.error("Failed to copy text to clipboard", e);
      showFailure({ message: "Error, Could not copy link." });
    }
  };
  /**
   * Event Handler for inviting a user to a trip
   */
  async function handleInvite(user: UserPublic) {
    setIsInviteSending(true);
    console.log(user);
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
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    searchBar: { marginVertical: 16 },
    label: { color: theme.colors.secondary },
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
  });
  return (
    <Background>
      <View style={styles.container}>
        <TripTitleDetail />
        <SearchBar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          containerStyle={styles.searchBar}
        />
        <Text style={[styles.linkLabel, styles.label]}>Share Link</Text>

        <View style={styles.nativeInputContainer}>
          <NativeInput value={inviteLink} style={styles.nativeInput} editable={false} />
          <Pressable onPress={copyToClipboard} style={styles.iconContainer}>
            <Icon source="content-copy" size={24} color={theme.colors.primary} />
          </Pressable>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text variant="labelLarge" style={[styles.label, styles.linkLabel]}>
            Suggested
          </Text>
          <View>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                >
                  <UserCard
                    user={{ firstname: "a", lastname: "a", id: "1", phone: "20385" }}
                    subtitle="3 mutual friends"
                  />
                  <Button
                    mode="outlined"
                    theme={{ roundness: theme.roundness }}
                    style={{ borderColor: theme.colors.primary }}
                    contentStyle={{ paddingVertical: 0 }}
                    onPress={() => {
                      setSelectedButtonIndex(index);
                      handleInvite({
                        firstname: "a",
                        lastname: "a",
                        id: "e25b2f98-f6e0-4a54-84f6-16f42cb849b4",
                        phone: "2038587135",
                      });
                    }}
                  >
                    Invite
                  </Button>
                </View>
              ))}
          </View>
          <Text variant="labelLarge" style={styles.label}>
            From Previous Trips
          </Text>
          <View>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                >
                  <UserCard user={{ firstname: "a", lastname: "a", id: "1", phone: "20385" }} />
                  <Button
                    mode="outlined"
                    theme={{ roundness: theme.roundness }}
                    style={{ borderColor: theme.colors.primary }}
                    contentStyle={{ paddingVertical: 0 }}
                    onPress={() => {
                      setSelectedButtonIndex(index);
                      handleInvite({
                        firstname: "a",
                        lastname: "a",
                        id: "e25b2f98-f6e0-4a54-84f6-16f42cb849b4",
                        phone: "2038587135",
                      });
                    }}
                  >
                    Invite
                  </Button>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}
