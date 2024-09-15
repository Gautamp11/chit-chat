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
    <div className="bg-slate-200 p-4 border-t border-slate-300 sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border border-slate-300 rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-slate-600 text-white rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
