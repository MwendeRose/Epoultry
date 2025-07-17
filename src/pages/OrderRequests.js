import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderRequest.css';

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [popup, setPopup] = useState('');

  const [activeChat, setActiveChat] = useState('Farm Manager');
  const [chatMessages, setChatMessages] = useState({
    'Farm Manager': ['Welcome to my poultry farm!'],
    'Accounting Manager': ['Your last invoice has been paid.'],
    'Customer': ['Thank you for your service!'],
  });
  const [chatInput, setChatInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        customer: 'John Doe',
        phone: '0700000001',
        email: 'john@example.com',
        address: 'Nairobi, Kenya',
        product: 'Kienyeji Eggs',
        quantity: 300,
        unitPrice: 15,
        status: 'Pending',
        requestCount: 2,
        date: '2025-07-16',
        deliveryMethod: 'Delivery Van',
        deliveryDate: '2025-07-18',
        notes: 'Deliver before 9AM',
        paymentStatus: 'Unpaid',
        invoiceNumber: 'INV001',
        deliveryInstructions: 'Leave at gate with guard.',
      },
    ];
    setOrders(mockOrders);
  }, []);

  const showPopup = (message) => {
    setPopup(message);
    setTimeout(() => setPopup(''), 2000);
  };

  const handleAddOrder = () => {
    const newOrder = {
      id: Date.now(),
      customer: 'New Customer',
      phone: '',
      email: '',
      address: '',
      product: '',
      quantity: 0,
      unitPrice: 0,
      status: 'Pending',
      requestCount: 1,
      date: new Date().toISOString().split('T')[0],
      deliveryMethod: '',
      deliveryDate: '',
      notes: '',
      paymentStatus: 'Unpaid',
      invoiceNumber: '',
      deliveryInstructions: '',
    };
    setOrders([newOrder, ...orders]);
    setSelectedOrder(newOrder);
    setEditForm(newOrder);
    setIsEditing(true);
    showPopup('New order added.');
  };

  const startEdit = (order) => {
    setEditForm(order);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setOrders((prev) => prev.map((o) => (o.id === editForm.id ? editForm : o)));
    setSelectedOrder(editForm);
    setIsEditing(false);
    showPopup('Order saved.');
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    showPopup(`Order marked as ${newStatus}.`);
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      setSelectedOrder(null);
      showPopup('Order deleted.');
    }
  };

  const downloadOrder = (order) => {
    const content = `ORDER CONFIRMATION

Customer:
- Name: ${order.customer}
- Phone: ${order.phone}
- Email: ${order.email}
- Address: ${order.address}

Order Details:
- Product: ${order.product}
- Quantity: ${order.quantity}
- Unit Price: KES ${order.unitPrice}
- Total Amount: KES ${order.unitPrice * order.quantity}
- Status: ${order.status}
- Requested On: ${order.date}
- Payment Status: ${order.paymentStatus}

Delivery:
- Method: ${order.deliveryMethod}
- Date: ${order.deliveryDate}
- Instructions: ${order.deliveryInstructions}

Notes:
${order.notes}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order_${order.id}.txt`;
    a.click();
    showPopup('Order downloaded.');
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages({
        ...chatMessages,
        [activeChat]: [...chatMessages[activeChat], `Supplier: ${chatInput}`],
      });
      setChatInput('');
      showPopup('Message sent.');
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Epoultry</h2>
        <button className="sidebar-btn" onClick={handleAddOrder}>➕ Add Order</button>
        <button className="sidebar-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
      </aside>

      <main className="content">
        <div className="orders-panel">
          <h2>📦 Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
                  <td>{order.status}</td>
                  <td>
                    <button onClick={() => setSelectedOrder(order)}>View</button>
                    <button onClick={() => handleStatusChange(order.id, 'Approved')}>Approve</button>
                    <button onClick={() => handleStatusChange(order.id, 'Rejected')}>Reject</button>
                    <button onClick={() => handleDelete(order.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="details-panel">
          <h2>📄 Order Details</h2>
          {selectedOrder && !isEditing ? (
            <div>
              {Object.entries(selectedOrder).map(([key, val]) =>
                key !== 'id' ? (
                  <p key={key}><strong>{key}:</strong> {val}</p>
                ) : null
              )}
              <button onClick={() => startEdit(selectedOrder)}>✏️ Edit</button>
              <button onClick={() => downloadOrder(selectedOrder)}>📥 Download</button>
            </div>
          ) : isEditing ? (
            <div>
              {Object.entries(editForm).map(([key, val]) =>
                key !== 'id' && key !== 'status' ? (
                  <div key={key}>
                    <label>{key}:</label>
                    <input value={val} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })} />
                  </div>
                ) : null
              )}
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <p>Select an order to view details.</p>
          )}
        </div>
      </main>

      <aside className="chat">
        <h2>💬 Chat</h2>
        <div className="chat-tabs">
          {['Farm Manager', 'Accounting Manager', 'Customer'].map((role) => (
            <button key={role} onClick={() => setActiveChat(role)}>{role}</button>
          ))}
        </div>
        <div className="chat-messages">
          {chatMessages[activeChat].map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send ➤</button>
      </aside>

      {popup && <div className="popup">{popup}</div>}
    </div>
  );
};

export default SupplierOrders;
