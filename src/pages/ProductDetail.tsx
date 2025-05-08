
import React from 'react';
import Layout from '@/components/layouts/Layout';
import ProductDetailComponent from '@/components/products/ProductDetail';
import Cart from '@/components/cart/Cart';

const ProductDetail: React.FC = () => {
  return (
    <Layout>
      <ProductDetailComponent />
      <Cart />
    </Layout>
  );
};

export default ProductDetail;
