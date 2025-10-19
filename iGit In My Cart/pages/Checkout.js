import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppNavbar from "../components/Navbar"; // adjust path if needed
import "../styles/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];

  // Address state
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    postalCode: "",
    city: "",
  });

  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressLabel, setAddressLabel] = useState(""); // Added state for Home/Work
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      alert("No items selected to order.");
      return;
    }
    alert("Order placed successfully!");
    navigate("/");
  };

  // Calculate subtotal
  const subtotal = selectedItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <AppNavbar />

      <div className="container checkout-container">
        {/* Back Button */}
        <button className="btn btn-link back-btn" onClick={() => navigate(-1)}>
          &larr; Checkout
        </button>

        {/* Login Prompt */}
        <div className="login-prompt">
          Already have an account?{" "}
          <button className="btn btn-dark btn-sm">Log in</button>
        </div>

        {/* Address Section */}
        <div className="checkout-section">
          <h5>Address</h5>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={address.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Street, Barangay"
            name="street"
            value={address.street}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City, Province"
            name="city"
            value={address.city}
            onChange={handleChange}
          />

          {/* Default Address Checkbox */}
          <div className="default-address-toggle">
            <span>Set as default address</span>
            <input
                type="checkbox"
                checked={defaultAddress}
                onChange={() => setDefaultAddress(!defaultAddress)}
             />
            </div>

          {/* Address Labels */}
          <div className="address-labels">
            <button
              type="button"
              className={addressLabel === "work" ? "selected" : ""}
              onClick={() => setAddressLabel("work")}
            >
              Work
            </button>
            <button
              type="button"
              className={addressLabel === "home" ? "selected" : ""}
              onClick={() => setAddressLabel("home")}
            >
              Home
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-section">
          <h5>Order Summary</h5>
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            selectedItems.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="order-info">
                  <p>{item.name}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Payment Methods */}
        <div className="checkout-section">
          <h5>Payment Methods</h5>
          <div className="payment-options">
            <button
              className={paymentMethod === "cod" ? "selected" : ""}
              onClick={() => setPaymentMethod("cod")}
            >
              Cash on delivery
            </button>
            <button
              className={paymentMethod === "online" ? "selected" : ""}
              onClick={() => setPaymentMethod("online")}
            >
              Online Bank
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="checkout-section payment-details">
          <h5>Payment Details</h5>
          <p>Merchandise Subtotal: ${subtotal}</p>
          <p>Shipping: $0.00</p>
          <hr />
          <p className="fw-bold">Total Payment: ${subtotal}</p>
        </div>

        {/* Place Order */}
        <div className="place-order-container">
          <span className="total-text">Total: ${subtotal}</span>
          <button className="btn btn-dark place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
