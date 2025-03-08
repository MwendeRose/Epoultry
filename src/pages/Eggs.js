// Egg.js (React Component)
import React, { useEffect, useState } from 'react';
import './Eggs.css';

const EggRecords = () => {
  const [eggData, setEggData] = useState({
    ordered: 0,
    available: 0,
    chicks: 0,
    layers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    // Replace with your actual data fetching logic (API call, etc.)

    // Mock data for demonstration (remove when you have a backend)
    const mockData = {
      ordered: 500,
      available: 300,
      chicks: 150,
      layers: 200,
    };

    // Simulate API call delay (optional)
    const timer = setTimeout(() => {
      setEggData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, []);

  if (loading) {
    return <div>Loading egg records...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="egg-records-container">
      <h2>Egg Production and Inventory</h2>
      <div className="record-grid">
        <div className="record-item">
          <h3>Eggs Ordered</h3>
          <p>{eggData.ordered}</p>
        </div>
        <div className="record-item">
          <h3>Eggs Available</h3>
          <p>{eggData.available}</p>
        </div>
        <div className="record-item">
          <h3>Chicks Hatched</h3>
          <p>{eggData.chicks}</p>
        </div>
        <div className="record-item">
          <h3>Layer Hens</h3>
          <p>{eggData.layers}</p>
        </div>
      </div>
    </div>
  );
};

export default EggRecords;