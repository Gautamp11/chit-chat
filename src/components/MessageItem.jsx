/* const MessageItem = ({ person, handleSelectedChat }) => {
  function onSelectChat() {
    handleSelectedChat(person);
  }

  return (
    <li
      key={person.email}
      className="flex justify-between gap-x-6 py-5"
      onClick={onSelectChat}
    >
      <div className="flex min-w-0 gap-x-4">
        <img
          alt=""
          src={person.imageUrl}
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {person.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {person.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {person.lastSeen ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen{" "}
            <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Online</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default MessageItem;
 */

import useUser from "../features/Auth/useUser";
import { useChat } from "../features/messages/useChat";
import { fetchOrCreateChat } from "../services/messageAPI";

const MessageItem = ({ person, handleSelectedChat }) => {
  const { user: currentUser } = useUser();

  const { chat, isLoading, error } = useChat(person.id, currentUser?.id);

  const handleClick = async () => {
    if (isLoading || error) return;
    // Assuming person object contains the user's details
    const chatDetails = {
      chat_id: chat?.id, // Use the actual chat_id here
      user1_id: person.id, // Person's user ID
      user2_id: currentUser.id, // Current user's ID (you already have this)
      avatar: person.avatar, // Person's avatar
      fullname: person.fullname, // Person's full name
      email: person.email, // Person's email
    };

    // Pass chatDetails to handleSelectedChat
    handleSelectedChat(chatDetails);
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer p-2 hover:bg-slate-200 flex items-center gap-4 rounded-md"
    >
      <img
        src={person.avatar}
        alt="Avatar"
        className="h-12 w-12 rounded-full"
      />
      <div>
        <div className="font-semibold">{person.email}</div>
        <div className="text-sm text-gray-500">{person.lastSeen}</div>
      </div>
    </li>
  );
};

export default MessageItem;
