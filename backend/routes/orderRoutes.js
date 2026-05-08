const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all orders (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, order_number, customer_name as customer, customer_email, total_amount as amount, status, created_at FROM orders ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new order (Authenticated user)
router.post('/', verifyToken, async (req, res) => {
    const { order_number, customer_name, customer_email, total_amount, user_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO orders (order_number, customer_name, customer_email, total_amount, user_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [order_number, customer_name, customer_email, total_amount, user_id || null, 'Pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update order status (Admin only)
router.patch('/:id/status', [verifyToken, verifyAdmin], async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    try {
        const result = await db.query(
            'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
            [status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete an order (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const result = await db.query('DELETE FROM orders WHERE id=$1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
