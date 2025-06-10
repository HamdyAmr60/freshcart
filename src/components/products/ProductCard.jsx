
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BadgePercent, ShoppingCart, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="product-card group h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block h-full flex flex-col">
        <div className="product-image relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Buttons */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
            <Button 
              onClick={handleAddToCart} 
              className="btn-primary-icon cart-btn bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-0 shadow-lg"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button 
              variant="secondary"
              className="btn-icon-only bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 shadow-lg"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg">
                <BadgePercent className="h-3 w-3 mr-1" />
                {product.salePercent}% OFF
              </Badge>
            )}
            {product.isNewArrival && !product.isOnSale && (
              <Badge className="bg-primary hover:bg-primary/90 rounded-full px-3 py-1 text-xs shadow-lg">
                New
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          {/* Category */}
          <Badge variant="secondary" className="text-xs capitalize mb-3 rounded-full w-fit">
            {product.category}
          </Badge>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {product.rating.toFixed(1)}
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between mt-auto">
            {product.isOnSale ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-500">
                  ${(product.price - (product.price * (product.salePercent || 0) / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
