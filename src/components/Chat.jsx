import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useMessages } from "../features/messages/useMessages";
import ChatInput from "./ChatInput";
import { useNewMessage } from "../features/messages/useNewMessage";

function Chat({ selectedChat }) {
  const currentUser = useContext(AuthContext);

  const { messages, isLoading } = useMessages(selectedChat);
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

  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  let sortedMessages = messageData.sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-slate-100 p-2 flex items-center gap-4 sticky top-0 z-10">
        <img
          src={selectedChat?.avatar}
          className="h-12 w-12 rounded-full bg-gray-50"
          alt="Chat Avatar"
        />
        <div>{selectedChat?.email}</div>
      </div>

      <div className="bg-gray-50 flex-1 overflow-y-auto p-4">
        {sortedMessages.map((message) => (
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
                    ? "bg-blue-100"
                    : "bg-gray-100"
                } p-2 rounded-lg mb-1 max-w-[70%] inline-block`}
              >
                {message.text}
                <div className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default Chat;
