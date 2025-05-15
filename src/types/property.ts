export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}

export type Review = {
  id: number;
  property: string;
  guest: string;
  date: string;
  rating: number;
  content: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
};

export interface RevenueDataPoint {
  name: string;
  revenue: number;
  date?: Date;
}

export type PeriodType = 'day' | 'month' | 'year';
