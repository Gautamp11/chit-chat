/* import useContacts from "../features/contacts/useContacts";
import MessageItem from "./MessageItem";

const MessageList = ({ handleSelectedChat }) => {
  // Fetch users from the database
  const { users, isLoading, error } = useContacts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users.map((user, index) => (
        <MessageItem
          person={{
            name: user.name,
            email: user.email,
            imageUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            lastSeen: "unknown", //
            lastSeenDateTime: user.last_seen || "unknown",
          }}
          key={index}
          handleSelectedChat={handleSelectedChat}
        />
      ))}
    </ul>
  );
};
export default MessageList;
 */

import useUser from "../features/Auth/useUser";
import useContacts from "../features/contacts/useContacts";
import MessageItem from "./MessageItem";

const MessageList = ({ handleSelectedChat }) => {
  const { users, isLoading, error } = useContacts();

  const { user: currentUser } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading contacts.</p>;

  return (
    <ul role="list" className="divide-y divide-slate-100">
      {users.map(
        (user) =>
          currentUser.id !== user.id && (
            <MessageItem
              person={{
                id: user.id, // Make sure this is available
                name: user.fullname,
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
