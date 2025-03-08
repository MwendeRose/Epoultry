import React, { useState } from 'react';
import './Orders.css'; // Import the CSS file

const App = () => {
  const [orders, setOrders] = useState([
    { id: 33, customer: 'lene', description: 'fgh', dateReceived: '2023-01-27', amount: 200.00, balance: 0.00 },
    { id: 34, customer: 'Allan Mule', description: '', dateReceived: '0000-00-00', amount: 0.00, balance: 0.00 },
    { id: 35, customer: 'Jene', description: 'Eges', dateReceived: '2023-09-04', amount: 50.00, balance: 30.00 },
    { id: 36, customer: 'Pruebo', description: 'Huevo', dateReceived: '2023-09-09', amount: 200.00, balance: 0.00 },
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    description: '',
    dateReceived: '',
    amount: 0.00,
    balance: 0.00,
  });

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewOrder({ ...newOrder, dateReceived: e.target.value });
  };

  const handleAddOrder = () => {
    setOrders([
      ...orders,
      {
        id: orders.length + 1,
        ...newOrder,
      },
    ]);
    setNewOrder({
      customer: '',
      description: '',
      dateReceived: '',
      amount: 0.00,
      balance: 0.00,
    });
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="container">
      <h1>VIEW ORDERS</h1>
      <button className="add-sales">Add Sales</button>

      <div className="search-entries">
        <label htmlFor="entries">
          Show
          <select name="entries" id="entries">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </label>
        <label htmlFor="search">
          Search:
          <input type="text" name="search" id="search" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Description</th>
            <th>Date Received</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Action</th>
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
                <button className="receipt">Receipt</button>
                <button className="update">Update</button>
                <button className="delete" onClick={() => handleDelete(order.id)}>
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Order</h2>
      <form>
        <input type="text" name="customer" placeholder="Customer" value={newOrder.customer} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={newOrder.description} onChange={handleInputChange} />
        <label htmlFor="dateReceived">Date Received:</label>
        <input type="date" id="dateReceived" name="dateReceived" value={newOrder.dateReceived} onChange={handleDateChange} />
        <input type="number" name="amount" placeholder="Amount" value={newOrder.amount} onChange={handleInputChange} step="0.01" />
        <input type="number" name="balance" placeholder="Balance" value={newOrder.balance} onChange={handleInputChange} step="0.01" />
        <button type="button" onClick={handleAddOrder}>
          Add Order
        </button>
      </form>
    </div>
  );
};

export default App;