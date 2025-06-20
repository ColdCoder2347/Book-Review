import React, { useEffect } from 'react';
import { Book, Star, User } from 'lucide-react';
import { useApp } from '/hooks/useApp';
import { mockApi } from '/services/api';
import LoadingSpinner from '/components/common/LoadingSpinner';
import ErrorMessage from '/components/common/ErrorMessage';
import BookCard from '/components/books/BookCard';

export default function HomePage() {
  const { state, dispatch } = useApp();
  
  useEffect(() => {
    async function loadFeaturedBooks() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const books = await mockApi.getFeaturedBooks();
        dispatch({ type: 'SET_FEATURED_BOOKS', payload: books });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load featured books' });
      }
    }
    
    loadFeaturedBooks();
  }, [dispatch]);
  
  const handleViewDetails = (bookId) => {
    dispatch({ type: 'SET_PAGE', payload: `book-${bookId}` });
  };
  
  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage message={state.error} />;
  
  return (
    <div className="space-y-8">
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookReview</h1>
        <p className="text-xl opacity-90">Discover your next favorite book</p>
      </div>
      
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
          <button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'books' })}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Books →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.featuredBooks.map(book => (
            <BookCard key={book.id} book={book} onViewDetails={handleViewDetails} />
          ))}
        </div>
      </section>
      
      <section className="bg-gray-50 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose BookReview?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Vast Collection</h3>
            <p className="text-gray-600">Explore thousands of books across all genres</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Honest Reviews</h3>
            <p className="text-gray-600">Read authentic reviews from real readers</p>
          </div>
          <div className="text-center">
            <User className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Connect with fellow book enthusiasts</p>
          </div>
        </div>
      </section>
    </div>
  );
}