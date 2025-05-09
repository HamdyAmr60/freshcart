
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const Cart = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md overflow-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
            <span className="ml-2 text-sm text-muted-foreground">
              ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button className="mt-6" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto py-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex border-b py-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        {item.category && (
                          <Badge variant="secondary" className="text-xs capitalize mt-1">
                            {item.category}
                          </Badge>
                        )}
                        
                        {/* Show rating if available */}
                        {item.rating && (
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Size and Color */}
                    <div className="mt-1 mb-2 space-y-1 text-xs text-muted-foreground">
                      {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                      {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center">
                      {item.isOnSale ? (
                        <div className="flex items-center">
                          <p className="text-sm text-red-500 font-medium">
                            ${(item.price - (item.price * (item.salePercent || 0) / 100)).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground line-through ml-2">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                      )}
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center mt-2">
                      <div className="flex items-center border rounded">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t py-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Shipping and taxes calculated at checkout
              </p>
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
