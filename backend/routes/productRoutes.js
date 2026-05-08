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
        const { sku, name, category, price, stock, status, image_url, description } = req.body;
        const newProduct = await db.query(
            'INSERT INTO products (sku, name, category, price, stock, status, image_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [sku, name, category, price, stock, status || 'Active', image_url || null, description || null]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a product (Admin only)
router.put('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { name, category, price, stock, status, image_url, description } = req.body;
        const stockNum = parseInt(stock);
        const autoStatus = status || (stockNum > 0 ? 'Active' : 'Out of Stock');

        const updated = await db.query(
            `UPDATE products 
             SET name=$1, category=$2, price=$3, stock=$4, status=$5, image_url=$6, description=$7, updated_at=CURRENT_TIMESTAMP
             WHERE id=$8 RETURNING *`,
            [name, category, price, stockNum, autoStatus, image_url || null, description || null, req.params.id]
        );
        if (updated.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a product (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const result = await db.query('DELETE FROM products WHERE id=$1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
