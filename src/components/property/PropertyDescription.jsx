
import React from 'react';

const PropertyDescription = ({ description }) => {
  return (
    <div className="p-4 rounded-lg border bg-white">
      <h3 className="font-medium mb-2">Mô tả</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PropertyDescription;
