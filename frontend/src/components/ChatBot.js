import React, { useEffect, useState } from "react";
import chat from "../image/chat.png";
import chatStars from "../image/chatStars.png";
import "./ChatBot.css";
import { containerClasses } from "@mui/material";

const ChatBot = () => {
  const [message, setMessage] = useState("Je suis là si tu as besoin d'aide");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage("Coincé? je vais t'aider");
    }, 100000); // Update every 20 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="chatBotContainer">
      <div className="FullChat">
        <div className="chat">
          <img src={chat} alt="" />
          <div className="eye"></div>
        </div>
        <img src={chatStars} alt="" id="chatStars" />
        <div className="chatMessage">{message}</div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default ChatBot;
