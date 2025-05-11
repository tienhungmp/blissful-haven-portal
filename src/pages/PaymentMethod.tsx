
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Payment method icons
import { CreditCard, Wallet, Bitcoin } from 'lucide-react';

interface BookingDetails {
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalPrice: number;
}

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get booking details from location state
  const bookingDetails = location.state?.bookingDetails as BookingDetails | undefined;
  
  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h1>
          <p className="mb-6">Không tìm thấy thông tin đặt phòng.</p>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Here you would integrate with a payment processor
      // For now, we'll simulate a successful payment after 1.5 seconds
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success('Thanh toán thành công!');
      
      // Navigate to success page or back to home
      navigate('/', { 
        state: { 
          paymentSuccess: true,
          bookingId: 'BOOKING-' + Math.floor(Math.random() * 1000000)
        }
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xử lý thanh toán');
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Chọn phương thức thanh toán</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-2">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Thông tin đặt phòng</h2>
                  <p className="text-muted-foreground">{bookingDetails.propertyName}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-sm">Nhận phòng: <span className="font-medium">{bookingDetails.checkIn}</span></p>
                      <p className="text-sm">Trả phòng: <span className="font-medium">{bookingDetails.checkOut}</span></p>
                      <p className="text-sm">Số khách: <span className="font-medium">{bookingDetails.guestCount}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{bookingDetails.totalPrice.toLocaleString('vi-VN')}đ</p>
                      <p className="text-xs text-muted-foreground">Tổng thanh toán</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
                  <RadioGroup
                    value={selectedMethod}
                    onValueChange={setSelectedMethod}
                    className="space-y-4"
                  >
                    <div className={`flex items-center p-4 border rounded-lg ${selectedMethod === 'credit_card' ? 'border-brand-blue bg-blue-50' : ''}`}>
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center ml-2 cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>Thẻ tín dụng/ghi nợ</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center p-4 border rounded-lg ${selectedMethod === 'e_wallet' ? 'border-brand-blue bg-blue-50' : ''}`}>
                      <RadioGroupItem value="e_wallet" id="e_wallet" />
                      <Label htmlFor="e_wallet" className="flex items-center ml-2 cursor-pointer">
                        <Wallet className="h-5 w-5 mr-2" />
                        <span>Ví điện tử (Momo, ZaloPay, VNPay)</span>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center p-4 border rounded-lg ${selectedMethod === 'crypto' ? 'border-brand-blue bg-blue-50' : ''}`}>
                      <RadioGroupItem value="crypto" id="crypto" />
                      <Label htmlFor="crypto" className="flex items-center ml-2 cursor-pointer">
                        <Bitcoin className="h-5 w-5 mr-2" />
                        <span>Tiền điện tử</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Tóm tắt thanh toán</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Tiền phòng</p>
                      <p className="font-medium">{(bookingDetails.totalPrice * 0.95).toLocaleString('vi-VN')}đ</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Phí dịch vụ</p>
                      <p className="font-medium">{(bookingDetails.totalPrice * 0.05).toLocaleString('vi-VN')}đ</p>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <p className="font-semibold">Tổng cộng</p>
                        <p className="font-bold">{bookingDetails.totalPrice.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(-1)}
                disabled={isProcessing}
              >
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMethod;
