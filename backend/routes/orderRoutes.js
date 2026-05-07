const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all orders (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const result = await db.query('SELECT id, order_number, customer_name as customer, total_amount as amount, status, created_at FROM orders ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new order
router.post('/', verifyToken, async (req, res) => {
    const { order_number, customer_name, total_amount, user_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO orders (order_number, customer_name, total_amount, user_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [order_number, customer_name, total_amount, user_id, 'Pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
