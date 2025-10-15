import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import { FaShoppingCart, FaCreditCard, FaTruck, FaUser } from "react-icons/fa";
import AppNavbar from "../components/Navbar";
import "../styles/Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkedItems = [], subtotal = 0, shippingFee = 0, total = 0 } =
    location.state || {};

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=Image+Not+Found";
  };

  const handlePlaceOrder = () => {
    alert("✅ Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="checkoutPage bg-light min-vh-100">
      <AppNavbar />
      <Container className="py-5 mt-5">
        <h2 className="fw-bold mb-5 text-center text-uppercase">
          <FaShoppingCart className="me-2 text-dark" />
          Checkout
        </h2>

        <Row className="g-5">
          {/* LEFT SIDE – BILLING DETAILS */}
          <Col md={6}>
            <Card className="border-0 shadow-lg p-4 rounded-4 bg-white">
              <h4 className="fw-bold mb-4">
                <FaUser className="me-2 text-dark" />
                Billing Details
              </h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your complete address"
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select className="py-2">
                    <option>
                      <FaCreditCard /> Credit / Debit Card
                    </option>
                    <option>PayPal</option>
                    <option>Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="dark"
                  className="w-100 py-3 fw-semibold rounded-3 text-uppercase mt-3 shadow-sm"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT SIDE – ORDER SUMMARY */}
          <Col md={6}>
            <Card className="border-0 shadow-lg p-4 rounded-4 bg-white sticky-top">
              <h4 className="fw-bold mb-4 text-center text-uppercase">
                <FaTruck className="me-2 text-dark" />
                Order Summary
              </h4>

              {checkedItems && checkedItems.length > 0 ? (
                <>
                  {checkedItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3"
                    >
                      <div className="d-flex align-items-center">
                        <Image
                          src={item.image}
                          onError={handleImageError}
                          alt={item.name}
                          rounded
                          width="60"
                          height="60"
                          className="me-3 border"
                        />
                        <div>
                          <h6 className="fw-semibold mb-0">{item.name}</h6>
                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>
                      </div>
                      <span className="fw-bold text-dark">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="mt-3">
                    <Row className="mb-2">
                      <Col>Subtotal:</Col>
                      <Col className="text-end fw-bold">
                        ₱{subtotal.toFixed(2)}
                      </Col>
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
                  </div>
                </>
              ) : (
                <p className="text-muted text-center fs-6">
                  No items selected 🛒
                </p>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
