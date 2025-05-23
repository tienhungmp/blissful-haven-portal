import React from 'react';
import { Button } from "@/components/ui/button";
import PropertyCard from './PropertyCard';
import { Sparkles, TrendingUp } from 'lucide-react';

// Sample property data
const featuredProperties = [
  {
    id: "1",
    name: "Vinhomes Riverside Villa",
    location: "Hà Nội",
    price: 1200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Villa"
  },
  {
    id: "2",
    name: "Sapa Retreat Homestay",
    location: "Lào Cai",
    price: 850000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Homestay"
  },
  {
    id: "3",
    name: "Đà Nẵng Beach Resort",
    location: "Đà Nẵng",
    price: 1500000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Resort"
  },
  {
    id: "4",
    name: "Phú Quốc Ocean View",
    location: "Kiên Giang",
    price: 2200000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Villa"
  },
  {
    id: "5",
    name: "Hội An Ancient House",
    location: "Quảng Nam",
    price: 950000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1533664488202-63814db83cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    type: "Homestay"
  },
  {
    id: "6",
    name: "Nha Trang Beachfront Hotel",
    location: "Khánh Hòa",
    price: 1800000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    type: "Hotel"
  },
];

const FeaturedProperties = () => {
  return (
    <section className="container py-20 relative">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-brand-blue/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-brand-red/10 rounded-full blur-lg"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-brand-blue/10 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-brand-blue mr-2" />
          <span className="text-brand-blue font-semibold">Được yêu thích nhất</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Chỗ nghỉ nổi bật
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Khám phá những lựa chọn được yêu thích nhất với đánh giá cao từ khách hàng
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredProperties.map(property => (
          <div key={property.id} className="transform hover:scale-105 transition-all duration-300">
            <PropertyCard {...property} />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          className="px-8 py-6 text-lg font-semibold border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl group"
        >
          <TrendingUp className="mr-2 h-5 w-5 group-hover:animate-bounce" />
          Xem tất cả chỗ nghỉ
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProperties;
