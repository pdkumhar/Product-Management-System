const express = require('express');
const Product = require('../models/Product'); // Import Product model
const authenticateToken = require('../middleware/authMiddleware'); // Import JWT middleware

const router = express.Router();

// Create Product
router.post('/', authenticateToken, async (req, res) => {
    const { name, description, price } = req.body;
    const userId = req.user.id; // Use the ID from the logged-in user

    try {
        const product = await Product.create({
            userId,
            name,
            description,
            price
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product', details: err.message });
    }
});

// Get Products for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        const products = await Product.findAll({ where: { userId } });

        res.json({ products });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
});

// Update Product
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findOne({ where: { id, userId } });

        if (!product) {
            return res.status(404).json({ error: 'Product not found or not owned by user' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        await product.save();

        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product', details: err.message });
    }
});

// Delete Product
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const product = await Product.findOne({ where: { id, userId } });

        if (!product) {
            return res.status(404).json({ error: 'Product not found or not owned by user' });
        }

        await product.destroy();

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product', details: err.message });
    }
});

module.exports = router; // Ensure to export the router at the end of the file
