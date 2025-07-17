import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import './Careers.css';
import './Footer.css';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Careers = () => {
  const navigate = useNavigate(); // ✅ initialize navigate
  const [selectedJob, setSelectedJob] = useState(null);

  const jobListings = [
    {
      id: 1,
      title: 'Farm Operations Manager',
      location: 'Nairobi, Kenya',
      description:
        'Responsible for overseeing daily poultry farm operations, ensuring animal welfare, and coordinating farm staff.',
    },
    {
      id: 2,
      title: 'Poultry Sales Executive',
      location: 'Nakuru, Kenya',
      description:
        'Drive sales of poultry products, manage customer accounts, and develop new business opportunities.',
    },
    {
      id: 3,
      title: 'Veterinary Technician',
      location: 'Eldoret, Kenya',
      description:
        'Assist with vaccination programs, monitor flock health, and support farm biosecurity measures.',
    },
  ];

  return (
    <>
      <div className="careers-container">
        {/* ✅ Back Button */}
        <button className="back-button" onClick={() => navigate('/Dashboard')}>
          &larr; Back to Dashboard
        </button>

        <h1>Join Our Team</h1>
        <p>Explore current job openings and apply to become part of our growing poultry farming family.</p>

        <div className="careers-content">
          <div className="job-listings">
            <h2>Open Positions</h2>
            {jobListings.map((job) => (
              <div
                key={job.id}
                className={`job-item ${selectedJob && selectedJob.id === job.id ? 'active' : ''}`}
                onClick={() => setSelectedJob(job)}
              >
                <h3>{job.title}</h3>
                <p>{job.location}</p>
              </div>
            ))}
          </div>

          <div className="job-details">
            {selectedJob ? (
              <>
                <h2>{selectedJob.title}</h2>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p>{selectedJob.description}</p>

                <h3>Apply Now</h3>
                <form className="apply-form">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Your Email" required />
                  <textarea placeholder="Tell us why you're a good fit"></textarea>
                  <button type="submit">Submit Application</button>
                </form>
              </>
            ) : (
              <p>Select a job to see details and apply.</p>
            )}
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>Epoultry</h3>
            <p>Empowering sustainable poultry farming across Kenya and beyond.</p>
            <p><strong>Location:</strong> Exsan Hse, Enterprise Rd, Nairobi</p>
            <p><strong>Email:</strong> rsimba@kabarak.ac.ke</p>
            <p><strong>Phone:</strong> +254 797 419 279</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/careers">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Epoultry. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Careers;
