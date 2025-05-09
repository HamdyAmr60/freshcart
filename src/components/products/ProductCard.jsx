
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BadgePercent, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    addToCart(product, 1);
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container aspect-[3/4] bg-secondary rounded-md mb-4 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          
          {/* Add to Cart Button - Visible on Hover */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <Button 
              onClick={handleAddToCart} 
              className="bg-white text-foreground dark:bg-secondary/90 dark:text-foreground hover:bg-sage-100 dark:hover:bg-sage-700 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          
          {/* Sale Badge */}
          {product.isOnSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
              <BadgePercent className="h-3 w-3 mr-1" />
              {product.salePercent}% OFF
            </div>
          )}

          {/* New Arrival Badge */}
          {product.isNewArrival && !product.isOnSale && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-sage-500 hover:bg-sage-600">New</Badge>
            </div>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>
        
        <h3 className="text-sm font-medium mb-1 group-hover:text-sage-500 transition-colors">{product.name}</h3>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs ml-1">{product.rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center">
          {product.isOnSale ? (
            <div className="flex items-center">
              <p className="text-sm text-red-500 font-medium">
                ${(product.price - (product.price * (product.salePercent || 0) / 100)).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground line-through ml-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
