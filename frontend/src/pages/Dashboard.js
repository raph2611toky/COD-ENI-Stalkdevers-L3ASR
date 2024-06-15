import React from "react";
import TopBar from "../components/TopBar";
import ChatBot from "../components/ChatBot";
import { MainDashboard, SideBar } from "./dashboard-section";

const Dashboard = () => {
  return (
    <div className="bg-white w-auto h-screen flex flex-col">
      <div className="h-20 w-full">
        <TopBar />
      </div>

      <div className="w-full flex-1 flex">
        <SideBar />

        <div className="flex-1">
          <div className="list-service">
            <MainDashboard />
          </div>
        </div>
        <ChatBot />
      </div>
    </div>
  );
};

export default Dashboard;
