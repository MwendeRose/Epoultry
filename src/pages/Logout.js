// pages/Logout.js
import React from 'react';

const Logout = ({ handleLogout }) => {  // Receive handleLogout as a prop
  return (
    <div>
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Yes, Log Out</button> {/* Call the prop */}
    </div>
  );
};

export default Logout;