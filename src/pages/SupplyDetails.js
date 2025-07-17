import React, { useState } from 'react';
import './SupplyDetails.css';

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
  medicine: medicineImg
};

const EnterSupplyDetails = () => {
  const [form, setForm] = useState({
    item: '',
    category: 'poultry',
    newIn: '',
    unitPrice: '',
    supplier: '',
    location: ''
  });

  const [availableSupplies, setAvailableSupplies] = useState([
    {
      item: 'eggs',
      category: 'poultry',
      available: 1200,
      unitPrice: 10,
      supplier: 'Golden Poultry',
      location: 'Kiambu'
    },
    {
      item: 'feed',
      category: 'feed',
      available: 500,
      unitPrice: 1500,
      supplier: 'FeediGrow Ltd',
      location: 'Nakuru'
    },
    {
      item: 'medicine',
      category: 'medicine',
      available: 100,
      unitPrice: 500,
      supplier: 'VetCare Kenya',
      location: 'Thika'
    }
  ]);

  const [sellQty, setSellQty] = useState({});

  const handleAddSupply = () => {
    const { item, category, newIn, unitPrice, supplier, location } = form;

    if (!item || !newIn || !unitPrice || !supplier || !location) {
      alert('Please fill all required fields.');
      return;
    }

    const index = availableSupplies.findIndex(s => s.item === item && s.category === category);

    if (index >= 0) {
      const updated = [...availableSupplies];
      updated[index].available += Number(newIn);
      updated[index].unitPrice = unitPrice;
      updated[index].supplier = supplier;
      updated[index].location = location;
      setAvailableSupplies(updated);
    } else {
      setAvailableSupplies(prev => [
        ...prev,
        {
          item,
          category,
          available: Number(newIn),
          unitPrice,
          supplier,
          location
        }
      ]);
    }

    setForm({ item: '', category: 'poultry', newIn: '', unitPrice: '', supplier: '', location: '' });
  };

  const handleSell = (index) => {
    const qty = Number(sellQty[index]);
    if (!qty || qty <= 0) return;

    const updated = [...availableSupplies];

    if (updated[index].available >= qty) {
      updated[index].available -= qty;
      if (updated[index].available === 0) {
        updated.splice(index, 1);
      }
      setAvailableSupplies(updated);
      setSellQty({ ...sellQty, [index]: '' });
    } else {
      alert('Not enough items to sell.');
    }
  };

  return (
    <div className="supply-entry-flex">
      <div className="entry-section">
        <h2>Enter Supply Details</h2>

        <div className="form-group">
          <label>Category</label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="poultry">Poultry</option>
            <option value="feed">Feed</option>
            <option value="medicine">Medicine</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Item</label>
          <select
            value={form.item}
            onChange={e => setForm({ ...form, item: e.target.value })}
          >
            <option value="">Select item</option>
            {Object.keys(productImages).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>New In Quantity</label>
          <input
            type="number"
            value={form.newIn}
            onChange={e => setForm({ ...form, newIn: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Unit Price</label>
          <input
            type="number"
            value={form.unitPrice}
            onChange={e => setForm({ ...form, unitPrice: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Supplier</label>
          <input
            value={form.supplier}
            onChange={e => setForm({ ...form, supplier: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <button className="submit-btn" onClick={handleAddSupply}>
          Add to Available Supplies
        </button>
      </div>

      <div className="supply-overview">
        <h2>Available Supplies</h2>
        {availableSupplies.length > 0 ? (
          <table className="supply-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Category</th>
                <th>Available</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Location</th>
                <th>Sell</th>
              </tr>
            </thead>
            <tbody>
              {availableSupplies.map((s, index) => (
                <tr key={index}>
                  <td>{s.item}</td>
                  <td>
                    <img
                      src={productImages[s.item] || ''}
                      alt={s.item}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{s.category}</td>
                  <td>{s.available}</td>
                  <td>{s.unitPrice}</td>
                  <td>{s.supplier}</td>
                  <td>{s.location}</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Qty"
                      value={sellQty[index] || ''}
                      onChange={(e) => setSellQty({ ...sellQty, [index]: e.target.value })}
                    />
                    <button onClick={() => handleSell(index)}>Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No supplies available.</p>
        )}
      </div>
    </div>
  );
};

export default EnterSupplyDetails;
