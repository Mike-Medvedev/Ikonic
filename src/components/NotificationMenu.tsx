import { View, StyleSheet, ScrollView, LayoutRectangle, Pressable } from "react-native";
import { Badge, Divider, Icon, IconButton, Surface, useTheme } from "react-native-paper";
import { Text } from "@/design-system/components";
import { useState } from "react";
import useRespondFriendRequest from "@/hooks/useRespondFriendRequest";
import { useAuth } from "@/context/AuthContext";
import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStateWrapper from "@/components/AsyncStateWrapper";
import { FriendshipPublic, InvitationPublic } from "@/types";
import { UserService } from "@/features/Profile/Services/userService";
import { useRouter } from "expo-router";
import { calculateTimeElapsed } from "@/utils/dateUtils";

export default function NotificationMenu() {
  const theme = useTheme();
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<"accept" | "reject" | null>(null);

  const queryClient = useQueryClient();
  const { respondToRequestMutation } = useRespondFriendRequest({
    options: {
      onSettled: () => {
        setLoadingAction(null);
        queryClient.invalidateQueries({ queryKey: ["friends"], exact: false });
        queryClient.invalidateQueries({ queryKey: ["friend-requests"], exact: false });
      },
    },
  });
  const { session } = useAuth();
  if (!session) return null;
  //prettier-ignore
  const { data: friendRequests, isFetching: isFetchingFriendRequests, error: friendRequestsError} = useQuery({ 
    queryKey: ["friend-requests", "me", session.user.id],
    queryFn: async () => FriendshipService.getFriendRequests(session.user.id, "incoming"),
    refetchOnMount: true,
    refetchOnWindowFocus: true
    })
  //prettier-ignore
  const { data: invitations, isFetching: isFetchingInvitations, error: invitationError} = useQuery({ 
    queryKey: ["invitations", "me", session.user.id],
    queryFn: async () => UserService.getInvitations(session.user.id),
    refetchOnMount: true,
    refetchOnWindowFocus: true
    })
  const [bellIconDimensions, setBellIconDimensions] = useState<LayoutRectangle | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const styles = StyleSheet.create({
    content: { width: "100%", padding: 16, flexDirection: "row", alignItems: "center" },
    iconContainer: { marginRight: 8 },
  });

  const Invitation = ({ invitation }: { invitation: InvitationPublic }) => {
    return (
      <>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/trips/[selectedTrip]/rsvp",
              params: { selectedTrip: invitation.tripId, invite_token: invitation.id },
            })
          }
          style={({ pressed }) => [
            styles.content,
            pressed && {
              opacity: 0.7,
              backgroundColor: "#f0f0f0",
              transform: [{ scale: 0.98 }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Icon source="account-multiple" size={24} />
          </View>

          <View>
            <Text variant="titleSmall" style={{ maxWidth: 200 }}>
              <Text
                style={{ textTransform: "capitalize" }}
              >{`${invitation.tripOwner.split(" ")[0]} ${invitation.tripOwner.split(" ")?.[1] ?? ""} `}</Text>
              has invited you to a trip!
            </Text>
            <Text style={{ color: theme.colors.secondary }} variant="bodySmall">
              {calculateTimeElapsed(invitation.createdAt)} ago
            </Text>
          </View>
          <Icon source="party-popper" size={24} />
        </Pressable>
        <Divider bold />
      </>
    );
  };
  const FriendRequest = ({ friendRequest }: { friendRequest: FriendshipPublic }) => {
    return (
      <>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon source="account-multiple" size={24} />
          </View>

          <View>
            <Text variant="titleSmall" style={{ maxWidth: 150 }}>
              <Text
                style={{ textTransform: "capitalize" }}
              >{`${friendRequest.requester.firstname} ${friendRequest.requester.lastname} `}</Text>
              wants to be your friend!
            </Text>
            <Text style={{ color: theme.colors.secondary }} variant="bodySmall">
              {calculateTimeElapsed(friendRequest.createdAt)} ago
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="check"
              size={24}
              iconColor="green"
              loading={loadingAction === "accept"}
              disabled={loadingAction === "reject"}
              onPress={() => {
                setLoadingAction("accept");
                respondToRequestMutation.mutate({ id: friendRequest.id, status: "accepted" });
              }}
            />

            <IconButton
              icon="close"
              size={24}
              iconColor="red"
              loading={loadingAction === "reject"}
              disabled={loadingAction === "accept"}
              onPress={() => {
                setLoadingAction("reject");
                respondToRequestMutation.mutate({ id: friendRequest.id, status: "rejected" });
              }}
            />
          </View>
        </View>
        <Divider bold />
      </>
    );
  };
  return (
    <View>
      {((friendRequests?.length ?? 0) > 0 || (invitations?.length ?? 0) > 0) && (
        <Badge style={{ position: "absolute", zIndex: -100 }}>
          {(friendRequests?.length ?? 0) + (invitations?.length ?? 0)}
        </Badge>
      )}
      <IconButton
        icon="bell"
        onPress={() => setVisible((prev) => !prev)}
        onLayout={(layout) => setBellIconDimensions(layout.nativeEvent.layout)}
      />
      {visible && (
        <Surface
          elevation={1}
          style={{
            position: "absolute",
            top: bellIconDimensions?.height,
            right: 0,
            width: 300,
            maxHeight: 300,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.roundness,
            borderWidth: 1,
            borderColor: theme.colors.outlineVariant,
            margin: 8,
          }}
        >
          <AsyncStateWrapper
            loading={isFetchingFriendRequests || isFetchingInvitations}
            error={friendRequestsError || invitationError}
          >
            <ScrollView>
              <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
                <Text variant="titleMedium">Notifications</Text>
              </View>
              {friendRequests &&
                friendRequests.map((friendRequest, index) => (
                  <FriendRequest friendRequest={friendRequest} key={index} />
                ))}
              {invitations &&
                invitations.map((invitation, index) => <Invitation invitation={invitation} key={index} />)}
              <View style={{ flex: 1, marginVertical: 8 }}>
                <Text style={{ textAlign: "center" }}>View All Notifications</Text>
              </View>
            </ScrollView>
          </AsyncStateWrapper>
        </Surface>
      )}
    </View>
  );
}
