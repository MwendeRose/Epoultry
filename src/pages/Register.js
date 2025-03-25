import axios from "axios";
import React, { useState } from "react";
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await axios.post("http://localhost:5000/register", { username, email, password });
            alert("Registration Successful! Please login.");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
            <div className="background-image"></div>
        </div>
    );
};

export default Register;
