import React from 'react';
import bestHens from '../Assets/Besthens.webp';
import farmsVideo from '../Assets/Farmvideo.mp4';
import chicks from '../Assets/chicks.avif';
import eggs from '../Assets/eggs.avif';
import organicEggs from '../Assets/organic eggs.webp';
import ourFarms from '../Assets/our farm.webp';

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: '10px' }}>
      <nav className="top-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div className="logo" style={{ fontSize: '10px', fontWeight: 'bold' }}>FARMS</div>
        <ul className="nav-links" style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
          <li><a href="/about" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
          <li><a href="/services" style={{ textDecoration: 'none', color: '#333' }}>Services</a></li>
          <li><a href="/blog" style={{ textDecoration: 'none', color: '#333' }}>Blog</a></li>
          <li><a href="/contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</a></li>
        </ul>
        <div className="contact-info" style={{ color: '#ff6600' }}>
          <a href="tel:0114727285" style={{ color: '#ff6600', textDecoration: 'none' }}>123-456-7890</a>
        </div>
      </nav>

      <section className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', backgroundColor: '#fff9f0', textAlign: 'center' }}>
        <div className="hero-content">
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Fresh Eggs for You <span style={{ color: '#ff6600' }}>EVERYDAY!</span></h1>
          <p>Taste our Delicious and nutritious eggs</p>
          <button className="hero-btn" style={{ padding: '10px 20px', backgroundColor: '#ff6600', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>View All Products</button>
        </div>
        <img className="hero-image" src={chicks} alt="Chicks" style={{ maxWidth: '60%', height: 'auto', borderRadius: '10px', marginTop: '20px' }} />
      </section>

      <section className="quality-service" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2>Quality Poultry Friendly Service</h2>
        <div className="service-items" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div className="service-item" style={{ textAlign: 'center' }}>
            <img src={bestHens} alt="Best Hens" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>The Best Hens</h3>
          </div>
          <div className="service-item" style={{ textAlign: 'center' }}>
            <img src={organicEggs} alt="Organic Eggs" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>Organic Eggs</h3>
          </div>
          <div className="service-item" style={{ textAlign: 'center' }}>
            <img src={ourFarms} alt="Our Farms" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
            <h3>Our Farms</h3>
          </div>
        </div>
      </section>c

      <section className="highlight-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '50px 20px', backgroundColor: '#fff9f0' }}>
        <div className="highlight-item" style={{ textAlign: 'center' }}>
          <img src={eggs} alt="Eggs" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
          <h3>Eggs</h3>
        </div>
        <div className="highlight-video" style={{ textAlign: 'center' }}>
          <video src={farmsVideo} controls poster={eggs} style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}>
            Your browser does not support the video tag.
          </video>
          <h3>Farms Video</h3>
        </div>
      </section>

      <section className="about-section" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2>About Poultry Farm Company</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <button className="about-btn" style={{ padding: '10px 20px', backgroundColor: '#ff6600', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>View More</button>
      </section>

      <footer className="footer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
        <div className="footer-column" style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Poultry Farm</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</a></li>
            <li><a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-column" style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/faq" style={{ color: '#fff', textDecoration: 'none' }}>FAQ</a></li>
            <li><a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a></li>
          </ul>
        </div>
        <div className="footer-column" style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Contact Info</h4>
          <p style={{ margin: '5px 0' }}>123 Main Street, Anytown</p>
          <p style={{ margin: '5px 0' }}>Email: rsimba@kabarak.ac.ke</p>
          <p style={{ margin: '5px 0' }}>Phone:0114727285</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;