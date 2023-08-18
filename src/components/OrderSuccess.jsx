import React, { useEffect } from 'react'
import '../styles/OrderSuccess.css'; // Import the CSS file
import { Link, useLocation } from 'react-router-dom';
const env = import.meta.env;

const OrderSuccess = () => {

  const location = useLocation();
  const orderDetails = location.state.order;
  const orderTotal = location.state.cartTotal;

  useEffect(() => {
    const deleteCart = async () => {
    }
  }, [])

  return (
    <div className="order-success">
      <div className="order-header">
        <h2>Order Successfully Placed!</h2>
        <p>Thank you for choosing our bookstore.</p>
      </div>
      <div className="order-details">
        <p>Your order has been successfully placed and is being processed.</p>
      </div>
      <div>
        <p>Order ID: {orderDetails.id}</p>
        <p>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
        <p>Order Total: ${orderTotal}</p>
      </div>
      <Link to="/" className="home-button">Continue Shopping</Link>
    </div>
  );
}

export default OrderSuccess