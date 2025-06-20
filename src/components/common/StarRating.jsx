import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 'sm', interactive = false, onChange }) {
  const sizeClasses = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star 
          key={star}
          className={`${sizeClasses} ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-300' : ''}`}
          onClick={interactive ? () => onChange?.(star) : undefined}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}