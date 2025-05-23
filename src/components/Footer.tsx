import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* About Us Section */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-brand-blue">BlissStay</span>
          </Link>
          <p className="text-gray-600">
            BlissStay là nền tảng đặt phòng hàng đầu, mang đến trải nghiệm du lịch tuyệt vời nhất cho bạn.
          </p>
          <div className="flex items-center mt-4">
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
            <ShieldCheck className="mr-2 h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Thanh toán an toàn</span>
          </div>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="font-semibold mb-4">Liên hệ</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-gray-600">1900-1234</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-gray-400" />
              <span className="text-gray-600">support@blissstay.com</span>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h3 className="font-semibold mb-4">Dịch vụ khách hàng</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors">Liên hệ</Link></li>
            <li><Link to="/invoice-lookup" className="text-gray-600 hover:text-brand-blue transition-colors">Tra cứu hóa đơn</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Hỗ trợ 24/7</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Chính sách hoàn tiền</a></li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-600 hover:text-brand-blue transition-colors">Trang chủ</Link></li>
            <li><Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">Giới thiệu</Link></li>
            <li><Link to="/search" className="text-gray-600 hover:text-brand-blue transition-colors">Tìm kiếm</Link></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BlissStay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
