
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/search');
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')" 
        }}
      >
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-blue/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 z-10">
        <div className="text-center max-w-5xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Khám phá không gian
            </span>
            <br />
            <span className="text-brand-blue drop-shadow-lg">
              nghỉ dưỡng lý tưởng
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light">
            Tìm và đặt homestay, khách sạn tốt nhất với giá ưu đãi nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-brand-red text-white px-10 py-6 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 border-0"
              onClick={handleExplore}
            >
              Khám phá ngay
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 px-10 py-6 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Xem video
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
