import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchFilters from '@/components/search/SearchFilters';
import SearchResults from '@/components/search/SearchResults';
import { Property } from '@/types/property';

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
            <SearchFilters
              location={location}
              setLocation={setLocation}
              checkIn={checkIn}
              setCheckIn={setCheckIn}
              checkOut={checkOut}
              setCheckOut={setCheckOut}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>
          
          <div className="lg:col-span-3">
            <SearchResults properties={filteredProperties} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
