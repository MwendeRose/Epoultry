import React, { useEffect, useState } from 'react';
import './Consumption.css';

const Consumption = () => {
  const [consumptionData, setConsumptionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {

    const mockData = [
      { id: 1, date: '2024-07-26', feedType: 'Starter', quantityConsumed: 50 },
      { id: 2, date: '2024-07-27', feedType: 'Grower', quantityConsumed: 30 },
    ];

    const timer = setTimeout(() => {
      setConsumptionData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Loading consumption data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="consumption-container">
      <h2>Feed Consumption Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Feed Type</th>
            <th>Quantity Consumed (kg)</th>
          </tr>
        </thead>
        <tbody>
          {consumptionData.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.feedType}</td>
              <td>{record.quantityConsumed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consumption;