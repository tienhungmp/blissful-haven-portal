
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { vi } from 'date-fns/locale';

const SearchBox = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, checkIn, checkOut, guests });
    // Handle search logic here
  };

  return (
    <div className="mx-auto max-w-6xl bg-white/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 -mt-20 relative z-10 shadow-2xl border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tìm kiếm chỗ nghỉ</h2>
        <p className="text-gray-600">Nhập thông tin để tìm kiếm chỗ nghỉ phù hợp</p>
      </div>
      
      <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-brand-blue" />
            Địa điểm
          </label>
          <Input
            id="location"
            placeholder="Thành phố, địa điểm..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full h-12 border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20 rounded-xl"
          />
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-brand-blue" />
            Ngày nhận phòng
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-brand-blue rounded-xl"
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-brand-blue" />
                {checkIn ? (
                  format(checkIn, 'dd/MM/yyyy', { locale: vi })
                ) : (
                  <span className="text-gray-500">Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-xl border-0 rounded-xl">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-brand-blue" />
            Ngày trả phòng
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-brand-blue rounded-xl"
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-brand-blue" />
                {checkOut ? (
                  format(checkOut, 'dd/MM/yyyy', { locale: vi })
                ) : (
                  <span className="text-gray-500">Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 shadow-xl border-0 rounded-xl">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests + Search Button */}
        <div className="space-y-2">
          <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 flex items-center">
            <Users className="w-4 h-4 mr-2 text-brand-blue" />
            Số khách
          </label>
          <div className="flex gap-3">
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-20 h-12 text-center border-gray-200 focus:border-brand-blue focus:ring-brand-blue/20 rounded-xl"
            />
            <Button 
              type="submit" 
              className="flex-1 h-12 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              <Search className="mr-2 h-5 w-5" />
              Tìm kiếm
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
