import { FriendshipPublic, FriendshipStatus, FriendshipUpdate } from "@/types";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "@/design-system/components";
import UserCard from "@/components/UserCard";
import { ActivityIndicator, Icon, useTheme } from "react-native-paper";
import { FriendshipService } from "../Services/friendshipService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface FriendRequestProps {
  outgoing: boolean;
  request: FriendshipPublic;
  currentUserId: string;
}

/** Renders an incoming friend request with options to respond */
export default function FriendRequest({ outgoing, request, currentUserId }: FriendRequestProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const respondToRequestMutation = useMutation<boolean, Error, FriendshipUpdate>({
    mutationFn: (response) => FriendshipService.respond(response),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["friends"], exact: false });
    },
  });
  const requestor = request.initiatorId === request.user.id ? request.user : request.friend;
  const requestee = request.initiatorId !== request.user.id ? request.user : request.friend;
  const styles = StyleSheet.create({
    container: {},
    disabled: { color: theme.colors.secondary, opacity: 0.2 },
  });
  const AnswerFriendRequest = () => {
    return (
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Pressable
          disabled={loading}
          style={[{ padding: 8 }, loading && styles.disabled]}
          onPress={() => {
            setLoading(true);
            respondToRequestMutation.mutate({ userId: requestee.id, friendId: requestor.id, status: "accepted" });
          }}
        >
          {loading ? <ActivityIndicator /> : <Icon source="check" size={24} color="green" />}
        </Pressable>
        <Pressable
          disabled={loading}
          style={[{ padding: 8 }, loading && styles.disabled]}
          onPress={() => {
            setLoading(true);
            respondToRequestMutation.mutate({ userId: requestee.id, friendId: requestor.id, status: "rejected" });
          }}
        >
          <Icon source="close" size={24} color="red" />
        </Pressable>
      </View>
    );
  };
  const OutGoingRequestStatus = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: theme.colors.secondary }}>{request.status}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {outgoing ? (
        <UserCard
          user={{ firstname: requestee.firstname!, lastname: requestee.lastname, phone: requestee.phone! }}
          right={<OutGoingRequestStatus />}
        />
      ) : (
        <UserCard
          user={{ firstname: requestor.firstname!, lastname: requestor.lastname, phone: requestor.phone! }}
          right={<AnswerFriendRequest />}
        />
      )}
    </View>
  );
}
