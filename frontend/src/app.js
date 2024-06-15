import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Acceuil from "./acceuil/acceuil";
import Login from "./login/login";
import Signup from "./signup/signup";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { LandingPage } from "./pages/langing-page";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
