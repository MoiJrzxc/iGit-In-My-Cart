import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

const ReviewCard = ({ stars, name, date, text }) => (
  <div className="review-card">
    <div className="review-stars mb-2">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </div>
    <p className="review-text mb-2">{text}</p>
    <div className="review-meta">
      <span className="reviewer-name">{name}</span>
      <span className="review-date">{date}</span>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Hooks must be called unconditionally at the top level
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Try to get product from location state first (fast path), otherwise find by id
  const productFromState = location.state && location.state.product;
  const product = productFromState || products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <AppNavbar />
        <Container fluid className="px-5 mt-4">
          <p>Product not found.</p>
          <Button onClick={() => navigate(-1)} variant="link">Go back</Button>
        </Container>
      </div>
    );
  }

  // Related products: pick other items
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const handleAddToCart = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail-page">
      <AppNavbar />

      {/* Back Button */}
      <Container fluid className="px-5 mt-4">
        <Button variant="link" className="p-0 back-btn" onClick={() => navigate(-1)}>
          &larr; Back to products
        </Button>
      </Container>

      {/* Product Info */}
      <Container fluid className="px-5 mt-4">
        <Row className="g-5 align-items-start">
          <Col lg={5}>
            <div className="product-detail-img-wrapper">
              <img src={product.image} alt={product.name} className="img-fluid product-detail-img" />
            </div>
          </Col>

          <Col lg={7}>
            <h2 className="product-name">{product.name}</h2>
            <p className="stock-text">Stocks: {product.stock ?? 'N/A'}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-desc">{product.description}</p>
            <div className="d-flex gap-2 mt-3">
              <Button variant="dark" className="rounded-0 px-4 py-2" onClick={handleAddToCart}>
                Add to cart
              </Button>
              <Button variant="outline-dark" className="rounded-0 px-4 py-2">Add to wishlist</Button>
            </div>
            {added && <div className="mt-3 text-success">Added to cart</div>}
            <p className="mt-3 text-muted small">Text box for additional details or fine print</p>
          </Col>
        </Row>
      </Container>

      {/* Reviews */}
      <Container fluid className="px-5 mt-5">
        <ReviewCard stars={5} name="Reviewer name" date="Date" text="ANG GANDA NYAAA! ako na kasi iwa maganda rin po yung cake tapos yummy, kaso lang taken nako xD" />
        <ReviewCard stars={1} name="Reviewer name" date="Date" text="BAD EXPERIENCE! WAG KAYO UMORDER DITO YUNG DELIVERY RIDER BASTOS MAKINIS USAP BINASAGAN PA YUNG CAKE KO" />
      </Container>

      {/* Related Products */}
      <Container fluid className="px-5 mt-5 mb-5">
        <h4 className="fw-semibold mb-4">More Cakes (Slides)</h4>
        <Row className="g-4">
          {relatedProducts.map((prod) => (
            <Col lg={4} md={6} key={prod.id}>
              <Card className="border-0 rounded-0 related-card">
                <div className="related-img-wrapper">
                  <img src={prod.image} alt={prod.name} className="img-fluid related-img" />
                </div>
                <Card.Body className="px-0 pt-3">
                  <h6 className="fw-semibold mb-1">{prod.name}</h6>
                  <p className="text-muted small mb-1">{prod.description}</p>
                  <p className="fw-bold fs-6">${prod.price.toFixed(2)}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="border-top py-4 px-5 text-center">
        <p className="mb-1 fw-semibold">IGIT IN MY OVEN</p>
        <p className="mb-2 text-muted small">Home baked happiness</p>
        <div className="footer-links mb-2">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
          <a href="/about">About Us</a>
        </div>
        <p className="text-muted small mb-0">Cabuyao, Philippines | igitinmyoven@gmail.com</p>
        <p className="text-muted small mb-0">© 2025 IGIT in My Oven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductDetail;
