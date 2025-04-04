
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
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
  rating: z.number().min(1).max(5, {
    message: "Đánh giá phải từ 1 đến 5 sao",
  }),
  comment: z.string().min(10, {
    message: "Nhận xét phải có ít nhất 10 ký tự",
  }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const ReviewForm = () => {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 5,
      comment: '',
    }
  });

  const onSubmit = (data: ReviewFormValues) => {
    console.log(data);
    toast.success("Cảm ơn bạn đã gửi đánh giá!");
    form.reset();
  };

  return (
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
                            checked={field.value === star}
                            onChange={() => form.setValue('rating', star)}
                            className="sr-only"
                          />
                          <Star 
                            className={`h-6 w-6 ${field.value >= star ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-300'}`} 
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
  );
};

export default ReviewForm;
