import { useQuery } from "@tanstack/react-query";
import { fetchOrCreateChat } from "../../services/messageAPI";

export function useChat(user1_id, user2_id) {
  const {
    data: chat = {},
    isLoading,
    error,
    refetch, // Add refetch to trigger the query manually
  } = useQuery({
    queryKey: ["chat", user1_id, user2_id],
    queryFn: () => fetchOrCreateChat({ user1_id, user2_id }),
    enabled: false, // Prevent the query from running on mount
  });

  return { chat, isLoading, error, refetch };
}
