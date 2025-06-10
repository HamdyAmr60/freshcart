
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

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

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
    
    clearCart();
    setIsProcessing(false);
    navigate('/');
  };

  const shipping = 0; // Free shipping
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-sage-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before checking out.
            </p>
            <Button 
              onClick={() => navigate('/products/all')} 
              className="btn-primary-enhanced"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sage-50/50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="btn-icon-enhanced"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">Complete your order</p>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <Card className="card-enhanced">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment & Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Shipping Information
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input 
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="rounded-lg"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="rounded-lg"
                              required
                            />
                          </div>
                          <div className="space-y-2 col-span-2 sm:col-span-1">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input 
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="rounded-lg"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Payment Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Payment Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="rounded-lg"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiration">Expiration Date</Label>
                            <Input 
                              id="expiration"
                              name="expiration"
                              placeholder="MM/YY"
                              value={formData.expiration}
                              onChange={handleChange}
                              className="rounded-lg"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="rounded-lg"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full btn-primary-enhanced py-4 text-lg"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card className="card-enhanced sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <div className="text-xs text-muted-foreground space-y-1">
                            {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                            {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                            <div>Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
