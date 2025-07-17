import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageSupplies.css';

import eggImg from '../Assets/egg_icon.png';
import chickImg from '../Assets/chicks.avif';
import broilerImg from '../Assets/broiler.jfif';
import layerImg from '../Assets/layers.jfif';
import maleImg from '../Assets/malechick.jfif';
import femaleImg from '../Assets/femalechick.jfif';
import manureImg from '../Assets/manure_icon.png';
import feedImg from '../Assets/feed_icon.jpg';
import medicineImg from '../Assets/medicine_icon.jpg';

const productImages = {
  eggs: eggImg,
  chicks: chickImg,
  broilers: broilerImg,
  layers: layerImg,
  male: maleImg,
  female: femaleImg,
  manure: manureImg,
  feed: feedImg,
  medicine: medicineImg,
};

const ManageSupplies = () => {
  const [supply, setSupply] = useState({ item: '', quantity: '' });
  const [errors, setErrors] = useState({});
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/farm-manager/supply-history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Error fetching supply history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const validate = () => {
    const errs = {};
    if (!supply.item) errs.item = 'Item is required';
    if (!supply.quantity || isNaN(supply.quantity) || Number(supply.quantity) <= 0) {
      errs.quantity = 'Enter a valid quantity';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const sendSupplyRequest = async () => {
    if (!validate()) return;

    try {
      const res = await fetch('http://localhost:5000/api/farm-manager/supply-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(supply),
      });

      if (!res.ok) throw new Error('Request failed');

      alert('Supply request sent successfully!');
      setSupply({ item: '', quantity: '' });
      fetchHistory();
    } catch (error) {
      console.error('Request error:', error);
      alert('Failed to send request.');
    }
  };

  return (
    <div className="manage-supplies-page">
      <header className="supplies-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>ePoultry - Supply Management</h1>
        <p>Request and manage essential supplies below.</p>
      </header>

      <section className="gallery-section">
        <h2>Select Product Type</h2>
        <div className="image-gallery">
          {Object.entries(productImages).map(([key, img]) => (
            <div
              key={key}
              className={`image-card ${supply.item === key ? 'selected' : ''}`}
              onClick={() => {
                setSupply({ ...supply, item: key });
                window.open(`/supply-details/${key}`, '_blank');
              }}
            >
              <img src={img} alt={key} />
              <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="supply-form-section">
        <h2>Request Supplies</h2>
        <div className="supply-form">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={supply.quantity}
              onChange={(e) => setSupply({ ...supply, quantity: e.target.value })}
              placeholder="e.g., 100"
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </div>

          <button className="send-btn" onClick={sendSupplyRequest}>
            Send Request
          </button>
        </div>
      </section>

      <section className="supply-history-section">
        <h2>Supply Request History</h2>
        {history.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>
                    <img src={productImages[entry.item]} alt={entry.item} className="record-img" />
                    {entry.item}
                  </td>
                  <td>{entry.quantity}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-history">No supply requests found.</p>
        )}
      </section>
    </div>
  );
};

export default ManageSupplies;
