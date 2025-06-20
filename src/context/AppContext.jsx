import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  user: { id: 1, name: "John Doe", email: "john@example.com", reviewsCount: 23 },
  currentPage: 'home',
  books: [],
  featuredBooks: [],
  currentBook: null,
  searchQuery: '',
  selectedGenre: '',
  loading: false,
  error: null,
  currentBookPage: 1
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FEATURED_BOOKS':
      return { ...state, featuredBooks: action.payload, loading: false };
    case 'SET_BOOKS':
      return { ...state, books: action.payload.books, totalPages: action.payload.totalPages, loading: false };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload, loading: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_GENRE':
      return { ...state, selectedGenre: action.payload };
    case 'SET_BOOK_PAGE':
      return { ...state, currentBookPage: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}