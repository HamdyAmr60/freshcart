
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import ProductCarousel from '@/components/products/ProductCarousel';
import Cart from '@/components/cart/Cart';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Truck, Leaf, Star } from 'lucide-react';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-sage-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23059669\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
        
        <div className="container relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient animate-fade-in-up">
              Sustainable Fashion
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover eco-friendly clothing that makes a difference for you and the planet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="btn-primary-enhanced text-lg px-8 py-4">
                <Link to="/products/all">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-secondary-enhanced text-lg px-8 py-4">
                <Link to="/about">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable materials and processes" },
              { icon: Truck, title: "Free Shipping", desc: "On orders over $75" },
              { icon: Shield, title: "Quality Guaranteed", desc: "30-day return policy" },
              { icon: Star, title: "5-Star Rated", desc: "Loved by thousands of customers" }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-2xl flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-sage-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked items that represent our commitment to style and sustainability
            </p>
          </div>
          <ProductCarousel products={featuredProducts} title="" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sage-500 to-sage-600">
        <div className="container text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of customers who choose sustainable fashion
          </p>
          <Button asChild size="lg" className="bg-white text-sage-600 hover:bg-gray-100 font-semibold px-8 py-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/products/all">
              Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fresh styles just added to our sustainable collection
            </p>
          </div>
          <ProductCarousel products={newArrivals} title="" />
        </div>
      </section>

      <Cart />
    </Layout>
  );
};

export default Index;
