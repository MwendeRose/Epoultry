import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './processOrders.css';

const ProcessOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    { id: 1, product: 'Kienyeji Chicks', quantity: 200, status: 'Pending', customer: 'Alice Wanjiku', date: '2025-07-17' },
    { id: 2, product: 'Layers Feed', quantity: 50, status: 'Processing', customer: 'Green Hill Farm', date: '2025-07-16' },
    { id: 3, product: 'Broiler Feed', quantity: 100, status: 'Completed', customer: 'Peter Njoroge', date: '2025-07-15' },
    { id: 4, product: 'Egg Trays', quantity: 30, status: 'Pending', customer: 'Sunrise Poultry', date: '2025-07-17' },
  ]);

  const [activeTab, setActiveTab] = useState('view');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    alert(`Order #${orderId} is now ${newStatus}.`);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    alert('Order details updated successfully.');
  };

  const renderActions = (order) => {
    if (order.status === 'Pending') {
      return (
        <div className="action-buttons">
          <button className="approve" onClick={() => updateOrderStatus(order.id, 'Processing')}>Approve</button>
          <button className="reject" onClick={() => updateOrderStatus(order.id, 'Rejected')}>Reject</button>
        </div>
      );
    } else if (order.status === 'Processing') {
      return (
        <button className="complete" onClick={() => updateOrderStatus(order.id, 'Completed')}>Mark Completed</button>
      );
    } else {
      return <span className="status-msg">No Actions</span>;
    }
  };

  const renderTabContent = () => {
    if (activeTab === 'view') {
      return (
        <div className="content-section">
          <h2>📋 View Orders</h2>
          <p>Review all placed orders and their status at a glance.</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'process') {
      return (
        <div className="content-section">
          <h2>✅ Process Orders</h2>
          <p>Approve, reject or complete orders based on their current status.</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{renderActions(order)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === 'update') {
      return (
        <div className="content-section">
          <h2>✏️ Update Order</h2>
          <p>Edit order quantity or delivery date if needed for customer convenience.</p>
          <form onSubmit={handleUpdateSubmit}>
            <label>Order ID:
              <input type="number" placeholder="Order ID" required />
            </label>
            <label>New Delivery Date:
              <input type="date" required />
            </label>
            <label>New Quantity:
              <input type="number" required />
            </label>
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="farm-dashboard">
      <aside className="sidebar">
        <h3>🗂️ Order Manager</h3>
        <nav>
          <button onClick={() => setActiveTab('view')}>View Orders</button>
          <button onClick={() => setActiveTab('process')}>Process Orders</button>
          <button onClick={() => setActiveTab('update')}>Update Orders</button>
        </nav>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          &larr; Back to Dashboard
        </button>
      </aside>
      <main className="dashboard-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default ProcessOrders;
