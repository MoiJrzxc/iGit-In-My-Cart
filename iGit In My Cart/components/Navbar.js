import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Navbar.css';

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="customNavbar fixed-top" variant="dark">
      <Container fluid className="px-5">
        <Navbar.Brand as={Link} to="/" className="logoText">IGIT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
            <Nav.Link as={Link} to="/search" className="mx-3">Search</Nav.Link>
            <Nav.Link as={Link} to="/products" className="mx-3">Shop</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mx-3">Cart</Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-3">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;