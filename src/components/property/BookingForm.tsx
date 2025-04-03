
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

interface BookingFormProps {
  price: number;
  rating: number;
  maxGuests: number;
}

const BookingForm = ({ price, rating, maxGuests }: BookingFormProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guestCount, setGuestCount] = useState(1);

  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) 
    : 1;
  
  const totalPrice = price * nights;
  
  return (
    <div className="sticky top-20">
      <div className="rounded-lg border p-6 bg-white shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xl font-bold">{price.toLocaleString('vi-VN')}đ</span>
            <span className="text-sm font-normal text-muted-foreground"> /đêm</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow mr-1" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="border rounded-lg mb-4">
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-b">
              <label className="block text-xs text-muted-foreground">Nhận phòng</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto text-left font-normal"
                  >
                    {checkIn ? format(checkIn, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="p-3 border-b">
              <label className="block text-xs text-muted-foreground">Trả phòng</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto text-left font-normal"
                  >
                    {checkOut ? format(checkOut, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="p-3 col-span-2">
              <label className="block text-xs text-muted-foreground mb-1">Số khách</label>
              <select 
                className="w-full border-0 focus:ring-0 p-0"
                value={guestCount}
                onChange={e => setGuestCount(parseInt(e.target.value))}
              >
                {[...Array(maxGuests)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1} khách</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 mb-4">
          Đặt ngay
        </Button>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="underline">{price.toLocaleString('vi-VN')}đ x {nights} đêm</span>
            <span>{(price * nights).toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">Phí dịch vụ</span>
            <span>{Math.round(totalPrice * 0.05).toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-bold">
              <span>Tổng trước thuế</span>
              <span>{(totalPrice + Math.round(totalPrice * 0.05)).toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
