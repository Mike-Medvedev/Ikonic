import { InviteService } from "@/features/Trips/Services/inviteService";
import { InvitationBatchResponseData, InvitationCreate } from "@/types";
import { useMutation } from "@tanstack/react-query";

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
  const inviteUsersMutation = useMutation<InvitationBatchResponseData, Error, { tripId: string } & InvitationCreate>({
    mutationFn: (payload) => InviteService.inviteUsers(payload.tripId, { invites: payload.invites }),
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
