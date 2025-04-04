
export interface Review {
  id: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
}

export const reviewsData: Review[] = [
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
