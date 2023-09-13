import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { getSingleUser } from "../Actions/service/AuthUser";
import chatbot from "../../assets/chatBot.svg"
import { chatBot } from "../Actions/service/messageActions";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatVisible,setChatVisible]=useState(false);
  const chatboxRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    try {
      const newMessage = {
        text: inputMessage,
        isUser: true,
        time:getCurrentTime()
      };

      // Send user message to the server
      const response = await chatBot(newMessage)
      console.log("response", response);
      // Update chat history
      console.log(newMessage)
      setMessages([...messages, newMessage, response]);

      // Clear input field
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };
  useEffect(() => {
    if (chatboxRef.current && messages.length > 0) {
      const lastMessage = chatboxRef.current.lastChild;
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);
  return (
    <div className="chatbot-container flex flex-col items-center  justify-center bg-[white] font-jost">
      {chatVisible && (
        <div className="p-4  bg-[white] w-[30%] fixed left-[61%] top-[30%] rounded-lg shadow-xl">
      <div ref={chatboxRef} className="chatbox p-4 border rounded-lg shadow-md bg-white flex flex-col h-[300px] overflow-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message p-2 mb-2 rounded-lg ${
              message.isUser
                ? "bg-[#5157E0] text-white self-end w-[45%]"
                : "bg-[#09B294] text-white self-start w-[45%]"
            }`}
          >
            <span className={`${message.isUser ? "ml-auto":"mr-auto"} font-bold`}>
              {message.isUser ? "User" : "Bot"}{" "}
              {/* Display the time along with the user/bot label */}
            </span>
            <br />
            <p>{message.text}</p>
            <p className="text-[10px]">{message.time}</p>
          </div>
        ))}
      </div>
      <div className="input-box flex p-1 mt-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 rounded-l-lg border-r border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
      </div>
)}
      <button
        onClick={toggleChat}
        className="bg-[#5157E0] fixed left-[90%] p-4 rounded-full top-[80%] shadow-2xl" 
      >
        <img src={chatbot} alt="chat bot"className="w-[40px] h-[40px]"/>
      </button>
    </div>
  );
};

export default ChatBot;
