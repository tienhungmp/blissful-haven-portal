
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Receipt, User, MapPin, Phone, Home, Calendar, Users, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

// Mock invoice data - in real app this would come from API
const mockInvoices = {
  "HD001234": {
    invoiceId: "HD001234",
    propertyName: "Vinhomes Riverside Villa",
    checkIn: "2024-12-25",
    checkOut: "2024-12-27",
    guestCount: 4,
    totalPrice: 2400000,
    paymentMethod: "Thẻ tín dụng/ghi nợ",
    status: "Đã thanh toán",
    guestInfo: {
      username: "Nguyễn Văn An",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phoneNumber: "0909123456",
      email: "nguyenvanan@email.com"
    },
    createdAt: "2024-12-20T10:30:00Z"
  },
  "HD001235": {
    invoiceId: "HD001235",
    propertyName: "Sapa Retreat Homestay",
    checkIn: "2024-12-30",
    checkOut: "2025-01-02",
    guestCount: 2,
    totalPrice: 2550000,
    paymentMethod: "Ví điện tử",
    status: "Đã thanh toán",
    guestInfo: {
      username: "Trần Thị Bình",
      address: "456 Đường XYZ, Quận 2, TP.HCM",
      phoneNumber: "0908765432",
      email: "tranthibinh@email.com"
    },
    createdAt: "2024-12-22T14:15:00Z"
  }
};

const InvoiceLookup = () => {
  const [invoiceCode, setInvoiceCode] = useState('');
  const [invoice, setInvoice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!invoiceCode.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập mã hóa đơn",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setInvoice(null);

    // Simulate API call
    setTimeout(() => {
      const foundInvoice = mockInvoices[invoiceCode.toUpperCase() as keyof typeof mockInvoices];
      
      if (foundInvoice) {
        setInvoice(foundInvoice);
        toast({
          title: "Thành công",
          description: "Đã tìm thấy thông tin hóa đơn",
        });
      } else {
        setNotFound(true);
        toast({
          title: "Không tìm thấy",
          description: "Mã hóa đơn không tồn tại hoặc không hợp lệ",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const roomPrice = invoice ? invoice.totalPrice * 0.95 : 0;
  const servicePrice = invoice ? invoice.totalPrice * 0.05 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <main className="flex-1 container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-brand-blue/10 rounded-full mb-4">
              <Receipt className="w-5 h-5 text-brand-blue mr-2" />
              <span className="text-brand-blue font-semibold">Tra cứu hóa đơn</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Tra cứu thông tin hóa đơn
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nhập mã hóa đơn để xem chi tiết thông tin đặt phòng của bạn
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-brand-blue" />
                Nhập mã hóa đơn
              </CardTitle>
              <CardDescription>
                Mã hóa đơn được gửi qua email sau khi thanh toán thành công
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="invoiceCode">Mã hóa đơn</Label>
                  <Input
                    id="invoiceCode"
                    placeholder="Ví dụ: HD001234"
                    value={invoiceCode}
                    onChange={(e) => setInvoiceCode(e.target.value)}
                    className="mt-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-brand-blue hover:bg-brand-blue/90"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang tìm kiếm...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Tra cứu
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Not Found Message */}
          {notFound && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Không tìm thấy hóa đơn</h3>
                    <p className="text-sm mt-1">
                      Vui lòng kiểm tra lại mã hóa đơn hoặc liên hệ bộ phận hỗ trợ khách hàng.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoice Details */}
          {invoice && (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-brand-blue" />
                  Thông tin hóa đơn #{invoice.invoiceId}
                </CardTitle>
                <CardDescription>
                  Ngày tạo: {formatDate(invoice.createdAt)} • Trạng thái: {invoice.status}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Information */}
                <div>
                  <div className="flex items-center mb-3">
                    <Home className="h-5 w-5 text-brand-blue mr-2" />
                    <h3 className="text-lg font-semibold">Thông tin chỗ nghỉ</h3>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="font-medium text-lg">{invoice.propertyName}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Nhận phòng</p>
                          <p className="font-medium">{formatDate(invoice.checkIn)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Trả phòng</p>
                          <p className="font-medium">{formatDate(invoice.checkOut)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Số khách</p>
                          <p className="font-medium">{invoice.guestCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest Information */}
                <div>
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-brand-blue mr-2" />
                    <h3 className="text-lg font-semibold">Thông tin khách hàng</h3>
                  </div>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Tên:</span>
                      <span>{invoice.guestInfo.username}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Địa chỉ:</span>
                      <span>{invoice.guestInfo.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium mr-2">Số điện thoại:</span>
                      <span>{invoice.guestInfo.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Chi tiết thanh toán</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tiền phòng</span>
                      <span className="font-medium">{roomPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phí dịch vụ</span>
                      <span className="font-medium">{servicePrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-brand-blue">{invoice.totalPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Phương thức thanh toán</span>
                      <span className="font-medium">{invoice.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trạng thái</span>
                      <span className="font-medium text-green-600">{invoice.status}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Lưu ý:</strong> Vui lòng mang theo hóa đơn này khi check-in. 
                    Nếu cần hỗ trợ, vui lòng liên hệ hotline: 1900-1234.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8 border-gray-200 bg-gray-50/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Nếu bạn không thể tìm thấy mã hóa đơn hoặc gặp vấn đề khác, vui lòng liên hệ:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <span className="text-sm">📧 support@blissstay.com</span>
                <span className="text-sm">📞 1900-1234</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvoiceLookup;
