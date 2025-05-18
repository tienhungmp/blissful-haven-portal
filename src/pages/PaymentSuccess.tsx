
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Calendar, Users, CreditCard, Home, Phone, MapPin, User } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment and booking details from location state
  const paymentDetails = location.state?.paymentDetails;
  const bookingId = location.state?.bookingId;
  
  // If no payment details, redirect to home
  if (!paymentDetails || !bookingId) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Thanh toán thành công!</h1>
            <p className="text-muted-foreground">Cảm ơn bạn đã đặt phòng với chúng tôi</p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-brand-blue mr-2" />
                  <h2 className="text-xl font-semibold">{paymentDetails.propertyName}</h2>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Đã xác nhận
                </div>
              </div>
              
              <div className="py-4 border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nhận phòng</p>
                      <p className="font-medium">{paymentDetails.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Trả phòng</p>
                      <p className="font-medium">{paymentDetails.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Số khách</p>
                      <p className="font-medium">{paymentDetails.guestCount} khách</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {paymentDetails.guestInfo && (
                <div className="py-4 border-b">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <User className="h-5 w-5 mr-2" /> Thông tin người đặt
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Tên</p>
                        <p className="font-medium">{paymentDetails.guestInfo.username}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Địa chỉ</p>
                        <p className="font-medium">{paymentDetails.guestInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Số điện thoại</p>
                        <p className="font-medium">{paymentDetails.guestInfo.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="py-4 border-b">
                <h3 className="font-semibold mb-3">Chi tiết thanh toán</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phương thức</p>
                      <p className="font-medium">{paymentDetails.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ngày thanh toán</p>
                      <p className="font-medium">{paymentDetails.paymentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center font-semibold text-sm">₫</div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tổng tiền</p>
                      <p className="font-semibold text-lg">{paymentDetails.totalPrice.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-sm text-muted-foreground">Mã đặt phòng:</p>
                  <p className="font-mono bg-muted px-2 py-1 rounded text-sm font-medium">{bookingId}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chúng tôi đã gửi email xác nhận với đầy đủ thông tin đặt phòng cho bạn.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/booking-history')}
            >
              Xem lịch sử đặt phòng
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              Quay về trang chủ
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
