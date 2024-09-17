import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useMessages } from "../features/messages/useMessages";
import ChatInput from "./ChatInput";
import { useNewMessage } from "../features/messages/useNewMessage";
import supabase from "../../supabase"; // Ensure this is the correct path for your Supabase client

function Chat({ selectedChat }) {
  const endOfMessagesRef = useRef(null);
  const currentUser = useContext(AuthContext);

  const { messages, isLoading, refetch } = useMessages(selectedChat);
  const { data: messageData, error } = messages;

  const { mutate: addNewMessage, error: newMessageError } = useNewMessage();

  function onSendMessage(messageContent) {
    const newMessage = {
      chat_id: selectedChat.chat_id,
      sender_id: currentUser.id,
      text: messageContent,
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

  return (
    <div className=" flex flex-col h-[97vh] overflow-auto border-l-2 ">
      <div className="bg-slate-100 p-2 flex items-center gap-4 sticky top-0 z-10 border-b-2">
        <img
          src={selectedChat?.avatar}
          className="h-12 w-12 rounded-full bg-gray-50"
          alt="Chat Avatar"
        />
        <div>{selectedChat?.fullname || selectedChat?.email}</div>
      </div>
      <div className="bg-slate-200 flex-1 overflow-y-auto p-4">
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
                    ? "bg-slate-300"
                    : "bg-slate-50"
                } p-2 rounded-lg mb-1 max-w-[70%] inline-block`}
              >
                {message.text}
                <div className="text-xs text-gray-500">
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
