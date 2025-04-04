
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewList from '@/components/reviews/ReviewList';
import ReviewForm from '@/components/reviews/ReviewForm';
import { reviewsData } from '@/data/reviewsData';

const Reviews = () => {
  return (
    <>
      <Helmet>
        <title>Đánh giá - BlissStay</title>
      </Helmet>

      <Navbar />
      
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Đánh giá từ khách hàng</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Reviews List with filtering and sorting */}
          <div className="flex-1">
            <ReviewList reviews={reviewsData} />
          </div>
          
          {/* Submit Review Form */}
          <div className="md:w-1/3">
            <ReviewForm />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Reviews;
