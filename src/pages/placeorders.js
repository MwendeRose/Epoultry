import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './placeorders.css';

const PlaceOrders = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: '',
    customer: '',
    phone: '',
    address: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Order submitted:', form);

    setSuccessMessage(`✅ Order placed for ${form.product}!`);

    setForm({
      product: '',
      customer: '',
      phone: '',
      address: ''
    });
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="place-orders-wrapper">
      <div className="place-orders-container">
        <div className="form-card">
          <button className="back-button" onClick={handleBack}>
            <FaArrowLeft className="back-icon" /> Back to Dashboard
          </button>

          <h1>🛒 Place a New Order</h1>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label>Product</label>
              <input
                type="text"
                name="product"
                value={form.product}
                onChange={handleChange}
                placeholder="e.g. Kienyeji Chicken"
                required
              />
            </div>

            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                name="customer"
                value={form.customer}
                onChange={handleChange}
                placeholder="Customer Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+2547XXXXXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Delivery Address"
                required
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Place Order</button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} E-Poultry. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PlaceOrders;
