import React from 'react';
import AppNavbar from '../components/Navbar';
import '../styles/ProductList.css';

// Reusable Product Card Component
const ProductCard = ({ imageUrl, name, description, price }) => {
  return (
    <div className="card product-card">
      <img
        src={imageUrl}
        alt={name}
        className="card-image"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f8f8f8/ccc?text=Image+Not+Found'; }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
        <p className="card-price">${price}</p>
      </div>
    </div>
  );
};

// Main App Component
export default function ProductList() {
  const products = [
    { id: 1, imageUrl: '', name: 'Product', description: 'Description of first product', price: '10.99' },
    { id: 2, imageUrl: '', name: 'Product', description: 'Description of second product', price: '10.99' },
    { id: 3, imageUrl: '', name: 'Product', description: 'Description of third product', price: '10.99' },
    { id: 4, imageUrl: '', name: 'Product', description: 'Description of fourth product', price: '10.99' },
    { id: 5, imageUrl: '', name: 'Product', description: 'Description of fifth product', price: '10.99' },
    { id: 6, imageUrl: '', name: 'Product', description: 'Description of sixth product', price: '10.99' },
    { id: 7, imageUrl: '', name: 'Product', description: 'Description of first product', price: '10.99' },
    { id: 8, imageUrl: '', name: 'Product', description: 'Description of second product', price: '10.99' },
    { id: 9, imageUrl: '', name: 'Product', description: 'Description of third product', price: '10.99' },
  ];

  return (
    <div className="page">
      <AppNavbar />

      <main className="container main">
        <h1 className="main-heading">
          Cake here, there and everywhere
        </h1>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </main>
    </div>
  );
}