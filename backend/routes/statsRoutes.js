const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get dashboard stats (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        // Mock data for the dashboard UI
        res.json({
            totalSales: 142890.00,
            salesGrowth: '+12.5%',
            newOrders: 248,
            activeUsers: 1204
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
