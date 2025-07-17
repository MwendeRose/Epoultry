import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookNow.css';

const BookNow = () => {
  const navigate = useNavigate();

  const REQUIREMENTS =
    "Visitors must bring a national ID, school ID, or passport, and must wear farm garments like gumboots and overalls.";

  const [bookings, setBookings] = useState([]);
  const [visitorType, setVisitorType] = useState('');
  const [amount, setAmount] = useState(0);

  const [newBooking, setNewBooking] = useState({
    groupName: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    groupSize: '',
    proposedDate: '',
    purpose: '',
    specialRequests: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleVisitorTypeChange = (e) => {
    const type = e.target.value;
    setVisitorType(type);
    if (type === 'Adult') {
      setAmount(1000);
    } else if (type === 'Secondary School') {
      setAmount(10000);
    } else if (type === 'University') {
      setAmount(15000);
    } else {
      setAmount(0);
    }
  };

  const handleSubmitBooking = () => {
    if (
      !newBooking.groupName ||
      !newBooking.contactEmail ||
      !newBooking.proposedDate ||
      !visitorType
    ) {
      alert('Please fill in all required fields and select Visitor Type.');
      return;
    }

    const booking = {
      id: bookings.length + 1,
      ...newBooking,
      visitorType,
      amount,
      requirements: REQUIREMENTS,
      status: 'Pending',
      acceptedDate: null,
    };

    setBookings([...bookings, booking]);

    setNewBooking({
      groupName: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      groupSize: '',
      proposedDate: '',
      purpose: '',
      specialRequests: '',
    });
    setVisitorType('');
    setAmount(0);

    setSuccessMessage('Your booking request has been submitted!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleApprove = (id) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? {
            ...booking,
            status: 'Accepted',
            acceptedDate: new Date().toLocaleDateString(),
          }
        : booking
    );
    setBookings(updatedBookings);
  };

  return (
    <div className="book-now-wrapper">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <section className="hero-section">
        <h1>Book a Visit to Our Poultry Farm</h1>
        <p>
          Schools, universities, individuals — experience our modern farm through guided tours and hands-on sessions.
        </p>
      </section>

      <section className="form-section">
        <h2>Booking Form</h2>

        <div className="form-group">
          <label>Visitor Type*</label>
          <select value={visitorType} onChange={handleVisitorTypeChange}>
            <option value="">Select Type</option>
            <option value="Adult">Individual Adult</option>
            <option value="Secondary School">Secondary School Group</option>
            <option value="University">University Group</option>
          </select>
        </div>

        <div className="form-group">
          <label>Group/School Name*</label>
          <input
            type="text"
            name="groupName"
            value={newBooking.groupName}
            onChange={handleInputChange}
            placeholder="e.g., Greenfield High School"
          />
        </div>

        <div className="form-group">
          <label>Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={newBooking.contactPerson}
            onChange={handleInputChange}
            placeholder="Name of organizer"
          />
        </div>

        <div className="form-group">
          <label>Contact Email*</label>
          <input
            type="email"
            name="contactEmail"
            value={newBooking.contactEmail}
            onChange={handleInputChange}
            placeholder="example@email.com"
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={newBooking.contactPhone}
            onChange={handleInputChange}
            placeholder="+254 712 345 678"
          />
        </div>

        <div className="form-group">
          <label>Group Size</label>
          <input
            type="number"
            name="groupSize"
            value={newBooking.groupSize}
            onChange={handleInputChange}
            placeholder="e.g., 40 students"
          />
        </div>

        <div className="form-group">
          <label>Proposed Visit Date*</label>
          <input
            type="date"
            name="proposedDate"
            value={newBooking.proposedDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="fixed-info">
          <p><strong>Amount:</strong> KES {amount || '--'} (auto-calculated)</p>
          <p><strong>Requirements:</strong> {REQUIREMENTS}</p>
        </div>

        <div className="form-group">
          <label>Purpose of Visit</label>
          <textarea
            name="purpose"
            value={newBooking.purpose}
            onChange={handleInputChange}
            placeholder="Educational tour, research, team building..."
          />
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            name="specialRequests"
            value={newBooking.specialRequests}
            onChange={handleInputChange}
            placeholder="Any special arrangements or needs..."
          />
        </div>

        <button className="submit-btn" onClick={handleSubmitBooking}>
          Submit Booking
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </section>

      {bookings.length > 0 && (
        <section className="bookings-section">
          <h2>Submitted Bookings</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Group</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th>Amount (KES)</th>
                  <th>Requirements</th>
                  <th>Status</th>
                  <th>Accepted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.visitorType}</td>
                    <td>{b.groupName}</td>
                    <td>{b.contactPerson || '-'}</td>
                    <td>{b.contactEmail}</td>
                    <td>{b.contactPhone || '-'}</td>
                    <td>{b.groupSize || '-'}</td>
                    <td>{b.proposedDate}</td>
                    <td>{b.amount}</td>
                    <td>{b.requirements}</td>
                    <td>{b.status}</td>
                    <td>{b.acceptedDate || '-'}</td>
                    <td>
                      {b.status === 'Pending' && (
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(b.id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default BookNow;
