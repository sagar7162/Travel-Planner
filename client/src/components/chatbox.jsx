import React, { useState } from "react";

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const trip = "xyx trip";

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <div>
      <div className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-1/5 p-4 border border-r-2 border-b-2 border-t-2 border-black box-border flex flex-col rounded bg-gray-800 text-white">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-lg font-bold">{trip} Chat</h2>
        </div>
        {/* Chat Messages */}
        <div className="flex flex-1 flex-col overflow-y-auto gap-y-2 items-start p-2 border border-gray-700 rounded">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-sm">No messages yet...</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className="bg-gray-700 p-2 rounded text-sm w-full text-left"
              >
                {message}
              </div>
            ))
          )}
        </div>
        {/* Input and Send Button */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 w-4 p-2 border border-gray-700 rounded bg-gray-900 text-white text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-black p-2 rounded text-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
