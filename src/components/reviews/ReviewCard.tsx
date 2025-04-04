
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewCardProps {
  id: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

const ReviewCard = ({ user, date, rating, comment }: ReviewCardProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">{user}</h3>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
