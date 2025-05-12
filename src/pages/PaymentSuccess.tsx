
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment details from location state
  const paymentDetails = location.state?.paymentDetails;
  const bookingId = location.state?.bookingId || 'BOOKING-' + Math.floor(Math.random() * 1000000);
  
  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h1>
          <p className="mb-6">Không tìm thấy thông tin thanh toán.</p>
          <Button onClick={() => navigate('/')}>Về trang chủ</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Thanh toán thành công!</h1>
            <p className="text-gray-600">Cảm ơn bạn đã đặt phòng tại StayEasy</p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Thông tin đặt phòng</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Mã đặt phòng</span>
                  <span className="font-medium">{bookingId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Tên chỗ ở</span>
                  <span className="font-medium">{paymentDetails.propertyName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Nhận phòng</span>
                  <span className="font-medium">{paymentDetails.checkIn}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Trả phòng</span>
                  <span className="font-medium">{paymentDetails.checkOut}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Số khách</span>
                  <span className="font-medium">{paymentDetails.guestCount} người</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-muted-foreground">Phương thức thanh toán</span>
                  <span className="font-medium">{paymentDetails.paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Tổng thanh toán</span>
                  <span>{paymentDetails.totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              <span>Về trang chủ</span>
            </Button>
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90 flex items-center gap-2"
              onClick={() => navigate('/profile')}
            >
              <span>Xem đơn hàng của tôi</span>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
