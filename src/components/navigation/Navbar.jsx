
import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, toggleCart } = useCart();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu" className="btn-hover">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl lg:text-2xl font-bold tracking-tight hover:text-sage-500 transition-colors duration-300">
              FRESHCART
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <Link to="/products/all" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
              All Products
            </Link>
            <Link to="/products/new" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
              New Arrivals
            </Link>
            <Link to="/products/clothing" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
              Clothing
            </Link>
            <Link to="/products/accessories" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
              Accessories
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
              Our Story
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search" className="btn-hover">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account" className="btn-hover">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <DarkModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Cart" className="relative btn-hover">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-fade-in-scale">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-border animate-slide-in-bottom">
            <div className="flex gap-2">
              <Input 
                placeholder="Search for products..." 
                className="w-full transition-all duration-300 focus:ring-2 focus:ring-sage-500"
                autoFocus
              />
              <Button className="btn-hover">Search</Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-slide-in-bottom">
            <div className="space-y-4">
              <Link to="/products/all" className="block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
                All Products
              </Link>
              <Link to="/products/new" className="block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
                New Arrivals
              </Link>
              <Link to="/products/clothing" className="block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
                Clothing
              </Link>
              <Link to="/products/accessories" className="block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
                Accessories
              </Link>
              <Link to="/about" className="block text-foreground/80 hover:text-foreground text-sm font-medium transition-colors nav-link">
                Our Story
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
