const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Same key used in login

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // Attach user info (from token) to the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
