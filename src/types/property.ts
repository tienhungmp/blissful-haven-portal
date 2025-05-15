
export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}

export interface Review {
  id: number;
  property: string;
  guest: string;
  date: string;
  rating: number;
  content: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}
