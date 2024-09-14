import { useQuery } from "@tanstack/react-query";
import { fetchOrCreateChat } from "../../services/messageAPI";

export function useChat(user1_id, user2_id) {
  const {
    data: chat = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chat", user1_id, user2_id], // Add these to the query key
    queryFn: () => fetchOrCreateChat(user1_id, user2_id),
  });

  return { chat, isLoading, error };
}
