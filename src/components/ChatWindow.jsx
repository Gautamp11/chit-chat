import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLogout } from "../features/Auth/useLogout";
import MessageList from "./MessageList";
import Chat from "./Chat";
import NavHeader from "./NavHeader";

const ChatWindow = () => {
  const currentUser = useContext(AuthContext); // getting current user from context
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  const { logout, isLoading } = useLogout(); // logout api

  function handleSelectedChat(chat) {
    // Ensure chat contains necessary properties
    setSelectedChat(chat);
  }

  return (
    <div className=" flex h-[97vh]  gap-4 mx-auto sm:max-w-[90vw] bg-slate-100 my-2">
      <div className="flex-1/2 overflow-y-auto ">
        <NavHeader currentUserEmail={currentUser?.email} logout={logout} />
        <MessageList handleSelectedChat={handleSelectedChat} />
      </div>
      <div className="block flex-1 sm:overflow-auto">
        {selectedChat ? (
          <Chat selectedChat={selectedChat} />
        ) : (
          <div className="flex items-center h-screen justify-center text-lg font-bold">
            Start Chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
