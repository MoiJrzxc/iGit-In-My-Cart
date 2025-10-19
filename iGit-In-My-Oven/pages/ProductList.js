import React from 'react';
import AppNavbar from '../components/Navbar';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/ProductList.css';
import sampleProducts from '../data/sample-products.json';

// If you want to test with the sample JSON file, uncomment:

// Main App Component
export default function ProductList() {
  const list = products; // switch to sampleProducts for testing

  return (
    <div className="page">
      <AppNavbar />

      <main className="container main">
        <h1 className="main-heading">Cake here, there and everywhere</h1>
        <div className="product-grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}