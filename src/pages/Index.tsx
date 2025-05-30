
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import ProductCarousel from '@/components/products/ProductCarousel';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/cart/Cart';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="container mx-auto px-4 py-24 lg:py-32 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium max-w-3xl mb-6 animate-fade-in">
            Sustainable Fashion for a Better World
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our collection of eco-friendly clothing and accessories made with sustainable materials and ethical practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="btn-primary-enhanced">
              <Link to="/products/all">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-secondary-enhanced">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <ProductCarousel products={featuredProducts} title="Featured Products" />
      </section>

      {/* Sustainable Banner */}
      <section className="bg-sage-100 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">Sustainability is at Our Core</h2>
            <p className="text-muted-foreground mb-6">
              At Evergreen, we believe that fashion can be both beautiful and responsible. 
              Every product we create is designed with the planet in mind, using sustainable 
              materials and ethical production methods.
            </p>
            <ul className="space-y-3 mb-8 stagger-fade-in">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3 animate-scale-in">✓</div>
                <span>Organic and recycled materials</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3 animate-scale-in" style={{ animationDelay: '0.1s' }}>✓</div>
                <span>Carbon-neutral shipping</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3 animate-scale-in" style={{ animationDelay: '0.2s' }}>✓</div>
                <span>Fair working conditions</span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3 animate-scale-in" style={{ animationDelay: '0.3s' }}>✓</div>
                <span>Plastic-free packaging</span>
              </li>
            </ul>
            <Button asChild className="btn-primary-enhanced">
              <Link to="/sustainability">Learn More</Link>
            </Button>
          </div>
          <div className="bg-white rounded-md overflow-hidden animate-fade-in hover-lift" style={{ animationDelay: '0.3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop" 
              alt="Sustainable fashion" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <ProductCarousel products={newArrivals} title="New Arrivals" />
      </section>

      {/* Newsletter */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Join Our Community</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to receive updates on new products, sustainability initiatives, and exclusive offers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              required 
            />
            <Button type="submit" className="btn-primary-enhanced whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Cart Component */}
      <Cart />
    </Layout>
  );
};

export default Index;
