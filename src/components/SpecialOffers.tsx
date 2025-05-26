
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, Gift, Calendar } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "Ưu đãi cuối tuần",
    description: "Giảm 30% cho tất cả homestay trong 2 ngày cuối tuần",
    discount: "30%",
    validUntil: "31/12/2024",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <Calendar className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Đặt sớm tiết kiệm",
    description: "Đặt trước 30 ngày để nhận ưu đãi lên đến 25%",
    discount: "25%",
    validUntil: "15/01/2025",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <Clock className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Ưu đãi thành viên mới",
    description: "Giảm 20% cho lần đặt phòng đầu tiên khi đăng ký",
    discount: "20%",
    validUntil: "28/02/2025",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: <Gift className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500"
  }
];

const SpecialOffers = () => {
  return (
    <section className="container py-20 relative">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl"></div>
      
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
          <Percent className="w-5 h-5 text-purple-600 mr-2" />
          <span className="text-purple-600 font-semibold">Ưu đãi đặc biệt</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Khuyến mãi hấp dẫn
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Đừng bỏ lỡ những ưu đãi tuyệt vời cho chuyến du lịch của bạn
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <Card key={offer.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-80`}></div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-white text-gray-800 font-bold text-lg px-3 py-1">
                  -{offer.discount}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <div className="text-white">
                  {offer.icon}
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">{offer.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{offer.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Có hiệu lực đến:</span>
                <span className="text-sm font-semibold text-brand-blue">{offer.validUntil}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Sử dụng ngay
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
