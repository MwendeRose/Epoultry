import React from 'react';
import './Service.css';

import eggs from '../Assets/eggs.avif';
import femaleChick from '../Assets/femalechick.jfif';
import maleChick from '../Assets/malechick.jfif';
import manureIcon from '../Assets/manure_icon.png';
import feedIcon from '../Assets/feed_icon.jpg';
import organicEggs from '../Assets/organic eggs.webp';

const services = [
  {
    id: 1,
    image: eggs,
    title: 'Egg Supply & Packaging',
    description:
      'Reliable supply of fresh farm eggs, carefully packaged and ready for distribution to your doorstep or market.',
  },
  {
    id: 2,
    image: femaleChick,
    title: 'Chick Brooding Service',
    description:
      'Expert brooding services for healthy growth of your chicks with proper care, warmth, and vaccinations.',
  },
  {
    id: 3,
    image: maleChick,
    title: 'Poultry Meat Production',
    description:
      'Quality meat production management services for healthy, market-ready broilers and cockerels.',
  },
  {
    id: 4,
    image: manureIcon,
    title: 'Organic Manure Supply',
    description:
      'Provision of nutrient-rich organic manure to boost your farm’s soil fertility and yield naturally.',
  },
  {
    id: 5,
    image: feedIcon,
    title: 'Feed Formulation & Supply',
    description:
      'Custom poultry feed formulation and supply to ensure optimal nutrition and flock productivity.',
  },
  {
    id: 6,
    image: organicEggs,
    title: 'Organic Farming Consultancy',
    description:
      'Guidance and consultancy for setting up and maintaining organic poultry systems and sustainable farming.',
  },
];

const Service = () => {
  return (
    <div className="service-page">
      <header className="service-header">
        <h1>Our Farm Services</h1>
        <p>Empowering farmers with quality solutions for healthy flocks and sustainable production.</p>
      </header>

      <div className="service-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <footer className="service-footer">
        <p>Contact us today to book a service or learn more about how we can help your farm thrive!</p>
      </footer>
    </div>
  );
};

export default Service;
