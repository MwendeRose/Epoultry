// Feed.js
import React, { useEffect, useState } from 'react';
import './Feed.css';

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    // Replace with your actual data fetching logic (API call, etc.)

    // Mock Data (remove when backend is available)
    const mockData = [
      { id: 1, foodType: 'Starter', quantity: 50, cost: 250 },
      { id: 2, foodType: 'Grower', quantity: 30, cost: 150 },
      { id: 3, foodType: 'Finisher', quantity: 20, cost: 100 },
    ];

    // Simulate API call delay (optional)
    const timer = setTimeout(() => {
      setFeedData(mockData);
    }, 500);

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, []);

  useEffect(() => {
    // Calculate total spent whenever feedData changes
    const calculateTotalSpent = () => {
      let total = 0;
      feedData.forEach((item) => {
        total += item.cost;
      });
      return total;
    };

    setTotalSpent(calculateTotalSpent());
  }, [feedData]);

  const handlePurchase = () => {
    // Replace with your purchase logic (e.g., API call to update inventory)
    alert('Purchase initiated!'); // Placeholder
  };

  return (
    <div className="feed-container">
      <h2>Feed Consumption</h2>
      <table>
        <thead>
          <tr>
            <th>Food Type</th>
            <th>Quantity (kg)</th>
            <th>Cost (GHC)</th>
          </tr>
        </thead>
        <tbody>
          {feedData.map((item) => (
            <tr key={item.id}>
              <td>{item.foodType}</td>
              <td>{item.quantity}</td>
              <td>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary">
        <p>Total Spent: GHC {totalSpent}</p>
        <button onClick={handlePurchase}>Purchase Feed</button>
      </div>
    </div>
  );
};

export default Feed;