
import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, toggleCart } = useCart();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect shadow-lg' : 'bg-background/95 backdrop-blur-sm'
    } border-b border-border/50`}>
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu} 
              aria-label="Menu"
              className="btn-icon-only hover:bg-muted/80 rounded-xl"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              FRESHCART
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/products/all" className="nav-link">
              All Products
            </Link>
            <Link to="/products/new" className="nav-link">
              New Arrivals
            </Link>
            <Link to="/products/clothing" className="nav-link">
              Clothing
            </Link>
            <Link to="/products/accessories" className="nav-link">
              Accessories
            </Link>
            <Link to="/about" className="nav-link">
              Our Story
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              aria-label="Search"
              className="btn-icon-only hover:bg-muted/80 rounded-xl"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account" className="btn-icon-only hover:bg-muted/80 rounded-xl">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <DarkModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCart} 
              aria-label="Cart" 
              className="btn-icon-only relative hover:bg-muted/80 rounded-xl"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-6 border-t border-border/50 fade-in">
            <div className="flex gap-3">
              <Input 
                placeholder="Search for products..." 
                className="w-full h-12 text-base rounded-xl border-border/50 focus:border-primary"
                autoFocus
              />
              <Button size="lg" className="btn-primary-icon px-8 rounded-xl">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-6 fade-in">
            <div className="space-y-6">
              <Link to="/products/all" className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/products/new" className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                New Arrivals
              </Link>
              <Link to="/products/clothing" className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                Clothing
              </Link>
              <Link to="/products/accessories" className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
                Accessories
              </Link>
              <Link to="/about" className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
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
