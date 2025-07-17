import React, { useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 101, customer: 'Lene Poultry', description: '50 Broiler Chicks', dateReceived: '2024-07-15', amount: 2500.00, balance: 0.00 },
    { id: 102, customer: 'Allan Mule', description: '20 Layers Feed Bags', dateReceived: '2024-07-10', amount: 12000.00, balance: 3000.00 },
    { id: 103, customer: 'Jane K.', description: 'Egg supply - 15 trays', dateReceived: '2024-07-12', amount: 4500.00, balance: 0.00 },
    { id: 104, customer: 'Pruebo Farm', description: 'Organic Fertilizer - 5 tons', dateReceived: '2024-07-14', amount: 18000.00, balance: 5000.00 },
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    description: '',
    dateReceived: '',
    amount: '',
    balance: '',
  });

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.amount) {
      alert('Customer and Amount are required.');
      return;
    }

    const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;

    setOrders([
      ...orders,
      {
        id: newId,
        ...newOrder,
        amount: parseFloat(newOrder.amount),
        balance: parseFloat(newOrder.balance) || 0,
      },
    ]);

    setNewOrder({
      customer: '',
      description: '',
      dateReceived: '',
      amount: '',
      balance: '',
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Customer Orders</h2>
        <button className="add-sales-btn">+ Add Sales</button>
      </div>

      <div className="search-bar">
        <label>
          Show
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          entries
        </label>
        <label>
          Search:
          <input type="text" placeholder="Search orders..." />
        </label>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Order Details</th>
            <th>Date</th>
            <th>Amount (KES)</th>
            <th>Balance (KES)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.description}</td>
              <td>{order.dateReceived}</td>
              <td>{order.amount.toFixed(2)}</td>
              <td>{order.balance.toFixed(2)}</td>
              <td>
                <button className="action-btn receipt">Receipt</button>
                <button className="action-btn update">Update</button>
                <button className="action-btn delete" onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-order-section">
        <h3>New Order</h3>
        <div className="add-order-form">
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={newOrder.customer}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Order Details"
            value={newOrder.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dateReceived"
            value={newOrder.dateReceived}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount (KES)"
            value={newOrder.amount}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="balance"
            placeholder="Balance (KES)"
            value={newOrder.balance}
            onChange={handleInputChange}
          />
          <button className="submit-btn" type="button" onClick={handleAddOrder}>
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
