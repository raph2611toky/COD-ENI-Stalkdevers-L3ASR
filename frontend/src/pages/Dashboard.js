import React from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import ChatBot from "../components/ChatBot";

const Dashboard = () => {
  return (
    <div>
      <TopBar />
      <Sidebar />
      <ChatBot />
    </div>
  );
};

export default Dashboard;
