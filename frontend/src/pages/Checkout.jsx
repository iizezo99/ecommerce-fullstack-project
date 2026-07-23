import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOrderPlaced(true);
    setIsProcessing(false);
  };

  if (orderPlaced) {
    return (
      <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h2>
          <p style={{ marginBottom: '2rem', color: '#475569' }}>Thank you for your purchase! Your order is being processed.</p>
          <Link to="/products">
            <button className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="page-title">Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Shipping Information</h3>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <input type="text" placeholder="First Name" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Last Name" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              <input type="email" placeholder="Email" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db', gridColumn: '1 / -1' }} />
              <input type="text" placeholder="Address" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db', gridColumn: '1 / -1' }} />
              <input type="text" placeholder="City" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Zip Code" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Payment Information</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <input type="text" placeholder="Card Number" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
                <input type="text" placeholder="CVV" style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ position: 'sticky', top: '1rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Order Summary</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              {cart.items.map(item => (
                <div key={item._id || item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.1rem' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
            <Link to="/cart" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#3b82f6', textDecoration: 'none' }}>
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
