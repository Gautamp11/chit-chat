import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../../services/messageAPI";

export function useMessages(selectedChat) {
  const {
    data: messages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages", selectedChat?.chat_id],
    queryFn: () => fetchMessages(selectedChat?.chat_id),
    enabled: !!selectedChat?.chat_id, // Ensure chat_id exists before making the query
  });

  return { messages, isLoading, error };
}
