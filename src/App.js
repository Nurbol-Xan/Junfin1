import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Register from './routes/Register';
import AdminDashboard from './admin/AdminDashboard';
import ParentDashboard from './parent/ParentDashboard';
import ChildDashboard from './child/ChildDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default root: / -> /uz/ */}
        <Route path="/" element={<Navigate to="/uz/" replace />} />
        {/* Til prefiksi bilan marshrutlar */}
        <Route path=":lang/" element={<Landing />} />
        <Route path=":lang/login" element={<Login />} />
        <Route path=":lang/register" element={<Register />} />
        <Route path=":lang/admin/*" element={<AdminDashboard />} />
        <Route path=":lang/parent/*" element={<ParentDashboard />} />
        <Route path=":lang/child/*" element={<ChildDashboard />} />
        {/* Boshqa marshrutlar keyinchalik qo‘shiladi */}
      </Routes>
    </Router>
  );
}

export default App;
