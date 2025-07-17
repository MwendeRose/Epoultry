import React, { useState, useEffect } from 'react';
import './ManageInventory.css';
import { useNavigate } from 'react-router-dom';

export default function ManageInventory() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    unit: '',
    quantity: 0,
    minStock: 0,
  });

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: 'Layer Mash',
        category: 'Feed',
        unit: 'kg',
        quantity: 500,
        minStock: 100,
        lastUpdated: new Date().toLocaleDateString(),
      },
      {
        id: 2,
        name: 'Broiler Starter',
        category: 'Feed',
        unit: 'kg',
        quantity: 200,
        minStock: 50,
        lastUpdated: new Date().toLocaleDateString(),
      },
      {
        id: 3,
        name: 'Dewormer',
        category: 'Medicine',
        unit: 'litres',
        quantity: 30,
        minStock: 10,
        lastUpdated: new Date().toLocaleDateString(),
      },
    ];
    setInventory(initialData);
  }, []);

  const addItem = () => {
    if (
      !newItem.name ||
      !newItem.category ||
      !newItem.unit ||
      newItem.quantity <= 0 ||
      newItem.minStock < 0
    ) {
      alert('Please fill all fields correctly!');
      return;
    }
    const item = {
      id: Date.now(),
      ...newItem,
      lastUpdated: new Date().toLocaleDateString(),
    };
    setInventory([...inventory, item]);
    setNewItem({ name: '', category: '', unit: '', quantity: 0, minStock: 0 });
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 0) {
      alert('Quantity cannot be negative.');
      return;
    }
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(quantity),
              lastUpdated: new Date().toLocaleDateString(),
            }
          : item
      )
    );
  };

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <h1>Manage Inventory</h1>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </header>

      <div className="inventory-container">
        <div className="inventory-list">
          {inventory.length === 0 ? (
            <p>No inventory items available.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Min Stock</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.minStock}</td>
                    <td>
                      {item.quantity < item.minStock ? (
                        <span className="low-stock">Low Stock</span>
                      ) : (
                        <span className="in-stock">OK</span>
                      )}
                    </td>
                    <td>{item.lastUpdated}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(item.id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="add-form">
          <h3>Add New Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Feed">Feed</option>
            <option value="Medicine">Medicine</option>
            <option value="Equipment">Equipment</option>
          </select>
          <input
            type="text"
            placeholder="Unit (e.g., kg, pcs)"
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Minimum Stock Level"
            min="0"
            value={newItem.minStock}
            onChange={(e) =>
              setNewItem({ ...newItem, minStock: Number(e.target.value) })
            }
          />
          <button onClick={addItem}>➕ Add Item</button>
        </div>
      </div>
    </div>
  );
}
