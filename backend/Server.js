require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Supply = require('./Supply');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/poultrydb';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['farmManager', 'supplier', 'customer', 'accounting'],
    required: true
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields including role are required' });
    }

    const validRoles = ['farmManager', 'supplier', 'customer', 'accounting'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ username, email, password, role });

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please login.'
    });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      redirectTo: '/dashboard',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

app.post('/api/farm-manager/supplies', async (req, res) => {
  try {
    const { item, available, sold, newIn, orders, customers } = req.body;

    const updated = await Supply.findOneAndUpdate(
      { item },
      { available, sold, newIn, orders, customers },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error saving supply' });
  }
});

app.get('/api/farm-manager/supply-details/:item', async (req, res) => {
  try {
    const item = req.params.item.toLowerCase();
    const supply = await Supply.findOne({ item });

    if (!supply) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(supply);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching supply' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
