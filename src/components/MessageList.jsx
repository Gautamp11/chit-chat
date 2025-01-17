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
        (user, index) =>
          currentUser.id !== user.id && (
            <MessageItem
              person={{
                id: user.id, // Make sure this is available
                name: user.username,
                email: user.email,
                avatar:
                  user.profile_image ||
                  `https://randomuser.me/api/portraits/men/${index}.jpg`,
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
