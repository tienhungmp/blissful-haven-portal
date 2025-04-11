
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Shield, Home, PlusCircle, Calendar, Users, Settings } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const HostDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['host', 'admin']}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Quản lý chỗ nghỉ</h1>
              <p className="text-gray-600">Quản lý các chỗ nghỉ và đặt phòng của bạn</p>
            </div>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm chỗ nghỉ mới
            </Button>
          </div>

          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 w-full max-w-3xl">
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Chỗ nghỉ</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Đặt phòng</span>
              </TabsTrigger>
              <TabsTrigger value="guests" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Khách hàng</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Cài đặt</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <div className="rounded-lg border p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Danh sách chỗ nghỉ</h2>
                
                <div className="text-center py-8 text-gray-500">
                  <Home className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p>Bạn chưa có chỗ nghỉ nào</p>
                  <Button className="mt-4 bg-brand-blue hover:bg-brand-blue/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Thêm chỗ nghỉ mới
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="rounded-lg border p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Đặt phòng</h2>
                
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p>Không có đơn đặt phòng nào</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guests">
              <div className="rounded-lg border p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Khách hàng</h2>
                
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                  <p>Chưa có thông tin khách hàng</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="rounded-lg border p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Cài đặt tài khoản chủ nhà</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Thông tin cá nhân</h3>
                    <p className="text-gray-600">Cập nhật thông tin cá nhân và thông tin liên hệ của bạn</p>
                    <Button variant="outline" className="mt-2">
                      Chỉnh sửa thông tin
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Tài khoản thanh toán</h3>
                    <p className="text-gray-600">Quản lý tài khoản ngân hàng và thông tin thanh toán</p>
                    <Button variant="outline" className="mt-2">
                      Thiết lập thanh toán
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Thông báo</h3>
                    <p className="text-gray-600">Cài đặt thông báo và cập nhật qua email</p>
                    <Button variant="outline" className="mt-2">
                      Quản lý thông báo
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
