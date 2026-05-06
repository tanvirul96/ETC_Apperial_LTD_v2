const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all products (Public)
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a product (Admin only)
router.post('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { sku, name, category, price, stock, status } = req.body;
        
        const newProduct = await db.query(
            'INSERT INTO products (sku, name, category, price, stock, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [sku, name, category, price, stock, status || 'Active']
        );
        
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
