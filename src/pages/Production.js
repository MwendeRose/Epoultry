import React, { useEffect, useState } from 'react';
import './Production.css';

const Production = () => {
  const [productionData, setProductionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductionData = async () => {  
      try {
        const response = await fetch('/api/production'); 
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setProductionData(data);
      } catch (error) {
        console.error("Error fetching production data:", error); 
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductionData(); 

    const mockData = [
      { id: 1, date: '2024-07-26', eggsCollected: 250, feedConsumed: 100 },
      { id: 2, date: '2024-07-27', eggsCollected: 200, feedConsumed: 80 },
    ];

    const timer = setTimeout(() => {
      setProductionData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []); 

  if (loading) {
    return <div>Loading production data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="production-container">
      <h2>Egg Production</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Eggs Collected</th>
            <th>Feed Consumed (kg)</th>
          </tr>
        </thead>
        <tbody>
          {productionData.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.eggsCollected}</td>
              <td>{item.feedConsumed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Production;