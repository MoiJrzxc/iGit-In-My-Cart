import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaStore,
  FaCheckCircle,
} from "react-icons/fa";
import AppNavbar from "../components/Navbar";
import "../styles/Cart.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialCart = [
  {
    id: 1,
    name: "Pear-of-Cake",
    price: 10.99,
    quantity: 1,
    image: "https://via.placeholder.com/200x200?text=Pear-of-Cake",
    shop: "IGIT Bakes",
  },
  {
    id: 2,
    name: "Freaky Cake",
    price: 12.5,
    quantity: 1,
    image: "https://via.placeholder.com/200x200?text=Freaky+Cake",
    shop: "IGIT Bakes",
  },
  {
    id: 3,
    name: "Cake of Melancholia",
    price: 8.75,
    quantity: 1,
    image: "https://via.placeholder.com/200x200?text=Melancholia",
    shop: "IGIT Bakes",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Update quantity
  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Image fallback
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=Image+Not+Found";
  };

  // Select item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  // Delete item
  const handleDelete = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Select all
  const handleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  // Checkout
  const handleCheckout = () => {
    const checkedItems = cart.filter((item) => selectedItems.includes(item.id));
    navigate("/checkout", {
      state: { checkedItems, subtotal, shippingFee, total },
    });
  };

  const checkedItems = cart.filter((item) => selectedItems.includes(item.id));
  const subtotal = checkedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = checkedItems.length > 0 ? 5.0 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="cartPage bg-light min-vh-100">
      <AppNavbar />

      <Container className="py-5 mt-5">
        <h2 className="fw-bold mb-4 text-center text-uppercase text-dark">
          <FaShoppingCart className="me-2 text-primary" />
          My Cart
        </h2>
        <Row className="g-4">
          {/* LEFT SIDE – CART ITEMS */}
          <Col lg={8}>
            {cart.length > 0 ? (
              <Card className="border-0 shadow-lg p-4 bg-white rounded-4">
                {/* Header with Select All */}
                <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                  <Form.Check
                    type="checkbox"
                    id="selectAll"
                    label={
                      <>
                        <FaCheckCircle className="text-success me-2" />
                        Select All
                      </>
                    }
                    checked={
                      selectedItems.length === cart.length && cart.length > 0
                    }
                    onChange={handleSelectAll}
                    className="fw-semibold text-dark custom-checkbox"
                  />
                  <span className="text-muted small">
                    {selectedItems.length} selected
                  </span>
                </div>

                {cart.map((item) => (
                  <Card
                    key={item.id}
                    className="border-0 shadow-sm mb-4 rounded-4 px-3 py-3 cartItemCard hover-shadow"
                  >
                    <Row className="align-items-center g-3">
                      {/* Checkbox */}
                      <Col xs="auto">
                        <Form.Check
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="custom-checkbox"
                        />
                      </Col>

                      {/* Image */}
                      <Col xs={3} md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          onError={handleImageError}
                          fluid
                          rounded
                          className="border"
                        />
                      </Col>

                      {/* Product Info */}
                      <Col xs={5} md={4}>
                        <h5 className="fw-semibold mb-1">{item.name}</h5>
                        <p className="text-muted small mb-1">
                          <FaStore className="me-1 text-secondary" />
                          {item.shop}
                        </p>
                        <p className="fw-bold text-dark mb-0">
                          ₱{item.price.toFixed(2)}
                        </p>
                      </Col>

                      {/* Quantity Controls */}
                      <Col
                        xs={3}
                        md={3}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Button
                          variant="outline-secondary"
                          className="rounded-circle p-2"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <FaMinus />
                        </Button>
                        <span className="px-3 fw-bold fs-6">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline-secondary"
                          className="rounded-circle p-2"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus />
                        </Button>
                      </Col>

                      {/* Delete Button */}
                      <Col
                        xs={2}
                        md={2}
                        className="d-flex align-items-center justify-content-end"
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-3 px-3"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Card>
            ) : (
              <Card className="border-0 shadow-sm p-5 text-center">
                <p className="text-muted fs-5">
                  <FaShoppingCart className="me-2" />
                  Your cart is empty 😢
                </p>
              </Card>
            )}
          </Col>

          {/* RIGHT SIDE – ORDER SUMMARY */}
          <Col lg={4}>
            <Card className="border-0 shadow-lg p-4 rounded-4 bg-white sticky-top">
              <h4 className="fw-bold mb-3 text-uppercase text-center">
                Order Summary
              </h4>
              <Row className="mb-2">
                <Col>Subtotal:</Col>
                <Col className="text-end fw-bold">₱{subtotal.toFixed(2)}</Col>
              </Row>
              <Row className="mb-2">
                <Col>Shipping Fee:</Col>
                <Col className="text-end fw-bold">
                  ₱{shippingFee.toFixed(2)}
                </Col>
              </Row>
              <hr />
              <Row className="mb-3">
                <Col>Total:</Col>
                <Col className="text-end fw-bold fs-5 text-success">
                  ₱{total.toFixed(2)}
                </Col>
              </Row>
              <Button
                variant="dark"
                className="w-100 rounded-3 py-3 text-uppercase fw-semibold border-0"
                disabled={checkedItems.length === 0}
                onClick={handleCheckout}
              >
                <FaShoppingCart className="me-2 text-black" />
                Proceed to Checkout
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
