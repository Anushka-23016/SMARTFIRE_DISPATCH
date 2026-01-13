import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login.jsx';     // Match your lowercase filename
import Dashboard from './components/dashboard.jsx'; // Match your lowercase filename
import AdminPanel from './components/admin.jsx'; // This looks for the 'default' export you just added

// This file ONLY handles which page to show the user
function App() {
  return (
    <Router>
      <Routes>
        {/* The URL paths for your app */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;