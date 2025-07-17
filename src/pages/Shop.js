import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './Shop.css';

import Orders from './Orders';
import Payroll from './Payroll';
import Production from './Production';
import Products from './Products';
import Service from './Service';
import Mortality from './Mortality';

const Shop = () => {
  const [activePage, setActivePage] = useState('Orders');
  const navigate = useNavigate(); // ✅ Create navigate

  const renderPage = () => {
    switch (activePage) {
      case 'Orders': return <Orders />;
      case 'Payroll': return <Payroll />;
      case 'Production': return <Production />;
      case 'Products': return <Products />;
      case 'Service': return <Service />;
      case 'Mortality': return <Mortality />;
      default: return <Orders />;
    }
  };

  return (
    <div className="shop-wrapper">
      <aside className="shop-sidebar">
        <button 
          className="return-button"
          onClick={() => navigate('/dashboard')} // ✅ Navigate back
        >
          ← Return to Dashboard
        </button>

        <h2>Shop Now</h2>
        <ul>
          {[
            'Orders',
            'Payroll',
            'Production',
            'Products',
            'Service',
            'Mortality',
          ].map((name) => (
            <li
              key={name}
              className={activePage === name ? 'active' : ''}
              onClick={() => setActivePage(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="shop-main">
        <div className="shop-content">
          {renderPage()}
        </div>

        <footer className="shop-footer">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Supplying quality poultry products and services across Kenya.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@epoultry.com</p>
            <p>Phone: +254 712 345 678</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <p>Facebook | Instagram | X</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Shop;
