
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const reviewFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự",
  }),
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  rating: z.string().transform(val => parseInt(val, 10)).refine(val => val >= 1 && val <= 5, {
    message: "Đánh giá phải từ 1 đến 5 sao",
  }),
  comment: z.string().min(10, {
    message: "Nhận xét phải có ít nhất 10 ký tự",
  }),
});

const reviewsData = [
  {
    id: '1',
    user: 'Nguyễn Văn A',
    date: '25/03/2023',
    rating: 5,
    comment: 'Phòng ở rất thoải mái, sạch sẽ và tiện nghi. Nhân viên phục vụ nhiệt tình, chu đáo. Vị trí thuận tiện cho việc di chuyển. Sẽ quay lại vào lần sau.',
  },
  {
    id: '2',
    user: 'Trần Thị B',
    date: '15/02/2023',
    rating: 4,
    comment: 'Căn hộ có view đẹp, đầy đủ tiện nghi, vị trí trung tâm thuận tiện đi lại. Nhân viên phục vụ rất nhiệt tình. Chỉ có điều giá hơi cao.',
  },
  {
    id: '3',
    user: 'Lê Văn C',
    date: '05/01/2023',
    rating: 5,
    comment: 'Một trong những homestay tốt nhất mà tôi từng ở. Không gian thoáng mát, sạch sẽ, view cực đẹp. Nhân viên thân thiện và chuyên nghiệp.',
  },
  {
    id: '4',
    user: 'Phạm Thị D',
    date: '10/12/2022',
    rating: 4,
    comment: 'Căn hộ rộng rãi, trang bị đầy đủ tiện nghi. Vị trí gần trung tâm, dễ dàng di chuyển đến các điểm tham quan. Sẽ giới thiệu cho bạn bè.',
  },
  {
    id: '5',
    user: 'Hoàng Văn E',
    date: '22/11/2022',
    rating: 5,
    comment: 'Tuyệt vời! Phòng đẹp, sạch sẽ, nhân viên rất thân thiện và nhiệt tình. Vị trí thuận lợi, gần các điểm tham quan và mua sắm.',
  },
];

const Reviews = () => {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: '5',
      comment: '',
    }
  });

  const onSubmit = (data: z.infer<typeof reviewFormSchema>) => {
    console.log(data);
    toast.success("Cảm ơn bạn đã gửi đánh giá!");
    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>Đánh giá - BlissStay</title>
      </Helmet>

      <Navbar />
      
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Đánh giá từ khách hàng</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Reviews List */}
          <div className="flex-1">
            <div className="space-y-6">
              {reviewsData.map(review => (
                <Card key={review.id} className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{review.user}</h3>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Submit Review Form */}
          <div className="md:w-1/3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Gửi đánh giá của bạn</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Nhập họ và tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Đánh giá</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star} className="cursor-pointer">
                                  <input
                                    type="radio"
                                    value={star}
                                    checked={parseInt(field.value) === star}
                                    onChange={() => form.setValue('rating', star.toString())}
                                    className="sr-only"
                                  />
                                  <Star 
                                    className={`h-6 w-6 ${parseInt(field.value) >= star ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`} 
                                  />
                                </label>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhận xét</FormLabel>
                          <FormControl>
                            <textarea 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                              rows={5}
                              placeholder="Chia sẻ trải nghiệm của bạn..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
                      Gửi đánh giá
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Reviews;
