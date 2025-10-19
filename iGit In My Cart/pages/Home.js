import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AppNavbar from '../components/Navbar';
import '../styles/Home.css';
import allProducts from '../data/products';

const defaultProducts = [
  { name: 'Piece of Cake', price: '$10.99', description: 'Everything is easy when you have the cake they want.', image: `${process.env.PUBLIC_URL}/pear-cover.png` },
  { name: 'Freaky Cake', price: '$10.99', description: 'You lost the freak, I lost the freak, we all got the freak.', image: `${process.env.PUBLIC_URL}/pear-small.png` },
  { name: 'Cake of Melancholia', price: '$10.99', description: 'You know where things gonna happen...', image: `${process.env.PUBLIC_URL}/mushroom.png` },
];

const ProductCard = ({ product, animate }) => (
  <Card className={`product-card border-0 rounded-0 h-100 ${animate ? 'swap-animate' : ''}`}>
    <div className="product-img-wrapper">
      <CrossfadeImage src={product.image} alt={product.name} className="img-fluid product-img" />
    </div>
    <Card.Body className="px-0 pt-3">
      <h5 className="fw-semibold mb-1">{product.name}</h5>
      <p className="text-muted small mb-1">{product.description}</p>
      <p className="fw-bold fs-6">{product.price}</p>
    </Card.Body>
  </Card>
);

// CrossfadeImage - lightweight two-image crossfade on src change
const CrossfadeImage = ({ src, alt, className }) => {
  const [current, setCurrent] = useState(src);
  const [prev, setPrev] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (src === current) return;
    setPrev(current);
    setCurrent(src);
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40); // allow a frame then fade in
    return () => clearTimeout(t);
  }, [src]);

  return (
    <div className="crossfade-wrapper" aria-live="polite">
      {prev && (
        <img src={prev} alt={alt} className={`crossfade-img ${visible ? 'hide' : 'show'} ${className || ''}`} />
      )}
      <img src={current} alt={alt} className={`crossfade-img ${visible ? 'show' : 'hide'} ${className || ''}`} />
    </div>
  );
};

const Home = () => {
  const [flavorProducts, setFlavorProducts] = useState(defaultProducts);
  const [animate, setAnimate] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  // pick n random products from the full product list
  const pickRandom = (arr, n) => {
    const copy = [...arr];
    const res = [];
    while (res.length < n && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      res.push(copy.splice(idx, 1)[0]);
    }
    return res;
  };

  useEffect(() => {
    // initial pick on mount (use available allProducts if present)
    const choose = () => {
      const source = allProducts && allProducts.length ? allProducts : defaultProducts;
      const picks = pickRandom(source, 3).map((p) => ({
        name: p.name,
        price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : p.price,
        description: p.description || '',
        image: p.image || p.imageUrl || `${process.env.PUBLIC_URL}/1.png`,
      }));
      // Trigger a small animation state on the cards
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      setFlavorProducts(picks);
    };

    choose();
    const start = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(choose, 10000);
    };
    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    start();

    // Attach hover handlers via ref (React way)
    const wrap = sectionRef.current;
    const pause = () => stop();
    const resume = () => start();
    if (wrap) {
      wrap.addEventListener('mouseenter', pause);
      wrap.addEventListener('mouseleave', resume);
    }

    return () => {
      stop();
      if (wrap) {
        wrap.removeEventListener('mouseenter', pause);
        wrap.removeEventListener('mouseleave', resume);
      }
    };
  }, []);

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
  <section ref={sectionRef} className="flavor-section py-5">
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
                <img src={flavorProducts[0].image} alt={flavorProducts[0].name} className="img-fluid flavor-image" />
              </div>
            </Col>

            {/* Bottom Left Image */}
            <Col lg={6} className="text-center">
              <div className="flavor-img-wrapper">
                <img src={flavorProducts[1].image} alt={flavorProducts[1].name} className="img-fluid flavor-image" />
              </div>
            </Col>

            {/* Bottom Right Best Seller */}
            <Col lg={6}>
              <h3 className="best-title mb-2">Our Best Seller!</h3>
              <p className="best-desc">{flavorProducts[2].description}</p>
              <Button variant="dark" className="rounded-0 px-3 py-2 w-auto">Shop Cake</Button>
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
              <ProductCard product={flavorProducts[0]} animate={animate} />
            </Col>
            <Col lg={3}>
              <ProductCard product={flavorProducts[1]} animate={animate} />
            </Col>
            <Col lg={3}>
              <ProductCard product={flavorProducts[2]} animate={animate} />
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
