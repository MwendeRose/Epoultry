import React, { useEffect, useState } from 'react';
import './Sales.css';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => { 
      try {
        const response = await fetch('/api/sales'); 
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData(); 

    const mockData = [
      { id: 1, date: '2024-07-26', product: 'Eggs', quantity: 150, price: 5 },
      { id: 2, date: '2024-07-27', product: 'Birds', quantity: 20, price: 200 },
    ];

    const timer = setTimeout(() => {
      setSalesData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); 
  }, []); 
  if (loading) {
    return <div>Loading sales data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="sales-container">
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price (GHC)</th>
            <th>Total (GHC)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.date}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.quantity * sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;