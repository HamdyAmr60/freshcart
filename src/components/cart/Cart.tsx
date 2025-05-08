
import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={closeCart}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart {cart.length > 0 && `(${cart.length})`}
          </h2>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some products to your cart to see them here.</p>
              <Button onClick={closeCart} className="bg-sage-500 hover:bg-sage-600">Continue Shopping</Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((item) => (
                <li key={item.id} className="py-6 flex animate-fade-in">
                  <div className="flex-shrink-0 w-24 h-24 bg-secondary rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedSize && item.selectedColor && " / "}
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                        </p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex-1 flex items-end justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            <div className="flex justify-between text-base font-medium mb-4">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Shipping and taxes calculated at checkout.</p>
            <Link to="/checkout" onClick={closeCart}>
              <Button className="w-full bg-sage-500 hover:bg-sage-600">
                Checkout
              </Button>
            </Link>
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={closeCart} 
                className="text-sm text-muted-foreground"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
