import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './trackorders.css';

const ordersData = [
  {
    id: 'ORD-001',
    product: 'Kienyeji Chicken',
    customer: 'Alice Wanjiku',
    phone: '+254712345678',
    address: 'Nairobi, Kenya',
    date: '2025-07-10',
    status: 'In Transit',
    expectedDelivery: '2025-07-18',
    trackingLink: 'https://tracking.example.com/ORD-001',
    notes: 'Handle with care. Deliver early morning.'
  },
  {
    id: 'ORD-002',
    product: 'Broiler Chicken',
    customer: 'Brian Otieno',
    phone: '+254798765432',
    address: 'Kisumu, Kenya',
    date: '2025-07-09',
    status: 'Delivered',
    expectedDelivery: '2025-07-14',
    trackingLink: 'https://tracking.example.com/ORD-002',
    notes: 'Left at the reception desk.'
  },
  {
    id: 'ORD-003',
    product: 'Tray of Eggs',
    customer: 'Fatuma Yusuf',
    phone: '+254701234567',
    address: 'Mombasa, Kenya',
    date: '2025-07-08',
    status: 'Pending',
    expectedDelivery: '2025-07-20',
    trackingLink: 'https://tracking.example.com/ORD-003',
    notes: 'Customer requested weekend delivery.'
  }
];

const getStatusClass = (status) => {
  switch (status) {
    case 'In Transit':
      return 'status in-transit';
    case 'Delivered':
      return 'status delivered';
    case 'Pending':
      return 'status pending';
    default:
      return 'status';
  }
};

const TrackOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleDetails = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const filteredOrders = ordersData.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.includes(searchTerm)
  );

  return (
    <div className="track-orders">
      <div className="top-bar">
        <Link to="/Dashboard" className="back-link">← Back to Dashboard</Link>
      </div>

      <h1>Track Your Orders</h1>
      <p className="sub-heading">Easily check the status and details of your orders.</p>

      <input
        type="text"
        placeholder="Search by Order ID, Customer Name or Phone"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="orders">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div className="order-card" key={order.id}>
              <header className="order-header">
                <h2>{order.product}</h2>
                <span className={getStatusClass(order.status)}>{order.status}</span>
              </header>
              <div className="order-body">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Order Date:</strong> {order.date}</p>
                <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
              </div>

              <footer className="order-footer">
                <button onClick={() => toggleDetails(order.id)} className="details-btn">
                  {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                </button>
                <a href={order.trackingLink} target="_blank" rel="noreferrer">Tracking Link</a>
              </footer>

              {expandedOrderId === order.id && (
                <div className="order-details">
                  <p><strong>Special Notes:</strong> {order.notes}</p>
                  <p><strong>Tracking URL:</strong> <a href={order.trackingLink} target="_blank" rel="noreferrer">{order.trackingLink}</a></p>
                  <p>Additional details could go here...</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-orders">
            <p>No orders found. Please check your search or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
