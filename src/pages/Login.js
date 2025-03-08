import React, { useState } from 'react';
import './Login.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password) {
            setMessage('Password is required!');
            return;
        }

        // Replace with your actual authentication logic (e.g., API call)
        if (username === 'admin' && password === 'password') {
            // Redirect to home page (using react-router-dom for navigation)
            window.location.href = '/home'; // Or use react-router's history.push('/home')
        } else {
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div className="login-container">
            <h2>EPMS: Admin Login</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;