
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  location,
  price,
  rating,
  image,
  type
}) => {
  return (
    <Link to={`/property/${id}`}>
      <Card className="property-card overflow-hidden h-full">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover"
          />
          <Badge 
            className="absolute top-3 left-3 bg-brand-blue hover:bg-brand-blue"
          >
            {type}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-lg font-bold">
            {price.toLocaleString('vi-VN')} đ
            <span className="text-sm font-normal text-muted-foreground"> /đêm</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
