import { useContext } from "react";
import useUser from "../features/Auth/useUser";
import { useChat } from "../features/messages/useChat";
import { fetchOrCreateChat } from "../services/messageAPI";
import { AuthContext } from "../contexts/AuthContext";

const MessageItem = ({ person, handleSelectedChat }) => {
  const currentUser = useContext(AuthContext);

  const { chat, isLoading, error, refetch } = useChat(
    person.id,
    currentUser?.id
  );

  const handleClick = async () => {
    if (isLoading || error) return;

    // Trigger the query to fetch or create the chat
    const { data } = await refetch();

    // Ensure chat is fetched before proceeding

    const chatDetails = {
      chat_id: data.id,
      user1_id: person.id,
      user2_id: currentUser.id,
      avatar: person.avatar,
      username: person.name,
      email: person.email,
    };

    handleSelectedChat(chatDetails);
  };

  return (
    <li
      onClick={handleClick}
      className="md:p-2 cursor-pointer p-2 hover:bg-slate-800 flex items-center gap-4 rounded-md"
    >
      <img
        src={person.avatar}
        alt="Avatar"
        className="h-12 w-12 rounded-full"
      />
      <div>
        <div className="font-semibold">{person.name || person.email}</div>
        {/* <div className="text-sm text-gray-500">{person.lastSeen}</div> */}
      </div>
    </li>
  );
};

export default MessageItem;
