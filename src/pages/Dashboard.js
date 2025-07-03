import React from 'react';
import bestHens from '../Assets/Besthens.webp';
import farmsVideo from '../Assets/Farmvideo.mp4';
import chicks from '../Assets/chicks.avif';
import eggs from '../Assets/eggs.avif';
import organicEggs from '../Assets/organic eggs.webp';
import ourFarms from '../Assets/our farm.webp';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="top-nav">
        <div className="logo">FARMS</div>
        <ul className="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="contact-info">
          <a href="tel:0114727285">123-456-7890</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Fresh Eggs for You <span>EVERYDAY!</span></h1>
          <p>Taste our Delicious and nutritious eggs</p>
          <button className="hero-btn">View All Products</button>
        </div>
        <img className="hero-image" src={chicks} alt="Chicks" />
      </section>

      <section className="quality-service">
        <h2>Quality Poultry Friendly Service</h2>
        <div className="service-items">
          <div className="service-item">
            <img src={bestHens} alt="Best Hens" />
            <h3>The Best Hens</h3>
          </div>
          <div className="service-item">
            <img src={organicEggs} alt="Organic Eggs" />
            <h3>Organic Eggs</h3>
          </div>
          <div className="service-item">
            <img src={ourFarms} alt="Our Farms" />
            <h3>Our Farms</h3>
          </div>
        </div>
      </section>

      <section className="highlight-section">
        <div className="highlight-item">
          <img src={eggs} alt="Eggs" />
          <h3>Eggs</h3>
        </div>
        <div className="highlight-video">
          <video src={farmsVideo} controls poster={eggs}>
            Your browser does not support the video tag.
          </video>
          <h3>Farms Video</h3>
        </div>
      </section>

      <section className="about-section">
        <h2>About Poultry Farm Company</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <button className="about-btn">View More</button>
      </section>

      <footer className="footer">
        <div className="footer-column">
          <h4>Poultry Farm</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Info</h4>
          <p>123 Main Street, Anytown</p>
          <p>Email: rsimba@kabarak.ac.ke</p>
          <p>Phone: 0114727285</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;