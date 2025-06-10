
import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/cart/Cart';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">My Favorites</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your carefully curated collection of sustainable fashion favorites
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your favorites
            </p>
            <Button 
              variant="outline" 
              onClick={clearFavorites}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Products Grid or Empty State */}
        {favorites.length === 0 ? (
          <div className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start browsing our sustainable collection and add items you love to your favorites
              </p>
              <Button asChild className="btn-primary-enhanced">
                <Link to="/products/all">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <ProductGrid 
            products={favorites} 
            emptyMessage="No favorite products found"
          />
        )}
      </div>
      <Cart />
    </Layout>
  );
};

export default Favorites;
