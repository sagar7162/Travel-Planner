import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

function Chatbox({ selectedTrip, cookie }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  
  // Create a ref to hold the socket instance
  const socketRef = useRef();

  // Initialize the socket connection once on component mount
  useEffect(() => {
    // Ensure the URL matches your backend
    socketRef.current = io("http://localhost:7162", {
      transports: ['websocket'],
    });

    // Listen for new messages coming from the backend
    socketRef.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the connection on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // When the selected trip changes, join the appropriate room and get previous messages
  useEffect(() => {
    if (selectedTrip && selectedTrip._id) {
      // Emit joinRoom event for the selected trip's room
      socketRef.current.emit("joinRoom", selectedTrip._id);

      // Listen for previous messages for this room
      socketRef.current.on("previousMessages", (previousMessages) => {
        setMessages(previousMessages);
      });

      // Remove the listener when the room changes
      return () => {
        socketRef.current.off("previousMessages");
      };
    }
  }, [selectedTrip]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && selectedTrip && selectedTrip._id) {
      const messageData = {
        tripId: selectedTrip._id,
        cookie: cookie, 
        message: inputMessage,
      };
      // Emit the chat message event to the backend
      socketRef.current.emit("chatMessage", messageData);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed top-[70px] right-0 h-[calc(100vh-70px)] w-1/5 p-4 border border-r-2 border-b-2 border-t-2 border-black box-border flex flex-col rounded bg-gray-800 text-white">
      {/* Header */}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-lg font-bold">
          {selectedTrip ? selectedTrip.trip + " Chat" : "Select a Trip"}
        </h2>
      </div>
      {/* Chat Messages */}
      <div className="flex flex-1 flex-col overflow-y-auto gap-y-2 items-start p-2 border border-gray-700 rounded">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 rounded text-sm w-full text-left"
            >
              <div>
                <strong>{msg.user.name}:</strong> {msg.message}
              </div>
              <div className="text-xs text-gray-300">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
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
  );
}

export default Chatbox;
