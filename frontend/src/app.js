import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Acceuil from './acceuil/acceuil'
import Login from './login/login';
import Signup from './signup/signup';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/acceuil" element={<Acceuil/>} />
      </Routes>
    </Router>
  );
}

export default App;