const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all orders (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        // We will mock this until the orders table is fully defined
        res.json([
            { id: 1, order_number: '#ETC-9921', customer: 'Elena Vance', amount: 340.00, status: 'Processing', created_at: new Date() },
            { id: 2, order_number: '#ETC-9918', customer: 'Marcus Thorne', amount: 1120.50, status: 'Shipped', created_at: new Date() },
            { id: 3, order_number: '#ETC-9915', customer: 'Aria Sterling', amount: 89.00, status: 'Delivered', created_at: new Date() }
        ]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
