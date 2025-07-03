import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage('Both email and password are required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', { 
                email, 
                password 
            });

            if (rememberMe) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }
            
            navigate('/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                {message && <div className="login-message">{message}</div>}
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    
                    <div className="form-options">
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    </div>
                    
                    <button type="submit" className="login-button">Log In</button>
                </form>
                
                <div className="register-prompt">
                    Don't have an account? <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;