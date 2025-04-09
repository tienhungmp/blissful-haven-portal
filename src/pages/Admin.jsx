
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem có admin token trong localStorage hay không
    const adminToken = localStorage.getItem("adminToken");
    const userEmail = localStorage.getItem("userEmail");
    
    // Kiểm tra nếu có token admin hoặc email chứa "admin"
    if (adminToken || (userEmail && userEmail.includes("admin"))) {
      setIsAuthenticated(true);
      
      // Hiển thị thông báo chào mừng nếu vừa đăng nhập
      if (location.state?.fromLogin) {
        toast({
          title: "Chào mừng quản trị viên",
          description: "Bạn đã đăng nhập vào trang quản trị thành công",
        });
      }
    }
    
    setIsLoading(false);
  }, [location.state, toast]);

  // Xử lý đăng nhập admin trực tiếp từ trang admin
  const handleAdminLogin = () => {
    // Đặt token admin vào localStorage và chuyển hướng đến trang đăng nhập
    localStorage.setItem("adminRedirect", "true");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p>Đang tải...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-50 flex items-center justify-center rounded-full">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold">Quyền truy cập bị từ chối</h1>
            <p className="text-gray-600">
              Bạn cần đăng nhập với tài khoản quản trị viên để truy cập trang này.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={handleAdminLogin}
              >
                Đăng nhập quản trị
              </Button>
              <Button 
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <SidebarProvider>
          <div className="flex w-full">
            <AdminDashboard />
          </div>
        </SidebarProvider>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
