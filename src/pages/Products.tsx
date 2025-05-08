
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layouts/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import Cart from '@/components/cart/Cart';
import { products, getProductsByCategory, getNewArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [displayProducts, setDisplayProducts] = useState(products);
  const [sortOption, setSortOption] = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string | null;
    priceRange: string | null;
  }>({
    category: null,
    priceRange: null,
  });
  
  useEffect(() => {
    let filteredProducts = [...products];
    
    // Filter by URL parameter category
    if (category === 'new') {
      filteredProducts = getNewArrivals();
    } else if (category && category !== 'all') {
      filteredProducts = getProductsByCategory(category);
    }
    
    // Apply additional filters
    if (selectedFilters.category && selectedFilters.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedFilters.category);
    }
    
    if (selectedFilters.priceRange) {
      switch (selectedFilters.priceRange) {
        case 'under50':
          filteredProducts = filteredProducts.filter(product => product.price < 50);
          break;
        case '50to100':
          filteredProducts = filteredProducts.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case 'over100':
          filteredProducts = filteredProducts.filter(product => product.price > 100);
          break;
        default:
          break;
      }
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'priceLow':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (featured)
        break;
    }
    
    setDisplayProducts(filteredProducts);
  }, [category, sortOption, selectedFilters]);
  
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value === 'all' ? null : value,
    }));
  };

  const getPageTitle = () => {
    if (category === 'new') return 'New Arrivals';
    if (category === 'clothing') return 'Clothing';
    if (category === 'accessories') return 'Accessories';
    return 'All Products';
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">{getPageTitle()}</h1>
        
        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <Button
              variant="outline"
              className="flex justify-between sm:w-auto"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <span>Filters</span>
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-input bg-background rounded-md h-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                <option value="default">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
              </select>
            </div>
          </div>
          
          {filtersOpen && (
            <div className="grid sm:grid-cols-2 gap-6 p-6 bg-secondary rounded-md mb-6 animate-fade-in">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedFilters.category === null}
                      onChange={() => handleFilterChange('category', 'all')}
                      className="mr-2"
                    />
                    <span>All Categories</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="clothing"
                      checked={selectedFilters.category === 'clothing'}
                      onChange={() => handleFilterChange('category', 'clothing')}
                      className="mr-2"
                    />
                    <span>Clothing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="accessories"
                      checked={selectedFilters.category === 'accessories'}
                      onChange={() => handleFilterChange('category', 'accessories')}
                      className="mr-2"
                    />
                    <span>Accessories</span>
                  </label>
                </div>
              </div>
              
              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value="all"
                      checked={selectedFilters.priceRange === null}
                      onChange={() => handleFilterChange('priceRange', 'all')}
                      className="mr-2"
                    />
                    <span>All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value="under50"
                      checked={selectedFilters.priceRange === 'under50'}
                      onChange={() => handleFilterChange('priceRange', 'under50')}
                      className="mr-2"
                    />
                    <span>Under $50</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value="50to100"
                      checked={selectedFilters.priceRange === '50to100'}
                      onChange={() => handleFilterChange('priceRange', '50to100')}
                      className="mr-2"
                    />
                    <span>$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value="over100"
                      checked={selectedFilters.priceRange === 'over100'}
                      onChange={() => handleFilterChange('priceRange', 'over100')}
                      className="mr-2"
                    />
                    <span>Over $100</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            Showing {displayProducts.length} products
          </p>
        </div>
        
        {/* Product Grid */}
        <ProductGrid 
          products={displayProducts} 
          emptyMessage="No products match your selected filters."
        />
      </div>
      
      <Cart />
    </Layout>
  );
};

export default Products;
