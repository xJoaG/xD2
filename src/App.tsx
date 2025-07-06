import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SupportPage from './pages/SupportPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;