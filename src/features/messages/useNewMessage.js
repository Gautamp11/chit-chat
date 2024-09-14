import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../../services/messageAPI";

export function useNewMessage() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (newMessage) => sendMessage(newMessage),
    onSuccess: () => queryClient.invalidateQueries(),
  });

  return { mutate, isLoading, error };
}
