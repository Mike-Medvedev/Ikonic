import { InviteService } from "@/features/Trips/Services/inviteService";
import { InviteBatchResponseData, InviteCreate } from "@/types";
import { useMutation } from "@tanstack/react-query";

interface InviteUserPayload {
  tripId: string;
  invites: InviteCreate;
}

interface UseInviteProps {
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
  };
}

/**
 * Custom Hook for inviting users to trips
 */
export default function useInvite({ options }: UseInviteProps) {
  const inviteUsersMutation = useMutation<InviteBatchResponseData, Error, InviteUserPayload>({
    mutationFn: (payload) => InviteService.inviteUsers(payload.tripId, payload.invites),
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

  return { inviteUsersMutation };
}
