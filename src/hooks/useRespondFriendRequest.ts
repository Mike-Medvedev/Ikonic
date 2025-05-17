import { FriendshipService } from "@/features/Profile/Services/friendshipService";
import { FriendshipPublic, FriendshipUpdate } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface RespondFriendRequestProps {
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
  };
}

export default function useRespondToFriendRequest({ options }: RespondFriendRequestProps = {}) {
  const [loading, setLoading] = useState<boolean>(false);
  const respondToRequestMutation = useMutation<FriendshipPublic, Error, FriendshipUpdate & { id: string }>({
    mutationFn: ({ id, status }) => FriendshipService.respond(id, { status }),
    onError: (error) => {
      options?.onError?.(error);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onSettled: () => {
      options?.onSettled?.();
    },
  });

  return { loading, setLoading, respondToRequestMutation };
}
