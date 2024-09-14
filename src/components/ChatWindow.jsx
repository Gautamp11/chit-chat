/* import MessageList from "./MessageList";

import Chat from "./Chat";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../features/Auth/useLogout";
import NavHeader from "./NavHeader";

const ChatWindow = () => {
  const currentUser = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();

  function handleSelectedChat(selected) {
    setSelectedChat(selected);
  }

  return (
    <div className="flex h-screen gap-8 mx-auto sm:max-w-[90vw] bg-slate-100 m-2 rounded-md p-4 ">
      <div className="flex-1 overflow-y-auto">
        <NavHeader logout={logout} />
        <MessageList handleSelectedChat={handleSelectedChat} />
      </div>
      <div className="flex-1 overflow-auto">
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
 */

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLogout } from "../features/Auth/useLogout";
import MessageList from "./MessageList";
import Chat from "./Chat";
import NavHeader from "./NavHeader";

const ChatWindow = () => {
  const currentUser = useContext(AuthContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();
  const { logout, isLoading } = useLogout();

  function handleSelectedChat(chat) {
    // Ensure chat contains necessary properties
    setSelectedChat(chat);
  }

  return (
    <div className="flex h-screen gap-8 mx-auto sm:max-w-[90vw] bg-slate-100 m-2 rounded-md p-4">
      <div className="flex-1 overflow-y-auto">
        <NavHeader logout={logout} />
        <MessageList handleSelectedChat={handleSelectedChat} />
      </div>
      <div className="flex-1 overflow-auto">
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
