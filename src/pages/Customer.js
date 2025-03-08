import React, { useState } from 'react';
import '../pages/Customer.css';

function Customer() {
  const [customerName, setCustomerName] = useState('');
  const [order, setOrder] = useState('');
  const [balance, setBalance] = useState(0);
  const [farmRecordings, setFarmRecordings] = useState('');
  const [orderStatus, setOrderStatus] = useState('pending'); 
  const [customers, setCustomers] = useState([]); 

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleAddCustomer = () => {
    if (customerName.trim() !== "") { 
      const newCustomer = {
        name: customerName,
        order: order,
        balance: parseFloat(balance) || 0, 
        farmRecordings: farmRecordings,
        orderStatus: orderStatus,
      };

      setCustomers([...customers, newCustomer]); 
      setCustomerName('');
      setOrder('');
      setBalance(0);
      setFarmRecordings('');
      setOrderStatus('pending');
    } else {
      alert("Customer name cannot be empty.");
    }
  };


  const handleStatusChange = (index, status) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].orderStatus = status;
    setCustomers(updatedCustomers);
  }

  return (
    <div className="customer-container">
      <h2>Customer Records</h2>
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={customerName} onChange={(e) => handleInputChange(e, setCustomerName)} />
      </div>
      <div className="input-group">
        <label htmlFor="order">Order:</label>
        <input type="text" id="order" value={order} onChange={(e) => handleInputChange(e, setOrder)} />
      </div>
      <div className="input-group">
        <label htmlFor="balance">Balance:</label>
        <input type="number" id="balance" value={balance} onChange={(e) => handleInputChange(e, setBalance)} />
      </div>
      <div className="input-group">
        <label htmlFor="farmRecordings">Farm Recordings:</label>
        <textarea id="farmRecordings" value={farmRecordings} onChange={(e) => handleInputChange(e, setFarmRecordings)}></textarea>
      </div>

      <button onClick={handleAddCustomer}>Add Customer</button>

      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Order</th>
            <th>Balance</th>
            <th>Farm Recordings</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.order}</td>
              <td>{customer.balance}</td>
              <td>{customer.farmRecordings}</td>
              <td>
                <select value={customer.orderStatus} onChange={(e) => handleStatusChange(index, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button onClick={() => { // Add a delete button or other actions
                  const updatedCustomers = customers.filter((_, i) => i !== index);
                  setCustomers(updatedCustomers);
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;