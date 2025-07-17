import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningHub.css';

const LearningHub = () => {
  const navigate = useNavigate();

  return (
    <div className="learning-hub-wrapper">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <section className="hero">
        <h1>Learning Hub & Training Services</h1>
        <p>
          We empower learners, farmers, and professionals with practical skills in modern poultry farming.
        </p>
      </section>

      <section className="training-details">
        <h2>Our Training Programs</h2>
        <ul>
          <li>🐣 Brooding and chick management</li>
          <li>🐓 Layers & broiler management</li>
          <li>🌱 Feed formulation & nutrition</li>
          <li>💉 Poultry health & vaccination</li>
          <li>📊 Record keeping & farm economics</li>
          <li>🚜 Farm setup & management best practices</li>
        </ul>
      </section>

      <section className="why-train">
        <h2>Why Train With Us?</h2>
        <p>
          ✔️ Hands-on sessions with our expert team <br/>
          ✔️ Real farm demonstrations <br/>
          ✔️ Certification upon completion <br/>
          ✔️ Tailored modules for schools, colleges & groups <br/>
          ✔️ Flexible booking and affordable rates
        </p>
      </section>

      <section className="call-to-action">
        <h2>Ready to Upskill?</h2>
        <p>
          Reach out today to reserve your training slot. Individual sessions, school programs, and corporate workshops available.
        </p>
        <div className="contact-info">
          <p>📧 Email: training@epoultry.com</p>
          <p>📞 Phone: +254 712 345 678</p>
        </div>
        <button className="cta-btn" onClick={() => navigate('/book-now')}>
          Book Training Session
        </button>
      </section>
    </div>
  );
};

export default LearningHub;
