import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // use your real logic here
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
