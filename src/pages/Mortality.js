import React, { useEffect, useState } from 'react';
import './Mortality.css';

const Mortality = () => {
  const [mortalityData, setMortalityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {

    const mockData = [
      { id: 1, date: '2024-07-26', birdsLost: 5 },
      { id: 2, date: '2024-07-27', birdsLost: 2 },
    ];

    const timer = setTimeout(() => {
      setMortalityData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <div>Loading mortality data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mortality-container">
      <h2>Bird Mortality Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Birds Lost</th>
          </tr>
        </thead>
        <tbody>
          {mortalityData.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.birdsLost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mortality;