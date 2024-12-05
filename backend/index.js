const express = require('express');
const sequelize = require('./config/db'); // Import database configuration
const User = require('./models/User'); // Import User model
const Product = require('./models/Product'); // Import Product model
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const productRoutes = require('./routes/productRoutes'); // Import product routes

const app = express();
app.use(express.json()); // Middleware to parse JSON
// Middleware for handling product routes
app.use('/api/products', productRoutes);
// Middleware for handling routes
app.use('/api/auth', authRoutes); // Register auth routes before syncing DB

// Test endpoint
app.get('/', (req, res) => res.send('Backend is working!'));

// Log incoming requests to check if the server is receiving them
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Log method and URL of incoming requests
    next();
});

const PORT = 3000;

// Sync models and start server
sequelize.sync({ alter: true }) // Sync all models with the database
    .then(() => {
        console.log('Models synced successfully with the database!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Error syncing database:', err));
