import React from "react";
import TopBar from "../components/TopBar";
import ChatBot from "../components/ChatBot";
import SideBar from "./dashboard";

const Dashboard = () => {
  return (
    <div>
      <TopBar />
      <SideBar />
      <ChatBot />
    </div>
  );
};

export default Dashboard;
