import React, { useState } from 'react';
import './Manure.css';

const Manure = () => {
    const [orders, setOrders] = useState([
        { id: 1, supplier: 'Organic Farms', type: 'Cow Manure', quantity: '100 kg', date: '2024-08-01', price: '$50', status: 'Delivered' },
        { id: 2, supplier: 'Green Earth Co.', type: 'Chicken Manure', quantity: '50 kg', date: '2024-07-28', price: '$30', status: 'Pending' },
        // ... more orders
    ]);

    const [newOrder, setNewOrder] = useState({
        supplier: '',
        type: '',
        quantity: '',
        date: '',
        price: '',
        status: 'Pending', // Default status
    });

    const handleInputChange = (e) => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };

    const handleAddOrder = () => {
        setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
        setNewOrder({
            supplier: '',
            type: '',
            quantity: '',
            date: '',
            price: '',
            status: 'Pending',
        }); // Clear form
    };

    const handleUpdateStatus = (id, status) => {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: status } : order
        )
      );
    };

    return (
        <div className="manure-container">
            <h1>Manure Orders</h1>

            <div className="add-order-form">
                <h2>Place New Order</h2>
                <input type="text" name="supplier" placeholder="Supplier" value={newOrder.supplier} onChange={handleInputChange} />
                <input type="text" name="type" placeholder="Manure Type" value={newOrder.type} onChange={handleInputChange} />
                <input type="text" name="quantity" placeholder="Quantity" value={newOrder.quantity} onChange={handleInputChange} />
                <input type="date" name="date" placeholder="Order Date" value={newOrder.date} onChange={handleInputChange} />
                <input type="text" name="price" placeholder="Price" value={newOrder.price} onChange={handleInputChange} />
                <button onClick={handleAddOrder}>Place Order</button>
            </div>

            <table className="manure-orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>{/* Add actions column */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.supplier}</td>
                            <td>{order.type}</td>
                            <td>{order.quantity}</td>
                            <td>{order.date}</td>
                            <td>{order.price}</td>
                            <td>{order.status}</td>
                            <td className="actions">
                                {/* Dropdown for status update */}
                                <select
                                    value={order.status}
                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manure;