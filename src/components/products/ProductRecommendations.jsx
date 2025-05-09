
import React from 'react';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const ProductRecommendations = ({ currentProductId }) => {
  // Get recommendations (excluding current product)
  const recommendations = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4); // Only show up to 4 recommendations

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-medium mb-8">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
