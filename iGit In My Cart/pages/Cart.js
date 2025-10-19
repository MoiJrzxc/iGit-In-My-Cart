import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/Navbar";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import "../styles/Cart.css";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items: cartItems, addItem, removeItem, clearCart, getTotal } = useCart();

  // Local state to track selected items for checkbox
  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.map(item => ({ id: item.id, selected: false }))
  );

  const handleSelect = (id) => {
    setSelectedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedItems(prev => prev.map(item => ({ ...item, selected: checked })));
  };

  const handleQuantityChange = (id, amount) => {
    const item = cartItems.find(i => i.id === id);
    if (item) addItem(item, amount); // Updates quantity in context
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(item => {
      if (item.selected) removeItem(item.id);
    });
    setSelectedItems(prev => prev.filter(item => !item.selected));
  };

  const allSelected = selectedItems.length > 0 && selectedItems.every(item => item.selected);

  const subtotal = cartItems
    .filter(item => selectedItems.find(s => s.id === item.id && s.selected))
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // Sync selectedItems when cartItems change (new items added from ProductDetail)
  React.useEffect(() => {
    setSelectedItems(prev => {
      const ids = cartItems.map(item => item.id);
      // Add new items not in selectedItems yet
      const newSelected = ids
        .filter(id => !prev.some(p => p.id === id))
        .map(id => ({ id, selected: false }));
      // Keep old ones
      return [...prev, ...newSelected];
    });
  }, [cartItems]);

  return (
    <>
      <AppNavbar />
      <div className="container cart-container">
        <div className="cart-header">
          <div className="back-arrow" onClick={() => navigate(-1)}>
            <BsArrowLeft size={20} />
            <span className="fw-semibold">Cart</span>
          </div>
          {cartItems.length > 0 && (
            <div className="trash-icon" onClick={handleDeleteSelected}>
              <BsTrash size={22} />
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center my-5">
            <div style={{ fontSize: "4rem" }}>😔</div>
            <p className="fs-5">Your cart is feeling empty... give it some sugar</p>
            <button className="btn btn-dark" onClick={() => navigate("/")}>
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <div className="list-group cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="list-group-item cart-item">
                  <div className="cart-item-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.find(s => s.id === item.id)?.selected || false}
                      onChange={() => handleSelect(item.id)}
                    />
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="mb-1">{item.name}</p>
                      <p className="mb-0 text-muted">${item.price}</p>
                    </div>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="select-all">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
                <span>Select All</span>
              </div>
              <div className="subtotal">
                <span className="fw-bold">
                  Subtotal: <span className="text-success">${subtotal}</span>
                </span>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      const selected = cartItems.filter(item =>
                        selectedItems.find(s => s.id === item.id && s.selected)
                      );
                      if (selected.length === 0) {
                        alert("Please select at least one product to checkout.");
                        return;
                      }
                      navigate("/checkout", { state: { selectedItems: selected } });
                    }}
                  >
                    Check Out
                  </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
