
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductRecommendations from './ProductRecommendations';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = productId ? getProductById(productId) : undefined;
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0] : undefined
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
        <p className="mb-6 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 pl-0 -ml-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-secondary rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
          <p className="text-xl mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                      selectedColor === color
                        ? 'border-sage-500 bg-sage-50 text-sage-700'
                        : 'border-border hover:border-sage-300'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${
                      selectedSize === size
                        ? 'border-sage-500 bg-sage-50 text-sage-700'
                        : 'border-border hover:border-sage-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button 
              onClick={handleAddToCart} 
              className="flex-1 bg-sage-500 hover:bg-sage-600"
            >
              Add to Cart
            </Button>
          </div>
          
          {/* Additional Product Information */}
          <div className="border-t border-border mt-12 pt-8">
            <h3 className="font-medium mb-4">Sustainable Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ethically produced</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>100% eco-friendly materials</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Carbon-neutral shipping</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Recyclable packaging</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Product Recommendations */}
      <ProductRecommendations currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;
