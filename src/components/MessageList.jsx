import { useContext, useEffect } from "react";
import useContacts from "../features/contacts/useContacts";
import MessageItem from "./MessageItem";
import { AuthContext } from "../contexts/AuthContext";

const MessageList = ({ handleSelectedChat }) => {
  const { users, isLoading, error } = useContacts(); //get list of contacts/users
  const currentUser = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <ul role="list">
      {users.map(
        (user) =>
          currentUser.id !== user.id && (
            <MessageItem
              person={{
                id: user.id, // Make sure this is available
                name: user.username,
                email: user.email,
                avatar:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                // lastSeen: user.last_seen || "unknown",
                bio: "",
              }}
              key={user.id} // Use unique ID as key
              handleSelectedChat={handleSelectedChat}
            />
          )
      )}
    </ul>
  );
};

export default MessageList;
