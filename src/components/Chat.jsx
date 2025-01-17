import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useMessages } from "../features/messages/useMessages";
import ChatInput from "./ChatInput";
import { useNewMessage } from "../features/messages/useNewMessage";
import supabase from "../../supabase"; // Ensure this is the correct path for your Supabase client

function Chat({ selectedChat }) {
  // console.log(selectedChat);

  const endOfMessagesRef = useRef(null);
  const currentUser = useContext(AuthContext);

  const { messages, isLoading, refetch } = useMessages(selectedChat);
  const { data: messageData, error } = messages;

  const { mutate: addNewMessage, error: newMessageError } = useNewMessage();

  function onSendMessage(messageContent) {
    const newMessage = {
      chat_id: selectedChat.chat_id,
      sender_id: currentUser.id,
      content: messageContent,
      timestamp: new Date().toISOString(),
    };

    addNewMessage(newMessage);
  }

  useEffect(() => {
    // Subscribe to the Supabase real-time changes
    const channel = supabase
      .channel("messages") // Channel name for reference
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  // handle scroll to the bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Depend on messages array to trigger scroll on update

  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  // Sort messages by timestamp
  let sortedMessages = messageData?.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  // console.log(sortedMessages);

  return (
    <div className=" flex flex-col h-screen p-2">
      <div className="bg-slate-900 p-2 flex items-center gap-4 sticky top-0 z-10 border-b-2 border-slate-800">
        <img
          src={selectedChat?.avatar}
          className="h-10 w-10 rounded-full"
          alt="Chat Avatar"
        />
        <div>{selectedChat?.fullname || selectedChat?.email}</div>
      </div>
      <div className="bg-slate-900 p-4">
        {sortedMessages?.map((message) => (
          <div key={message.id} className="mb-2">
            <div
              className={
                message.sender_id === currentUser.id
                  ? "text-right"
                  : "text-left"
              }
            >
              <div
                className={`${
                  message.sender_id === currentUser.id
                    ? "bg-slate-800"
                    : "bg-slate-500"
                } p-2 rounded-lg mb-2 inline-block`}
              >
                {message.content}
                <div className="text-xs text-slate-300">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />{" "}
        {/* This empty div is used to scroll to */}
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default Chat;
