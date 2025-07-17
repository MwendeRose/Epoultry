import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import homeImage from '../Assets/Home.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      const user = response.data.user;

      if (response.data.success) {
        if (!user.role || user.role !== role) {
          setMessage(`This account is not registered as "${role}". Your account is registered as "${user.role}".`);
          setLoading(false);
          return;
        }

        // Store login data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');

        // Optional message before redirect
        setMessage(
          <span>
            Login successful! Redirecting... or
            <a
              href="/dashboard"
              style={{
                marginLeft: '5px',
                color: '#1890ff',
                textDecoration: 'underline',
                fontWeight: '500',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              go to dashboard now
            </a>
          </span>
        );

        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Login failed');
      } else if (error.request) {
        setMessage('No response from server');
      } else {
        setMessage('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-image-section">
        <img src={homeImage} alt="Poultry Farm" className="login-side-image" />
        <div className="image-overlay-text">
          <h2>Premium Poultry Solutions</h2>
          <p>Quality eggs and poultry products</p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-form-container">
          <h2>Login to Your Account</h2>
          {message && <div className="login-message">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <label>Login As</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">-- Select Role --</option>
                <option value="farmManager">Farm Manager</option>
                <option value="supplier">Supplier</option>
                <option value="customer">Customer</option>
                <option value="accounting">Accounting</option>
              </select>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="register-prompt">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
