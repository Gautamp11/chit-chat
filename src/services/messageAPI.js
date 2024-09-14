import supabase from "../../supabase"; // make sure you have this initialization somewhere in your services

// Fetch messages for a specific chat using chat_id
export async function fetchMessages(chatId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error.message);
    return { data: [], error };
  }

  return { data, error: null };
}

export async function sendMessage(newMessage) {
  const { data, error } = await supabase.from("messages").insert([newMessage]);

  if (error) throw new Error(error.message);

  return data;
}
const subscribeToMessages = (setMessages) => {
  return supabase
    .from("messages")
    .on("INSERT", (payload) => {
      setMessages((currentMessages) => [...currentMessages, payload.new]);
    })
    .subscribe();
};

export async function fetchOrCreateChat(user1_id, user2_id) {
  // Check if a chat exists between user1 and user2 in either direction
  const { data: existingChat, error } = await supabase
    .from("chats")
    .select("*")
    .or(
      `and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user1_id.eq.${user2_id},user2_id.eq.${user1_id})`
    )
    .single();

  if (error && error.code !== "PGRST116") {
    // If the error is something other than 'no rows found', throw the error
    throw new Error(error.message);
  }

  // If no existing chat, create a new one
  if (!existingChat) {
    const { data: newChat, error: createError } = await supabase
      .from("chats")
      .insert([{ user1_id, user2_id }])
      .single();

    if (createError) throw new Error(createError.message);

    return newChat;
  }

  return existingChat;
}

export { subscribeToMessages };
