import { useState } from "react";

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message); // Pass the message to the parent component
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="bg-slate-900 sticky bottom-0 border-t-2 p-2 border-slate-800">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 outline-none  rounded-lg bg-slate-900"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
