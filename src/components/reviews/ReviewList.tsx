
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import ReviewCard from './ReviewCard';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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

type SortOption = 'highest' | 'lowest' | 'newest' | 'oldest';

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [sortOption, setSortOption] = useState<SortOption>('highest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);

  const filteredAndSortedReviews = useMemo(() => {
    // First filter reviews based on minRating
    let result = [...reviews];
    
    if (minRating !== null) {
      result = result.filter(review => review.rating >= minRating);
    }
    
    // Then sort based on sortOption
    return result.sort((a, b) => {
      switch (sortOption) {
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        default:
          return 0;
      }
    });
  }, [reviews, sortOption, minRating]);

  const handleMinRatingChange = (value: string) => {
    setMinRating(parseInt(value));
  };

  const clearFilters = () => {
    setMinRating(null);
    setIsFilterOpen(false);
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">
          {filteredAndSortedReviews.length} đánh giá
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highest">Đánh giá cao nhất</SelectItem>
              <SelectItem value="lowest">Đánh giá thấp nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
            </SelectContent>
          </Select>
          
          <Collapsible 
            open={isFilterOpen} 
            onOpenChange={setIsFilterOpen}
            className="w-full sm:w-auto"
          >
            <Card className="w-full sm:w-auto">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Bộ lọc
                  {isFilterOpen ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Đánh giá tối thiểu</h3>
                      <RadioGroup 
                        value={minRating?.toString() || ""} 
                        onValueChange={handleMinRatingChange}
                      >
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-2">
                            <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                            <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer">
                              {rating} sao trở lên
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <Button onClick={clearFilters} variant="outline" size="sm" className="w-full">
                      Xóa bộ lọc
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
      
      {filteredAndSortedReviews.length > 0 ? (
        <div className="space-y-6">
          {filteredAndSortedReviews.map(review => (
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
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Không có đánh giá nào phù hợp với bộ lọc.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
