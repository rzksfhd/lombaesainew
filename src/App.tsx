import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { WinnersPage } from './pages/WinnersPage';
import { SchedulePage } from './pages/SchedulePage';
import { PrizesPage } from './pages/PrizesPage';
import { TermsPage } from './pages/TermsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { Footer } from './pages/Footer';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { useWinners } from './hooks/useWinners';

function PublicPage() {
  const [activeSection, setActiveSection] = useState('home');
  const { winners } = useWinners();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} onSectionClick={scrollToSection} />
      <HomePage onScrollToSection={scrollToSection} />
      <WinnersPage winners={winners} onScrollToSection={scrollToSection} />
      <SchedulePage />
      <PrizesPage />
      <TermsPage />
      <DownloadsPage />
      <Footer onSectionClick={scrollToSection} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;