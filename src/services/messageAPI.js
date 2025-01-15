import supabase from "../../supabase"; // ensure initialization

// Fetch messages for a specific chat using chat_id
export async function fetchMessages(chatId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("timestamp", { ascending: true });

  console.log("Hey from fetchMessages");
  if (error) {
    console.error("Error fetching messages:", error.message);
    return { data: [], error };
  }

  return { data, error: null };
}

// Send a new message
export async function sendMessage(newMessage) {
  const { data, error } = await supabase.from("messages").insert([newMessage]);

  if (error) {
    console.error("Error sending message:", error.message);
    throw new Error(error.message);
  }

  return data;
}

// Subscribe to new messages in real-time
export const subscribeToMessages = (setMessages) => {
  return supabase
    .from("messages")
    .on("INSERT", (payload) => {
      setMessages((currentMessages) => [...currentMessages, payload.new]);
    })
    .subscribe();
};

// Fetch or create a chat between two users
export async function fetchOrCreateChat({ user1_id, user2_id }) {
  // Check if both user IDs are valid
  const { data: user1, error: user1Error } = await supabase
    .from("users")
    .select("id")
    .eq("id", user1_id)
    .single();

  const { data: user2, error: user2Error } = await supabase
    .from("users")
    .select("id")
    .eq("id", user2_id)
    .single();

  if (user1Error || user2Error) {
    throw new Error("One or both users do not exist.");
  }

  // Check if a chat exists between the two users
  const { data: existingChat, error } = await supabase
    .from("chats")
    .select("*")
    .or(
      `and(user1_id.eq.${user1_id},user2_id.eq.${user2_id}),and(user1_id.eq.${user2_id},user2_id.eq.${user1_id})`
    )
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching chat:", error.message);
    throw new Error(error.message);
  }

  // If no existing chat, create a new one
  if (!existingChat) {
    const { data: newChat, error: createError } = await supabase
      .from("chats")
      .insert([{ user1_id, user2_id }])
      .single();

    if (createError) {
      console.error("Error creating new chat:", createError.message);
      throw new Error(createError.message);
    }
    // console.log(newChat);
    return newChat;
  }

  // Return the existing chat if it already exists
  // console.log(existingChat);
  return existingChat;
}
