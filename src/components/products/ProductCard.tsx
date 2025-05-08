
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container aspect-[3/4] bg-secondary rounded-md mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>
        
        <h3 className="text-sm font-medium mb-1 group-hover:text-sage-500 transition-colors">{product.name}</h3>
        
        <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        
        {product.isNewArrival && (
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-sage-100 text-sage-700 rounded">
            New Arrival
          </span>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
