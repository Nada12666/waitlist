import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { RegisterPage } from './components/RegisterPage';
import { ThankYouPage } from './components/ThankYouPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'thank-you'>('home');

  const handleNavigate = (page: 'home' | 'register' | 'thank-you') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'thank-you' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'register' && (
        <RegisterPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'thank-you' && (
        <ThankYouPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}