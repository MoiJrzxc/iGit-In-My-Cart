import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';
import '../styles/Home.css';

const products = [
  {
    name: 'Piece of Cake',
    price: '$10.99',
    description: 'Everything is easy when you have the cake they want.',
    image: `${process.env.PUBLIC_URL}/pear-cover.png`,
  },
  {
    name: 'Freaky Cake',
    price: '$10.99',
    description: 'You lost the freak, I lost the freak, we all got the freak.',
    image: `${process.env.PUBLIC_URL}/pear-small.png`,
  },
  {
    name: 'Cake of Melancholia',
    price: '$10.99',
    description: 'You know where things gonna happen...',
    image: `${process.env.PUBLIC_URL}/mushroom.png`,
  },
];

const ProductCard = ({ product }) => (
  <Card className="product-card border-0 rounded-0 h-100">
    <div className="product-img-wrapper">
      <img src={product.image} alt={product.name} className="img-fluid product-img" />
    </div>
    <Card.Body className="px-0 pt-3">
      <h5 className="fw-semibold mb-1">{product.name}</h5>
      <p className="text-muted small mb-1">{product.description}</p>
      <p className="fw-bold fs-6">{product.price}</p>
    </Card.Body>
  </Card>
);

const Home = () => {
  return (
    <div className="homePage">
      <AppNavbar />

      {/* Hero Section */}
      <header className="heroSection d-flex align-items-center justify-content-center text-white text-center">
        <div className="hero-content">
          <h1 className="display-5 fw-bold">IGIT IN MY OVEN</h1>
          <p className="lead">Home baked sweethearts</p>
          <Button variant="dark" className="rounded-0 text-uppercase px-4 py-2 w-auto">
            Shop Cake
          </Button>
        </div>
      </header>

      {/* Flavor Section */}
      <section className="flavor-section py-5">
        <Container fluid className="px-5">
          <Row className="g-4 align-items-center">
            {/* Left Text */}
            <Col lg={6}>
              <h2 className="section-title mb-2">Check our new flavors!</h2>
              <p className="section-desc">
                November is here! We're gladly to present you our{' '}
                <span className="highlight">Halloween Themed</span> flavors!
              </p>
              <Button variant="dark" className="rounded-0 px-3 py-2 w-auto">
                New Flavors
              </Button>
            </Col>

            {/* Right Top Image */}
            <Col lg={6} className="text-center">
              <div className="flavor-img-wrapper mb-4">
                <img
                  src={`${process.env.PUBLIC_URL}/1.png`}
                  alt="cake"
                  className="img-fluid flavor-image"
                />
              </div>
            </Col>

            {/* Bottom Left Image */}
            <Col lg={6} className="text-center">
              <div className="flavor-img-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}/2.png`}
                  alt="watermelon"
                  className="img-fluid flavor-image"
                />
              </div>
            </Col>

            {/* Bottom Right Best Seller */}
            <Col lg={6}>
              <h3 className="best-title mb-2">Our Best Seller!</h3>
              <p className="best-desc">
                Smoked Beef & Effervescent Cake smells like forever.
              </p>
              <Button variant="dark" className="rounded-0 px-3 py-2 w-auto">
                Shop Cake
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <Container fluid className="px-5">
          <h2 className="display-6 fw-bold mb-4">
            Cakes everywhere but I only see you (.cover)
          </h2>
          <Row className="g-4">
            <Col lg={6}>
              <ProductCard product={products[0]} />
            </Col>
            <Col lg={3}>
              <ProductCard product={products[1]} />
            </Col>
            <Col lg={3}>
              <ProductCard product={products[2]} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-top py-4 text-center">
        <Button variant="dark" className="rounded-0 text-uppercase px-4 py-2 mb-2 w-auto">
          About Us
        </Button>
      </footer>
    </div>
  );
};

export default Home;
