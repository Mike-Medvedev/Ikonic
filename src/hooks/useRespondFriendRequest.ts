import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { FriendshipUpdate } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useRespondFriendRequest() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const respondToRequestMutation = useMutation<boolean, Error, FriendshipUpdate>({
    mutationFn: (response) => FriendshipService.respond(response),
    onError: () => {},
    onSuccess: () => {},
    onSettled: () => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["friends"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["friend-requests"], exact: false });
    },
  });

  return { loading, setLoading, respondToRequestMutation };
}
