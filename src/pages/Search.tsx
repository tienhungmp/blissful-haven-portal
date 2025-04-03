import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar as CalendarIcon, Search as SearchIcon, MapPin, Star } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const allProperties = [
  {
    id: "1",
    name: "Vinhomes Riverside Villa",
    location: "Hà Nội",
    price: 1200000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Villa"
  },
  {
    id: "2",
    name: "Sapa Retreat Homestay",
    location: "Lào Cai",
    price: 850000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Homestay"
  },
  {
    id: "3",
    name: "Đà Nẵng Beach Resort",
    location: "Đà Nẵng",
    price: 1500000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Resort"
  },
  {
    id: "4",
    name: "Phú Quốc Ocean View",
    location: "Kiên Giang",
    price: 2200000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Villa"
  },
  {
    id: "5",
    name: "Hội An Ancient House",
    location: "Quảng Nam",
    price: 950000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1533664488202-63814db83cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    type: "Homestay"
  },
  {
    id: "6",
    name: "Nha Trang Beachfront Hotel",
    location: "Khánh Hòa",
    price: 1800000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    type: "Hotel"
  },
  {
    id: "7",
    name: "Mộc Châu Hillside Homestay",
    location: "Sơn La",
    price: 750000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Homestay"
  },
  {
    id: "8",
    name: "Hạ Long Bay Hotel & Spa",
    location: "Quảng Ninh",
    price: 1600000,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    type: "Hotel"
  },
  {
    id: "9",
    name: "Dalat Lakeside Villa",
    location: "Lâm Đồng",
    price: 1900000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "Villa"
  }
];

const Search = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [priceRange, setPriceRange] = useState([500000, 3000000]);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    'Hotel': false,
    'Villa': false,
    'Homestay': false,
    'Resort': false,
  });
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({
    'Wifi': false,
    'Hồ bơi': false,
    'Bãi đỗ xe': false,
    'Điều hòa': false,
    'Bếp': false,
    'Máy giặt': false,
  });
  const [minRating, setMinRating] = useState(0);
  
  const filteredProperties = allProperties.filter(property => {
    if (location && !property.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    if (property.price < priceRange[0] || property.price > priceRange[1]) {
      return false;
    }
    
    const activeTypes = Object.entries(selectedTypes).filter(([_, isSelected]) => isSelected).map(([type]) => type);
    if (activeTypes.length > 0 && !activeTypes.includes(property.type)) {
      return false;
    }
    
    if (property.rating < minRating) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Tìm kiếm chỗ ở</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-lg mb-4">Lọc kết quả</h3>
              
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Địa điểm
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Nhập thành phố, địa điểm..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ngày nhận phòng
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? (
                          format(checkIn, 'dd/MM/yyyy', { locale: vi })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ngày trả phòng
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? (
                          format(checkOut, 'dd/MM/yyyy', { locale: vi })
                        ) : (
                          <span>Chọn ngày</span>
                        )}
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
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Khoảng giá ({priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ)
                </label>
                <Slider
                  defaultValue={[500000, 3000000]}
                  min={100000}
                  max={5000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Loại chỗ ở</h4>
                {Object.keys(selectedTypes).map((type) => (
                  <div key={type} className="flex items-center space-x-2 mb-2">
                    <Checkbox 
                      id={`type-${type}`}
                      checked={selectedTypes[type]}
                      onCheckedChange={(checked) => {
                        setSelectedTypes({
                          ...selectedTypes,
                          [type]: Boolean(checked)
                        });
                      }}
                    />
                    <label 
                      htmlFor={`type-${type}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Đánh giá tối thiểu</h4>
                <div className="flex gap-2">
                  {[0, 3, 3.5, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      className={`flex items-center rounded-md border px-2.5 py-1.5 text-sm ${minRating === rating ? 'border-brand-blue bg-brand-blue text-white' : 'border-gray-200'}`}
                      onClick={() => setMinRating(rating)}
                    >
                      {rating > 0 ? (
                        <>
                          {rating}
                          <Star className="h-3 w-3 ml-1 fill-current" />
                        </>
                      ) : (
                        "Tất cả"
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Tiện nghi</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(selectedAmenities).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities[amenity]}
                        onCheckedChange={(checked) => {
                          setSelectedAmenities({
                            ...selectedAmenities,
                            [amenity]: Boolean(checked)
                          });
                        }}
                      />
                      <label 
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                <SearchIcon className="mr-2 h-4 w-4" />
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{filteredProperties.length} kết quả tìm thấy</h3>
                </div>
                <select className="border rounded px-3 py-1.5 text-sm">
                  <option value="recommended">Đề xuất</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">Không tìm thấy kết quả nào</h3>
                <p className="text-muted-foreground">Hãy thử điều chỉnh lại bộ lọc để tìm được kết quả phù hợp.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
