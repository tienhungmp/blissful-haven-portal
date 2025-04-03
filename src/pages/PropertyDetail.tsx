
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Wifi, Car, Snowflake, Kitchen, ScrollText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Sample property data - in a real app this would come from an API
const properties = [
  {
    id: "1",
    name: "Vinhomes Riverside Villa",
    location: "Khu đô thị Vinhomes Riverside, Long Biên, Hà Nội",
    price: 1200000,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ],
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    description: "Trải nghiệm không gian sống sang trọng tại biệt thự Vinhomes Riverside với không gian xanh mát, view sông thoáng đãng. Biệt thự được thiết kế theo phong cách hiện đại, đầy đủ tiện nghi cao cấp, phù hợp cho các kỳ nghỉ gia đình hoặc tổ chức sự kiện nhỏ.",
    amenities: [
      "Wifi",
      "Hồ bơi",
      "Bãi đỗ xe",
      "Điều hòa",
      "Bếp đầy đủ",
      "Máy giặt",
      "TV màn hình phẳng",
      "Sân vườn",
      "BBQ"
    ],
    host: {
      name: "Minh Tuấn",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      responseRate: 98,
      responseTime: "trong vòng 1 giờ"
    },
    reviews: [
      {
        id: "r1",
        user: "Thanh Hà",
        rating: 5,
        date: "2023-08-15",
        comment: "Biệt thự rất đẹp và sang trọng. Chúng tôi đã có một kỳ nghỉ tuyệt vời ở đây. Chủ nhà rất thân thiện và hỗ trợ nhiệt tình."
      },
      {
        id: "r2",
        user: "Đức Anh",
        rating: 4.5,
        date: "2023-07-22",
        comment: "Không gian rộng rãi, tiện nghi đầy đủ. View sông rất đẹp, đặc biệt vào buổi sáng. Chắc chắn sẽ quay lại."
      }
    ],
    policies: {
      checkin: "14:00",
      checkout: "12:00",
      cancellation: "Miễn phí hủy trước 7 ngày. Hoàn lại 50% trước 3 ngày.",
      rules: [
        "Không hút thuốc trong nhà",
        "Không tụ tập, tổ chức tiệc ồn ào sau 22:00",
        "Không mang vật nuôi"
      ]
    }
  },
  {
    id: "2",
    name: "Sapa Retreat Homestay",
    location: "Tả Van, Sapa, Lào Cai",
    price: 850000,
    rating: 4.9,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    images: [
      "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1594128956522-44c21032da77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
    ],
    type: "Homestay",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    description: "Sapa Retreat Homestay nằm ở làng Tả Van yên bình, cách thị trấn Sapa khoảng 8km. Homestay được xây dựng theo kiến trúc truyền thống của người H'Mông với khung gỗ chắc chắn kết hợp hiện đại. Từ ban công, bạn có thể ngắm nhìn toàn cảnh thung lũng Mường Hoa tuyệt đẹp.",
    amenities: [
      "Wifi",
      "Bữa sáng",
      "Tour trekking",
      "Máy sưởi",
      "Nước nóng",
      "Đưa đón"
    ],
    host: {
      name: "Mỹ Linh",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      responseRate: 100,
      responseTime: "trong vòng 30 phút"
    },
    reviews: [
      {
        id: "r1",
        user: "Minh Quân",
        rating: 5,
        date: "2023-09-05",
        comment: "Trải nghiệm tuyệt vời với cảnh quan đẹp mê hồn. Chủ homestay rất thân thiện và nhiệt tình giới thiệu về văn hóa địa phương."
      },
      {
        id: "r2",
        user: "Thu Hương",
        rating: 4.8,
        date: "2023-08-12",
        comment: "Không gian yên bình, gần gũi thiên nhiên. Đồ ăn ngon, đặc biệt là bữa sáng với các món địa phương. Sẽ quay lại vào mùa đông."
      }
    ],
    policies: {
      checkin: "13:00",
      checkout: "11:00",
      cancellation: "Miễn phí hủy trước 5 ngày.",
      rules: [
        "Giữ yên lặng sau 23:00",
        "Tôn trọng phong tục địa phương",
        "Hạn chế sử dụng nhựa một lần"
      ]
    }
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === id) || properties[0]; // Fallback to first property if not found
  const [mainImage, setMainImage] = React.useState(property.images[0]);
  const [checkIn, setCheckIn] = React.useState<Date | undefined>();
  const [checkOut, setCheckOut] = React.useState<Date | undefined>();
  const [guestCount, setGuestCount] = React.useState(1);

  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) 
    : 1;
  
  const totalPrice = property.price * nights;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow mr-1" />
              <span>{property.rating.toFixed(1)}</span>
              <span className="mx-1">·</span>
              <span>{property.reviewCount} đánh giá</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>
        
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
          <div className="md:col-span-2">
            <img 
              src={mainImage} 
              alt={property.name} 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.name} ${index + 1}`}
                className="w-full h-[196px] object-cover rounded-lg cursor-pointer"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">{property.type} tại {property.location.split(',')[0]}</h2>
                <p className="text-muted-foreground">
                  {property.bedrooms} phòng ngủ • {property.bathrooms} phòng tắm • Tối đa {property.guests} khách
                </p>
              </div>
              <div className="flex items-center">
                <img 
                  src={property.host.image} 
                  alt={property.host.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="ml-2">
                  <p className="font-medium">{property.host.name}</p>
                  <p className="text-xs text-muted-foreground">Chủ nhà</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="detail">
              <TabsList>
                <TabsTrigger value="detail">Chi tiết</TabsTrigger>
                <TabsTrigger value="amenities">Tiện nghi</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                <TabsTrigger value="policies">Chính sách</TabsTrigger>
              </TabsList>
              
              <TabsContent value="detail" className="mt-4">
                <div className="p-4 rounded-lg border bg-white">
                  <h3 className="font-medium mb-2">Mô tả</h3>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-4">
                <div className="p-4 rounded-lg border bg-white">
                  <h3 className="font-medium mb-4">Tiện nghi đi kèm</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {amenity === "Wifi" && <Wifi className="h-4 w-4 mr-2" />}
                        {amenity === "Bãi đỗ xe" && <Car className="h-4 w-4 mr-2" />}
                        {amenity === "Điều hòa" && <Snowflake className="h-4 w-4 mr-2" />}
                        {amenity === "Bếp đầy đủ" && <Kitchen className="h-4 w-4 mr-2" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="p-4 rounded-lg border bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
                    <span className="text-lg font-medium">{property.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">· {property.reviewCount} đánh giá</span>
                  </div>
                  
                  <div className="space-y-4">
                    {property.reviews.map(review => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{review.user}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="policies" className="mt-4">
                <div className="p-4 rounded-lg border bg-white">
                  <h3 className="font-medium mb-4">Quy định lưu trú</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Thời gian nhận & trả phòng</h4>
                      <div className="flex items-center mb-2">
                        <ScrollText className="h-4 w-4 mr-2" />
                        <span>Nhận phòng: {property.policies.checkin}</span>
                      </div>
                      <div className="flex items-center">
                        <ScrollText className="h-4 w-4 mr-2" />
                        <span>Trả phòng: {property.policies.checkout}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Chính sách hủy phòng</h4>
                      <p className="text-muted-foreground">{property.policies.cancellation}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Nội quy chỗ ở</h4>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {property.policies.rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="sticky top-20">
              <div className="rounded-lg border p-6 bg-white shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xl font-bold">{property.price.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm font-normal text-muted-foreground"> /đêm</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow mr-1" />
                    <span className="text-sm">{property.rating.toFixed(1)}</span>
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
                          <CalendarComponent
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
                          <CalendarComponent
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
                        {[...Array(property.guests)].map((_, i) => (
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
                    <span className="underline">{property.price.toLocaleString('vi-VN')}đ x {nights} đêm</span>
                    <span>{(property.price * nights).toLocaleString('vi-VN')}đ</span>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
