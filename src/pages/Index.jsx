
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/cart/Cart';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  
  // Initialize scroll animations
  useScrollAnimation();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="container mx-auto px-4 py-24 lg:py-32 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium max-w-3xl mb-6 fade-in-section">
            Fresh Groceries Delivered to Your Door
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 fade-in-section">
            Discover our wide selection of fresh produce, quality ingredients, and daily essentials delivered quickly to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-in-section">
            <Button asChild size="lg" className="bg-sage-500 hover:bg-sage-600 btn-hover">
              <Link to="/products/all">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-hover">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-between items-baseline mb-8 slide-in-left">
          <h2 className="text-2xl md:text-3xl font-medium">Featured Products</h2>
          <Link to="/products/all" className="text-sage-500 hover:text-sage-600 transition-colors nav-link">
            View All
          </Link>
        </div>
        <div className="stagger-animation">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Quality Banner */}
      <section className="bg-sage-100 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="slide-in-left">
            <h2 className="text-2xl md:text-3xl font-medium mb-6">Quality & Freshness Guaranteed</h2>
            <p className="text-muted-foreground mb-6">
              At FreshCart, we're committed to bringing you the freshest groceries and highest quality products. 
              Every item is carefully selected and delivered with care to ensure your satisfaction.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start stagger-animation">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3">✓</div>
                <span>Fresh produce sourced daily</span>
              </li>
              <li className="flex items-start stagger-animation">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3">✓</div>
                <span>Same-day delivery available</span>
              </li>
              <li className="flex items-start stagger-animation">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3">✓</div>
                <span>Quality guarantee on all products</span>
              </li>
              <li className="flex items-start stagger-animation">
                <div className="h-6 w-6 rounded-full bg-sage-500 flex items-center justify-center text-white shrink-0 mr-3">✓</div>
                <span>Competitive prices</span>
              </li>
            </ul>
            <Button asChild className="bg-sage-500 hover:bg-sage-600 btn-hover">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          <div className="bg-white rounded-md overflow-hidden slide-in-right">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop" 
              alt="Fresh groceries" 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-between items-baseline mb-8 slide-in-right">
          <h2 className="text-2xl md:text-3xl font-medium">New Arrivals</h2>
          <Link to="/products/new" className="text-sage-500 hover:text-sage-600 transition-colors nav-link">
            View All
          </Link>
        </div>
        <div className="stagger-animation">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center fade-in-section">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">Stay Updated</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to receive updates on new products, special offers, and fresh deals delivered straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-300 focus:ring-2 focus:ring-sage-500"
              required 
            />
            <Button type="submit" className="bg-sage-500 hover:bg-sage-600 btn-hover">
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
