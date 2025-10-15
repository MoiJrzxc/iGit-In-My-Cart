import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';
import '../styles/Home.css';

const products = [
  {
    name: 'Pear-of-Cake',
    price: '$10.99',
    description: 'A little slice of heaven to calm you when you take the cake they want...',
    imageClass: "largePear",
  },
  {
    name: 'Freaky Cake',
    price: '$10.99',
    description: 'You lost the freak, I lost the freak, we all got the freak.',
    imageClass: "smallPear",
  },
  {
    name: 'Cake of Melancholia',
    price: '$10.99',
    description: 'This is where all the gonna happen...',
    imageClass: "mushrooms",
  },
];

const ProductCard = ({ product }) => (
  <Card className="border-0 rounded-0 h-100">
    <div className={`productImagePlaceholder ${product.imageClass}`} />
    <Card.Body className="p-0 pt-3">
      <h4 className="fw-bold mb-1">{product.name}</h4>
      <p className="text-muted small">{product.description}</p>
      <p className="fw-bold fs-5">{product.price}</p>
    </Card.Body>
  </Card>
);

const Home = () => {
  return (
    <div className="homePage">
      <AppNavbar />

      {/* Hero Section */}
      <header className="heroSection d-flex align-items-center justify-content-center text-white text-center">
        <div className="py-5">
          <h1 className="display-4 fw-bold">IGIT IN MY OVEN!</h1>
          <p className="lead mb-4">Flavored Cakes for Sweethearts.</p>
          <Button variant="dark" className="rounded-0 text-uppercase px-4 py-2">Shop Cakes</Button>
        </div>
      </header>

      {/* New Flavors & Best Seller Section */}
      <section className="bg-light py-5">
        <Container fluid className="px-5">
          <Row className="g-5">
            {/* New Flavors Text & Button */}
            <Col lg={6} className="d-flex flex-column justify-content-center">
              <h2 className="display-6 fw-bold">Check our new flavors!</h2>
              <p className="lead mb-3">
                A new selection of special, savory, & sweet <br/> fruit for Halloween-Themed Spreads.
              </p>
              <Button variant="dark" className="rounded-0 text-uppercase px-4 py-2 w-auto">New Flavors</Button>
            </Col>

            {/* Images and Best Seller */}
            <Col lg={6}>
              <Row className="g-4">
                <Col md={6} className="imageBlock">
                  <div className="smallPearsImage" />
                </Col>
                <Col md={6} className="d-none d-md-block"></Col>
                
                <Col md={6} className="imageBlock">
                  <div className="watermelonImage" />
                </Col>

                <Col md={6} className="d-flex flex-column justify-content-center">
                  <h3 className="h4 fw-bold">Our Best Seller!</h3>
                  <p className="text-muted small mb-3">Spooky, Sweet, & Delicious! Cake soothes the Scariest.</p>
                  <Button variant="dark" className="rounded-0 text-uppercase px-3 py-2 w-auto">Shop Cake</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Grid Section */}
      <section className="py-5">
        <Container fluid className="px-5">
          <h2 className="display-6 fw-bold mb-4">Cakes everywhere but I only see you</h2>
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
      <footer className="border-top py-4 px-5">
        <Button variant="dark" className="rounded-0 text-uppercase px-4 py-2 mb-3">About Us</Button>
      </footer>
    </div>
  );
};

export default Home;