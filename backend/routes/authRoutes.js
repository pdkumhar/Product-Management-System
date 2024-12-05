const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

// User Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to register user', details: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
});

module.exports = router;
