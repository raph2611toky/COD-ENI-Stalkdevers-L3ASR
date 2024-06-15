// src/Sidebar.js
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="sidebar-item">
          <i className="icon">📋</i>
          <span>Autotasks</span>
        </li>
        <li className="sidebar-item selected">
          <i className="icon">🔧</i>
          <span>Services</span>
        </li>
        <li className="sidebar-item">
          <i className="icon">📁</i>
          <span>Governance</span>
        </li>
        <li className="sidebar-item">
          <i className="icon">🗂️</i>
          <span>Center</span>
        </li>
        <li className="sidebar-item">
          <i className="icon">⚖️</i>
          <span>Juridical</span>
        </li>
        <li className="sidebar-item notification">
          <i className="icon">🔔</i>
          <span>Notifications</span>
          <span className="notification-badge">2</span>
        </li>
        <li className="sidebar-item">
          <i className="icon">🏠</i>
          <span>Homepage</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
