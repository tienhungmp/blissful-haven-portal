
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  User, 
  Calendar, 
  DollarSign, 
  Star,
  Check,
  X,
  Bed
} from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample room data - in a real app, this would come from a database
const roomData = [
  { id: 1, name: "Phòng đơn", capacity: 1, price: 500000, available: 3, booked: 1 },
  { id: 2, name: "Phòng đôi", capacity: 2, price: 800000, available: 2, booked: 2 },
  { id: 3, name: "Phòng gia đình", capacity: 4, price: 1200000, available: 0, booked: 2 },
  { id: 4, name: "Phòng hạng sang", capacity: 2, price: 1500000, available: 1, booked: 0 },
];

interface PropertyDetailsModalProps {
  open: boolean;
  onClose: () => void;
  property: {
    id: number;
    name: string;
    location: string;
    price: number;
    bookings: number;
    status: string;
  };
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  open,
  onClose,
  property
}) => {
  // Calculate total rooms and occupancy rate
  const totalRooms = roomData.reduce((sum, room) => sum + room.available + room.booked, 0);
  const bookedRooms = roomData.reduce((sum, room) => sum + room.booked, 0);
  const occupancyRate = totalRooms > 0 ? Math.round((bookedRooms / totalRooms) * 100) : 0;
  
  // Check if fully booked
  const isFullyBooked = roomData.every(room => room.available === 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Home className="h-5 w-5 text-brand-blue" />
            {property.name}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {property.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col gap-2">
            <h3 className="font-medium text-sm text-muted-foreground">Thông tin tổng quan</h3>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>Tổng số phòng:</span>
              </div>
              <span className="font-medium">{totalRooms}</span>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Phòng đã đặt:</span>
              </div>
              <span className="font-medium">{bookedRooms}</span>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Tỷ lệ lấp đầy:</span>
              </div>
              <span className="font-medium">{occupancyRate}%</span>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Giá/đêm:</span>
              </div>
              <span className="font-medium">{property.price.toLocaleString()} VND</span>
              
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span>Đánh giá:</span>
              </div>
              <span className="font-medium">4.{Math.floor(Math.random() * 9) + 1}/5</span>
            </div>
            
            <div className="mt-2">
              <span className="text-sm text-muted-foreground">Trạng thái:</span>
              <div className="flex gap-2 mt-1">
                <Badge className={`${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {property.status === 'active' ? 'Đang hoạt động' : 'Bảo trì'}
                </Badge>
                
                {isFullyBooked ? (
                  <Badge className="bg-red-100 text-red-800">Hết phòng</Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-800">Còn phòng trống</Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Tiện ích</h3>
            <div className="grid grid-cols-2 gap-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Wi-Fi miễn phí</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Bãi đậu xe</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Bể bơi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Phòng gym</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Điều hòa</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-500" />
                <span>Thú cưng</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <h3 className="font-medium mb-2">Danh sách phòng</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loại phòng</TableHead>
                <TableHead>Sức chứa</TableHead>
                <TableHead>Giá/đêm</TableHead>
                <TableHead>Còn trống</TableHead>
                <TableHead>Đã đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomData.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>{room.capacity} người</TableCell>
                  <TableCell>{room.price.toLocaleString()} VND</TableCell>
                  <TableCell>{room.available}</TableCell>
                  <TableCell>{room.booked}</TableCell>
                  <TableCell>
                    {room.available > 0 ? (
                      <Badge className="bg-green-100 text-green-800">Còn phòng</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Hết phòng</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;
