
import React from 'react';
import Layout from '@/components/layouts/Layout';
import ProductDetailComponent from '@/components/products/ProductDetail';
import Cart from '@/components/cart/Cart';

const ProductDetail: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <ProductDetailComponent />
          </div>
        </div>
      </div>
      <Cart />
    </Layout>
  );
};

export default ProductDetail;
