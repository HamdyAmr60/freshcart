
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
    <div className="group relative bg-card rounded-lg border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border">
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container aspect-[3/4] bg-secondary overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          
          {/* Add to Cart Button - Visible on Hover */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <Button 
              onClick={handleAddToCart} 
              className="bg-white text-foreground dark:bg-secondary/90 dark:text-foreground hover:bg-sage-100 dark:hover:bg-sage-700 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 shadow-lg"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          
          {/* Sale Badge */}
          {product.isOnSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-medium flex items-center shadow-md">
              <BadgePercent className="h-3 w-3 mr-1" />
              {product.salePercent}% OFF
            </div>
          )}

          {/* New Arrival Badge */}
          {product.isNewArrival && !product.isOnSale && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-sage-500 hover:bg-sage-600 shadow-md">New</Badge>
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4 h-32 flex flex-col justify-between">
          <div>
            {/* Category Badge */}
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs capitalize">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="text-sm font-medium mb-2 group-hover:text-sage-500 transition-colors line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </div>
          
          <div>
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-2">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs ml-1 text-muted-foreground">{product.rating.toFixed(1)}</span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-center">
              {product.isOnSale ? (
                <div className="flex items-center">
                  <p className="text-sm text-red-500 font-semibold">
                    ${(product.price - (product.price * (product.salePercent || 0) / 100)).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground line-through ml-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-sm font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
