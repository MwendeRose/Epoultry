import React from 'react';
import './Production.css';

import logo from '../Assets/logo_icon.jpg';
import eggs from '../Assets/eggs.avif';
import eggIcon from '../Assets/egg_icon.png';
import femaleChick from '../Assets/femalechick.jfif';
import maleChick from '../Assets/malechick.jfif';
import manureIcon from '../Assets/manure_icon.png';
import feedIcon from '../Assets/feed_icon.jpg';
import medicineIcon from '../Assets/medicine_icon.jpg';
import farmVideo from '../Assets/Farmvideo.mp4';

import facebookIcon from '../Assets/Facebook.png';
import instagramIcon from '../Assets/instagram.jpg';
import linkedinIcon from '../Assets/linkedin.jpg';

const Production = () => {
  return (
    <div className="production-page">
      <header className="production-header">
        <img src={logo} alt="Farm Logo" className="logo" />
        <h1>Farm Production Overview</h1>
        <p>Discover how we produce high-quality poultry products and keep our farm sustainable.</p>
      </header>

      <div className="production-grid">
        <div className="production-item">
          <img src={eggIcon} alt="Egg Icon" />
          <h3>Egg Production</h3>
          <p className="item-description">
            We produce farm-fresh eggs daily with organic feed and free-range systems.
          </p>
        </div>

        <div className="production-item">
          <img src={eggs} alt="Eggs" />
          <h3>Fresh Eggs</h3>
          <p className="item-description">
            Our eggs are sorted and packed with care to ensure top quality for our customers.
          </p>
        </div>

        <div className="production-item">
          <img src={femaleChick} alt="Female Chick" />
          <h3>Female Chicks</h3>
          <p className="item-description">
            We raise healthy female chicks for layers and broilers with best breeding practices.
          </p>
        </div>

        <div className="production-item">
          <img src={maleChick} alt="Male Chick" />
          <h3>Male Chicks</h3>
          <p className="item-description">
            Our male chicks are bred for meat production with high welfare standards.
          </p>
        </div>

        <div className="production-item">
          <img src={manureIcon} alt="Manure Icon" />
          <h3>Organic Manure</h3>
          <p className="item-description">
            We recycle waste into organic manure to enrich farm soils sustainably.
          </p>
        </div>

        <div className="production-item">
          <img src={feedIcon} alt="Feed Icon" />
          <h3>Animal Feed</h3>
          <p className="item-description">
            Our poultry feed is locally sourced, balanced, and supports healthy growth.
          </p>
        </div>

        <div className="production-item">
          <img src={medicineIcon} alt="Medicine Icon" />
          <h3>Animal Health</h3>
          <p className="item-description">
            We ensure our poultry stays healthy with regular vaccinations and check-ups.
          </p>
        </div>

        <div className="production-item video-item">
          <video src={farmVideo} controls></video>
          <h3>Farm Operations</h3>
          <p className="item-description">
            Watch how we manage our daily farm tasks — from feeding to egg collection.
          </p>
        </div>
      </div>

      <footer className="production-footer">
        <p>Follow Us:</p>
        <div className="socials">
          <img src={facebookIcon} alt="Facebook" />
          <img src={instagramIcon} alt="Instagram" />
          <img src={linkedinIcon} alt="LinkedIn" />
        </div>
      </footer>
    </div>
  );
};

export default Production;
