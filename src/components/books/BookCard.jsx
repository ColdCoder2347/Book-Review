import React from 'react';
import StarRating from '../common/StarRating';

export default function BookCard({ book, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {book.cover}
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 mb-3">{book.author}</p>
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={book.rating} />
          <span className="text-sm text-gray-500">{book.reviews} reviews</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {book.genre}
          </span>
          <button 
            onClick={() => onViewDetails(book.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}