import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Icon, useTheme } from "react-native-paper";
import { FriendshipCreate, UserPublic } from "@/types";
import { Text } from "@/design-system/components";
import { useState } from "react";
import FriendsListModal from "@/features/Profile/Components/FriendsListModal";
import ProfileEditModal from "@/features/Profile/Components/ProfileEditModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TripService } from "@/features/Trips/Services/tripService";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { router } from "expo-router";
import { DEFAULT_APP_PATH } from "@/constants/constants";
import UserAvatar from "@/components/UserAvatar";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { useAuth } from "@/context/AuthContext";
import SpinningAddFriendIcon from "@/features/Profile/Components/SpinningAddFriend";
import useToast from "@/hooks/useToast";

interface ProfileCardProps {
  profile: UserPublic;
  isOwner: boolean;
}

/**
 * Render the UI for Profile Information for a User
 * Profile Page can render both a users page or someone else's page
 */
export default function ProfileCard({ profile, isOwner }: ProfileCardProps) {
  const [friendsModalVisible, setFriendsModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { showSuccess, showFailure } = useToast();
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: recentTrips, isFetching, error } = useQuery({
    queryKey: ["trips", "past"],
    queryFn: async () => TripService.getAll({ past: true }),
    staleTime: 60 * 1000 //1 hour cache
  })
  const orderedRecentTrips = recentTrips?.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );
  //prettier-ignore
  const { data: friends, isFetching: isFriendsFetching, error: friendsError} = useQuery({ 
    queryKey: ["friends", profile.id ],
    queryFn: async () => FriendshipService.getFriends(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
    })

  const requestFriendMutation = useMutation<boolean, Error, FriendshipCreate>({
    mutationFn: ({ addresseeId }) => {
      return FriendshipService.requestFriend({ addresseeId });
    },
    onError: (error) => {
      showFailure({ message: error.message });
      console.error(error);
    },
    onSuccess: () => {
      showSuccess({ message: "Friend request sent" });
    },
    onSettled: () => {
      setRequesting(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", session.user.id] });
      queryClient.invalidateQueries({ queryKey: ["users", profile.id] });
    },
  });
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: { padding: 16, flex: 1 },
    profileCardContainer: { flexDirection: "row", alignItems: "center", gap: 16 },
    profileCardContent: { gap: 8, flex: 1 },
    label: { textTransform: "capitalize", color: theme.colors.secondary, fontSize: 16 },
    squaresContainer: {
      flexDirection: "row",
      gap: 16,
      justifyContent: "space-evenly",
      marginTop: 24,
      marginBottom: 16,
    },
    square: {
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      padding: 16,
      flex: 1,
      borderRadius: theme.roundness,
      justifyContent: "center",
      alignItems: "center",
    },
    squareLabel: { textTransform: "capitalize", color: theme.colors.secondary, fontSize: 14 },

    recentTripsContainer: { marginVertical: 0, flex: 1 },
    recentTripsHeader: { flexDirection: "row", justifyContent: "space-between", marginVertical: 16 },
    recentTrip: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      borderRadius: theme.roundness,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.profileCardContainer}>
        <View>
          <UserAvatar profile={profile} size={64} />
        </View>

        <View style={styles.profileCardContent}>
          <Text
            variant="titleLarge"
            style={{ textTransform: "capitalize" }}
          >{`${profile.firstname} ${profile.lastname}`}</Text>
          <Text style={styles.label}>Joined January 2025</Text>
        </View>
        {isOwner ? (
          <Pressable onPress={() => setEditModalVisible(true)}>
            <Icon source="cog" size={32} color={theme.colors.primary} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setRequesting(true);
              requestFriendMutation.mutate({
                addresseeId: profile.id,
              });
            }}
          >
            <SpinningAddFriendIcon requesting={requesting} />
          </Pressable>
        )}
      </View>

      <View style={styles.squaresContainer}>
        <View style={styles.square}>
          <Text variant="headlineSmall">{recentTrips?.length || 0}</Text>
          <Text style={styles.squareLabel}>Trips</Text>
        </View>

        {isOwner ? (
          <Pressable style={styles.square} onPress={() => setFriendsModalVisible(true)}>
            <Text variant="headlineSmall">{friends?.length || 0}</Text>
            <Text style={styles.squareLabel}>Friends</Text>
          </Pressable>
        ) : (
          <View style={styles.square}>
            <Text variant="headlineSmall">{friends?.length || 0}</Text>
            <Text style={styles.squareLabel}>Friends</Text>
          </View>
        )}
      </View>

      <View style={styles.recentTripsContainer}>
        <View style={styles.recentTripsHeader}>
          <Text variant="titleMedium">Recent Trips</Text>
        </View>
        <AsyncStateWrapper loading={isFetching} error={error}>
          <ScrollView>
            {orderedRecentTrips
              ? orderedRecentTrips.map((trip) => (
                  <Pressable
                    style={styles.recentTrip}
                    key={trip.id}
                    onPress={() => {
                      if (!isOwner) return;
                      router.push({
                        pathname: `${DEFAULT_APP_PATH}/[selectedTrip]/details`,
                        params: { selectedTrip: trip.id },
                      });
                    }}
                  >
                    <View>
                      <Text variant="bodyLarge">{trip.title}</Text>
                      <Text style={{ color: theme.colors.secondary }}>{trip.mountain}</Text>
                      <Text style={{ color: theme.colors.secondary }}>{trip.startDate?.toDateString()}</Text>
                    </View>
                  </Pressable>
                ))
              : null}
          </ScrollView>
        </AsyncStateWrapper>
      </View>

      {isOwner && (
        <FriendsListModal
          friends={friends || []}
          isFriendsFetching={isFriendsFetching}
          friendsError={friendsError}
          visible={friendsModalVisible}
          setVisible={setFriendsModalVisible}
        />
      )}

      {isOwner && (
        <ProfileEditModal profile={profile} visible={editModalVisible} callback={() => setEditModalVisible(false)} />
      )}
    </View>
  );
}
