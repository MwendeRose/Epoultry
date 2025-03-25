require("dotenv").config();
const express = require("express");
//const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/poultrydb";

//app.use(cors());
//app.use(express.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date
});

const User = mongoose.model("User", userSchema);

app.post("/api/register", async (req, res) => {
    console.log("Incoming Request:", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1d" });
        res.json({ token, user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post("/api/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000;
        await user.save();

        res.json({ message: "Password reset link sent" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post("/api/reset-password", async (req, res) => {
    try {
        const { email, token, password } = req.body;
        const user = await User.findOne({ email, resetToken: token });

        if (!user || Date.now() > user.resetTokenExpiry) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
