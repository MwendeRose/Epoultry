import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setMessage('Password is required!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            localStorage.setItem('token', response.data.token);
            navigate('/src/App.js'); // Redirect to App.js or the main application
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid email or password.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember"> Remember me</label>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <p><a href="/forgot-password">Forgot your password?</a></p>
                <p>Don't have an account? <a href="/register">Register Now</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
