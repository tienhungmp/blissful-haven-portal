
import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';
import { Property } from '@/types/property';

export const useHomestays = (page: number = 1, limit: number = 9) => {
  const { fetchData } = useApi();

  return useQuery({
    queryKey: ['homestays', page, limit],
    queryFn: async () => {
      const response = await fetchData<{
        data: Property[];
        total: number;
      }>('/properties', {
        page,
        limit,
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch homestays');
      }

      return response.data;
    },
  });
};
