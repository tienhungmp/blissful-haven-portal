
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Building, Users, CalendarCheck, Star } from "lucide-react";

export function AdminOverview() {
  // In a real app, these would be fetched from an API
  const stats = [
    { title: "Tổng chỗ nghỉ", value: "124", icon: Building, color: "bg-blue-100 text-blue-600" },
    { title: "Người dùng", value: "1,543", icon: Users, color: "bg-green-100 text-green-600" },
    { title: "Đặt phòng", value: "432", icon: CalendarCheck, color: "bg-amber-100 text-amber-600" },
    { title: "Đánh giá", value: "965", icon: Star, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tổng quan</h2>
        <p className="text-muted-foreground">
          Thống kê tổng quan về hoạt động của hệ thống.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Đặt phòng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-muted-foreground">
              Dữ liệu đặt phòng sẽ được hiển thị ở đây
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chỗ nghỉ phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-muted-foreground">
              Dữ liệu chỗ nghỉ phổ biến sẽ được hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
