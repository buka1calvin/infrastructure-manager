import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { addMessage, getMessages } from "../Actions/service/messageActions";
import avatar from "../../assets/avatar1.svg";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const Chat = ({ currentUser, currentChat, socket }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [isOnline, setIsOnline] = useState(false);
  const [isChatUserOnline, setIsChatUserOnline] = useState(false);

  useEffect(() => {
    const getAllMessages = async () => {
      if (currentChat) {
        console.log("current chat", currentChat);
        const data = await getMessages(currentUser._id, currentChat._id);
        console.log("$$$$$$$$$", data);
        setOldMessages(data.messages);
      }
    };
    getAllMessages();
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.length > 0) {
      const message = await addMessage(
        currentUser._id,
        currentChat._id,
        newMessage
      );
      socket.current.emit("send-msg", {
        sender: currentUser._id,
        receiver: currentChat._id,
        message: newMessage,
      });

      const messages = [...oldMessages];
      messages.push({ fromSelf: true, message: newMessage });
      setOldMessages(messages);
    }
    setNewMessage("");
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-received", (message) => {
        
        if (message.error) {
          console.error("Error receiving message:", message.error);
        } else {
          setArrivalMessage({ fromSelf: false, message: message });
          console.log("Received message:", message);
        }
        socket.current.emit("check-chat-user-online", currentChat?._id);
      });
      socket.current.on("user-online", () => {
        setIsOnline(true);
      });

      socket.current.on("user-offline", () => {
        setIsOnline(false);
      });

      socket.current.on("chat-user-online", () => {
        setIsChatUserOnline(true);
      });

      socket.current.on("chat-user-offline", () => {
        setIsChatUserOnline(false);
      });
    }
  }, [currentUser]);
  useEffect(() => {
    arrivalMessage && setOldMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [oldMessages]);
  console.log("me:", currentUser, "him:", currentChat);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [oldMessages]);
  return (
    <div className="container mx-auto p-4 bg-gray w-full h-full font-jost xs:w-full">
      <div className="border border-gray-200 bg-[#263238] h-[90px] rounded-tl-lg rounded-tr-lg flex p-[16px] items-center gap-3">
        <img
          className="w-[60px] rounded-[50%] h-[60px] border-[1px] border-[#656565]"
          src={currentChat?.profilePic}
          alt=""
        />
        <h2 className="text-[#CCCCCC] text-[24px] xs:text-[13px]">
          {currentChat?.firstname} {currentChat?.lastname}
        </h2>
        {isOnline && isChatUserOnline ? (
          <span className="bg-[green] w-[10px] h-[10px] rounded-full ml-auto"></span>
        ) : (
          <span className="bg-[gray] w-[10px] h-[10px] rounded-full ml-auto "></span>
        )}
      </div>
      <div ref={scrollRef} className="border border-gray-200 p-4 rounded min-h-[30vh] h-[50vh] overflow-scroll">
        {oldMessages?.map((message, index) => (
          <div
            className={`flex mb-4 ${
              message.fromSelf ? "justify-end" : "justify-start"
            }`}
            key={index}
          >
<div
      className={`${
        message.fromSelf
          ? "bg-[#5157E0] text-white w-fit"
          : "bg-[#09B294] text-white w-fit"
      } p-2 rounded-lg shadow-lg`}
    >
      <div className="flex items-center mb-1">
        <img
          className="w-[30px] h-[30px] rounded-full mr-2 border-[1px] border-[#D9D9D9]"
          src={message.fromSelf ? currentUser.profilePic : currentChat.profilePic}
          alt="Profile"
        />
        <p className="text-sm text-white ml-auto">
          {message.fromSelf ? "You" : currentChat.firstname}
        </p>
      </div>
      <p className="text-[12px] font-[200] w-[150px] xs:w-[100px]  break-all">{message.message}</p>
      <p className="text-[6px] text-[#fff]">
        {message.createdAt}
      </p>
    </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 items-center gap-2">
        <form className="w-full flex rounded-br-xl shadow-lg p-2 bg-[#D9D9D9]" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="flex-grow border  rounded-[20px] pl-3  mr-2 text-[#263238]"
            value={newMessage}
            required
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="bg-[#5157E0] text-white px-3 py-3 rounded-full mr-[12px]">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
