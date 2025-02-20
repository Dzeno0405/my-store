import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/OrderStatus.css";

const OrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      setError("Please enter a valid order ID.");
      return;
    }
    
    setError("");
    
    // Placeholder order details (to be replaced with actual order tracking logic)
    const exampleOrder = {
      id: "123456",
      status: "Shipped",
      estimatedDelivery: "February 25, 2025",
      trackingNumber: "TRACK123456789",
    };

    // Simulate checking order status
    if (orderId === exampleOrder.id) {
      setOrderDetails(exampleOrder);
    } else {
      setOrderDetails(null);
      setError("Order not found. Please check your order ID.");
    }
  };

  return (
    <div className="order-status-container">
      <div className="logo-container">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="order-logo" />
        </Link>
      </div>

      <h2>Track Your Order</h2>
      <p>Please enter your order ID below to check its status.</p>

      <div className="order-input-container">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleTrackOrder}>Track Order</button>
      </div>

      {error && <p className="order-error">{error}</p>}

      {orderDetails && (
        <div className="order-details">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
          <p><strong>Tracking Number:</strong> {orderDetails.trackingNumber}</p>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
