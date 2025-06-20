import React from 'react';
import { AppProvider } from './context/AppContext';
import Navigation from './components/common/Navigation';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import ReviewFormPage from './pages/ReviewFormPage';
import UserProfilePage from './pages/UserProfilePage';
import { useApp } from './hooks/useApp';

function AppContent() {
  const { state } = useApp();
  
  const renderCurrentPage = () => {
    if (state.currentPage === 'home') {
      return <HomePage />;
    } else if (state.currentPage === 'books') {
      return <BooksPage />;
    } else if (state.currentPage === 'profile') {
      return <UserProfilePage />;
    } else if (state.currentPage.startsWith('book-')) {
      const bookId = state.currentPage.split('-')[1];
      return <BookDetailsPage bookId={bookId} />;
    } else if (state.currentPage.startsWith('review-')) {
      const bookId = state.currentPage.split('-')[1];
      return <ReviewFormPage bookId={bookId} />;
    }
    return <HomePage />;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

