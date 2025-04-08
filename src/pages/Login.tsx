
import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu cần ít nhất 6 ký tự" }),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    // Kiểm tra xem người dùng có đang cố đăng nhập vào trang admin không
    const adminRedirect = localStorage.getItem("adminRedirect");
    if (adminRedirect) {
      toast({
        title: "Đăng nhập quản trị",
        description: "Vui lòng đăng nhập với tài khoản quản trị viên",
      });
      localStorage.removeItem("adminRedirect");
    }
  }, [toast]);

  const onSubmit = (data: FormValues) => {
    console.log("Login data:", data);
    // Trong ứng dụng thực tế, bạn sẽ xác thực với backend ở đây
    
    // Lưu email người dùng để kiểm tra sau này
    if (data.rememberMe) {
      localStorage.setItem("userEmail", data.email);
    }
    
    // Kiểm tra xem đây có phải là quản trị viên không (Mô phỏng kiểm tra admin đơn giản)
    const isAdmin = data.email.includes("admin");
    
    if (isAdmin) {
      localStorage.setItem("adminToken", "admin-token-example");
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng quản trị viên quay trở lại BlissStay!",
      });
      
      // Chuyển hướng đến trang admin với trạng thái đăng nhập
      navigate("/admin", { state: { fromLogin: true } });
    } else {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại BlissStay!",
      });
      
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
            <p className="text-gray-600 mt-2">Chào mừng bạn quay trở lại BlissStay</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm cursor-pointer">Nhớ đăng nhập</FormLabel>
                    </FormItem>
                  )}
                />
                
                <Link to="/forgot-password" className="text-sm text-brand-blue hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              
              <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
                Đăng nhập
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-brand-blue hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <Link to="/admin" className="hover:underline">
                Truy cập trang quản trị
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
