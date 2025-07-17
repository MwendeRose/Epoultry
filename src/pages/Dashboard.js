import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="dashboard-header compact">
        <h1>POULTRY FARMING SYSTEM</h1>
        <div className="header-controls">
          <nav>
            <ul className="top-nav">
              <li><Link to="/foods">Foods</Link></li>
              <li><Link to="/Learninghub">LearningHub</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/BookNow">BookNow</Link></li>
            </ul>
          </nav>
          <button className="back-button" onClick={() => navigate('/')}>
            &larr; Back to Home
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard Home</Link></li>
            <li><Link to="/ProcessOrders">Process Orders</Link></li>
            <li><Link to="/ManageInventory">Manage Inventory</Link></li>
            <li><Link to="/ManageSupplies">Manage Supplies</Link></li>
            <li><Link to="/GenerateReports">Generate Reports</Link></li>
            <li><Link to="/OrderRequests">Order Requests</Link></li>
            <li><Link to="/TrackOrders">Track Orders</Link></li>
            <li><Link to="/shop">Shop Now</Link></li>
            <li><Link to="/PlaceOrders">Place Orders</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </aside>

        <main className="dashboard-content">
          <section className="hero">
            <h2>Enable Shared Prosperity Through Sustainable Food Production</h2>
            <p>
              We work to ensure everyone has access to safe, healthy, and sustainable food while creating wealth for our communities.
            </p>
          </section>

          <section className="cards">
            <div className="card">
              <h3>Farm to Farm</h3>
              <p>Trace our chicks from hatch to your poultry farm.</p>
              <button onClick={() => navigate('/farm-to-farm')}>Learn More</button>
            </div>

            <div className="card">
              <h3>Farm to Family</h3>
              <p>Healthy kuku meals from our farms to your table.</p>
              <button onClick={() => navigate('/farm-to-family')}>View Product Range</button>
            </div>

            <div className="card">
              <h3>Careers</h3>
              <p>Join a team of passionate professionals.</p>
              <button onClick={() => navigate('/careers')}>Explore Opportunities</button>
            </div>
          </section>
        </main>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-spread">
          <div className="footer-info">
            <p><strong>Location:</strong> Exsan Hse, Enterprise Rd, Nairobi</p>
            <p><strong>Email:</strong> rsimba@kabarak.ac.ke</p>
            <p><strong>Phone:</strong> +254 797 419 279</p>
          </div>

          <div className="footer-links">
            <p><a href="#">Terms & Conditions</a> | <a href="#">Privacy Policy</a></p>
            <p>© 2025 Epoultry</p>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Twitter">Tw</a>
            <a href="#" aria-label="LinkedIn">In</a>
            <a href="#" aria-label="Instagram">Ig</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
