import React, { useEffect, useState } from "react";
import chat from "../image/chat.png";
import chatStars from "../image/chatStars.png";
import "./ChatBot.css";

const ChatBot = () => {
  const [message, setMessage] = useState("Je suis là si tu as besoin d'aide");
  const [hovered, setHovered] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage("Coincé? je vais t'aider");
    }, 100000); // Update every 100 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleBotClick = () => {
    setChatVisible(true);
    setClosing(false);
  };

  const handleCloseClick = () => {
    setClosing(true);
    setTimeout(() => setChatVisible(false), 500); // Match the duration of the fadeOut animation
  };

  return (
    <div
      className="chatBotContainer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleBotClick}
    >
      <div className={`FullChat ${hovered ? "paused" : ""}`}>
        <div className="chat">
          <img src={chat} alt="chat" />
          <div className="eye"></div>
        </div>
        <img src={chatStars} alt="chat stars" id="chatStars" />
        <div className="chatMessage">{message}</div>
        <div className="shadow"></div>
      </div>
      {chatVisible && (
        <div className={`chatFrame ${closing ? "fadeOut" : "fadeIn"}`}>
          <div className="chatHeader">
            Chat with Us!
            <button className="closeButton" onClick={handleCloseClick}>
              X
            </button>
          </div>
          <div className="chatBody">
            <p>Hello! How can I assist you today?</p>
            {/* Add more chat messages or input fields here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
