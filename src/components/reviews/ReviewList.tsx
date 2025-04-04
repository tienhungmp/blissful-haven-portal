
import React from 'react';
import ReviewCard from './ReviewCard';

export interface Review {
  id: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <ReviewCard 
          key={review.id} 
          id={review.id}
          user={review.user}
          date={review.date}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ReviewList;
