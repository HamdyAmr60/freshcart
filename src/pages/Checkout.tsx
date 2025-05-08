
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would process payment here
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    
    // Clear cart and redirect to home
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-medium mb-4">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">Add some products to your cart before checking out.</p>
          <Button onClick={() => navigate('/products/all')} className="bg-sage-500 hover:bg-sage-600">
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input 
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-6">Payment Information</h2>
                
                <div className="mb-4">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiration">Expiration Date</Label>
                    <Input 
                      id="expiration"
                      name="expiration"
                      placeholder="MM/YY"
                      value={formData.expiration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sage-500 hover:bg-sage-600 mt-4"
                size="lg"
              >
                Place Order
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-secondary rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <ul className="space-y-4 mb-6">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      {item.quantity > 1 && <span className="ml-1 text-muted-foreground">×{item.quantity}</span>}
                      <div className="text-muted-foreground">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && item.selectedSize && " / "}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </div>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(cartTotal + (cartTotal * 0.08)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
