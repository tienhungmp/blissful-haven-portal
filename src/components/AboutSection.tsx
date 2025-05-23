
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Star, Heart, Award } from "lucide-react";

const benefits = [
  {
    icon: <Award className="w-8 h-8 text-yellow-500" />,
    title: "Giá tốt nhất đảm bảo",
    description: "Chúng tôi đảm bảo bạn luôn nhận được mức giá tốt nhất khi đặt qua BlissStay."
  },
  {
    icon: <Star className="w-8 h-8 text-blue-500" />,
    title: "Đa dạng lựa chọn",
    description: "Hàng nghìn homestay và khách sạn chất lượng trên toàn quốc."
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Dịch vụ hỗ trợ 24/7",
    description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi."
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: "Đặt phòng an toàn",
    description: "Thanh toán bảo mật và xác nhận đặt phòng ngay lập tức."
  }
];

const AboutSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <Shield className="w-5 h-5 text-brand-blue mr-2" />
            <span className="text-brand-blue font-semibold">Cam kết chất lượng</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Tại sao chọn BlissStay?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi mang đến cho bạn trải nghiệm đặt phòng đơn giản, nhanh chóng và đáng tin cậy với những cam kết vượt trội
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-white to-blue-50 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Chính sách hỗ trợ của chúng tôi
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chúng tôi cam kết mang đến cho bạn trải nghiệm đặt phòng tuyệt vời với nhiều chính sách ưu đãi và bảo vệ khách hàng toàn diện.
              </p>
              <ul className="space-y-4">
                {[
                  "Hoàn tiền 100% nếu không nhận được phòng",
                  "Hủy miễn phí trong vòng 48 giờ sau đặt phòng",
                  "Hỗ trợ khách hàng 24/7 qua điện thoại và email",
                  "Bảo mật thông tin cá nhân và thanh toán"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="p-1 bg-green-100 rounded-full mr-4 mt-1 group-hover:bg-green-200 transition-colors duration-300">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Customer Support" 
                className="relative rounded-2xl object-cover h-80 w-full shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
