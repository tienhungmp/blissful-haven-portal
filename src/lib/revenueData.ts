
import { format, subDays, subMonths, subYears, eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval } from 'date-fns';

// Types for revenue data
export type RevenueDataPoint = {
  name: string;
  revenue: number;
  date?: Date; // Internal use for sorting
};

export type PeriodType = 'day' | 'month' | 'year';

// Function to generate random revenue data
const generateRandomRevenue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate daily revenue data for the last n days
export const generateDailyRevenueData = (days: number = 30): RevenueDataPoint[] => {
  const today = new Date();
  const interval = eachDayOfInterval({
    start: subDays(today, days - 1),
    end: today
  });

  return interval.map(date => ({
    name: format(date, 'dd/MM'),
    revenue: generateRandomRevenue(300000, 1500000),
    date
  }));
};

// Generate monthly revenue data for the last n months
export const generateMonthlyRevenueData = (months: number = 12): RevenueDataPoint[] => {
  const today = new Date();
  const interval = eachMonthOfInterval({
    start: subMonths(today, months - 1),
    end: today
  });

  return interval.map(date => ({
    name: format(date, 'MM/yyyy'),
    revenue: generateRandomRevenue(1500000, 5000000),
    date
  }));
};

// Generate yearly revenue data for the last n years
export const generateYearlyRevenueData = (years: number = 5): RevenueDataPoint[] => {
  const today = new Date();
  const interval = eachYearOfInterval({
    start: subYears(today, years - 1),
    end: today
  });

  return interval.map(date => ({
    name: format(date, 'yyyy'),
    revenue: generateRandomRevenue(18000000, 50000000),
    date
  }));
};

// Function to get revenue data based on period type
export const getRevenueData = (periodType: PeriodType, count?: number): RevenueDataPoint[] => {
  switch (periodType) {
    case 'day':
      return generateDailyRevenueData(count || 30);
    case 'month':
      return generateMonthlyRevenueData(count || 12);
    case 'year':
      return generateYearlyRevenueData(count || 5);
    default:
      return generateMonthlyRevenueData(12);
  }
};

// Format revenue value for display
export const formatRevenue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M VND`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K VND`;
  }
  return `${value} VND`;
};
