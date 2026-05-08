const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get dashboard stats (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const totalSalesResult = await db.query(
            `SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'Cancelled'`
        );
        const newOrdersResult = await db.query(
            `SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'`
        );
        const totalOrdersResult = await db.query(
            `SELECT COUNT(*) as count FROM orders`
        );
        const totalProductsResult = await db.query(
            `SELECT COUNT(*) as count FROM products`
        );
        const totalUsersResult = await db.query(
            `SELECT COUNT(*) as count FROM users WHERE role = 'customer'`
        );

        res.json({
            totalSales: parseFloat(totalSalesResult.rows[0].total),
            newOrders: parseInt(newOrdersResult.rows[0].count),
            totalOrders: parseInt(totalOrdersResult.rows[0].count),
            totalProducts: parseInt(totalProductsResult.rows[0].count),
            activeUsers: parseInt(totalUsersResult.rows[0].count),
            salesGrowth: '+12.5%'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
