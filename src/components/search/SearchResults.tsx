
import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/property';

interface SearchResultsProps {
  properties: Property[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ properties }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{properties.length} kết quả tìm thấy</h3>
          </div>
          <select className="border rounded px-3 py-1.5 text-sm">
            <option value="recommended">Đề xuất</option>
            <option value="price-low">Giá thấp đến cao</option>
            <option value="price-high">Giá cao đến thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>
      
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Không tìm thấy kết quả nào</h3>
          <p className="text-muted-foreground">Hãy thử điều chỉnh lại bộ lọc để tìm được kết quả phù hợp.</p>
        </div>
      )}
    </>
  );
};

export default SearchResults;
