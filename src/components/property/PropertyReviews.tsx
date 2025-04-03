
import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface PropertyReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const PropertyReviews = ({ rating, reviewCount, reviews }: PropertyReviewsProps) => {
  return (
    <div className="p-4 rounded-lg border bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Star className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
        <span className="text-lg font-medium">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">· {reviewCount} đánh giá</span>
      </div>
      
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{review.user}</span>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyReviews;
