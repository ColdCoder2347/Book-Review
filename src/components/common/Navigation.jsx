import React from 'react';
import { Home, Book, User } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export default function Navigation() {
  const { state, dispatch } = useApp();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'books', icon: Book, label: 'Books' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Book className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">BookReview</span>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = state.currentPage === item.id || 
                              (item.id === 'books' && state.currentPage.startsWith('book-')) ||
                              (item.id === 'books' && state.currentPage.startsWith('review-'));
              
              return (
                <button
                  key={item.id}
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: item.id })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}