
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, differenceInDays, isBefore, addDays } from 'date-fns';
import { CalendarIcon, Check, AlertCircle } from 'lucide-react';

interface AvailabilityCheckModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyName: string;
}

const AvailabilityCheckModal = ({ open, onClose, propertyId, propertyName }: AvailabilityCheckModalProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<'available' | 'unavailable' | null>(null);
  
  // Handle check-in date selection
  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckIn(date);
    
    // If checkOut is already set and is before the new checkIn, reset it
    if (date && checkOut && isBefore(checkOut, date)) {
      setCheckOut(undefined);
    } 
    // Or if checkOut is not set, set it to checkIn + 1 day automatically
    else if (date && !checkOut) {
      setCheckOut(addDays(date, 1));
    }
    
    // Reset availability status when dates change
    setAvailability(null);
  };
  
  // Calculate nights
  const nights = checkIn && checkOut ? Math.max(differenceInDays(checkOut, checkIn), 1) : 0;
  
  // Check availability function
  const checkAvailability = () => {
    if (!checkIn || !checkOut) return;
    
    setIsChecking(true);
    
    // In a real application, this would be an API call to check availability
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
      // Random availability for demo
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      setAvailability(isAvailable ? 'available' : 'unavailable');
      setIsChecking(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kiểm tra tình trạng phòng</DialogTitle>
          <DialogDescription>
            Kiểm tra xem {propertyName} có còn trống trong khoảng thời gian bạn muốn không.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nhận phòng</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {checkIn ? format(checkIn, 'dd/MM/yyyy') : <span className="text-muted-foreground">Chọn ngày</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={handleCheckInSelect}
                    disabled={(date) => isBefore(date, new Date())}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Trả phòng</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {checkOut ? format(checkOut, 'dd/MM/yyyy') : <span className="text-muted-foreground">Chọn ngày</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => 
                      isBefore(date, new Date()) || 
                      (checkIn ? isBefore(date, checkIn) : false)
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {nights > 0 && (
            <p className="text-sm text-center">
              {nights} {nights === 1 ? 'đêm' : 'đêm'}
            </p>
          )}
          
          <Button 
            onClick={checkAvailability} 
            disabled={!checkIn || !checkOut || isChecking}
          >
            {isChecking ? 'Đang kiểm tra...' : 'Kiểm tra tình trạng'}
          </Button>
          
          {availability && (
            <div className={`p-4 rounded-md mt-2 ${
              availability === 'available' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {availability === 'available' ? (
                  <>
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-700">
                      <span className="font-semibold">Còn phòng!</span> Phòng còn trống trong khoảng thời gian này.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">
                      <span className="font-semibold">Hết phòng!</span> Phòng đã được đặt trong khoảng thời gian này.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityCheckModal;
