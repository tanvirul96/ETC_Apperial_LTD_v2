const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get dashboard stats (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        // We use .select('*', { count: 'exact', head: true }) for counts
        // For sum, we use a rpc or just select and sum (simpler for now if records are few, or use raw sql if needed)
        // Since Supabase JS doesn't have a direct .sum(), we use .select('total_amount')
        
        const { data: salesData, error: salesError } = await supabase
            .from('orders')
            .select('total_amount')
            .neq('status', 'Cancelled');

        const { count: newOrders, error: newOrdersError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Pending');

        const { count: totalOrders, error: totalOrdersError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true });

        const { count: totalProducts, error: totalProductsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        const { count: totalUsers, error: totalUsersError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'customer');

        const totalSales = salesData ? salesData.reduce((acc, curr) => acc + (parseFloat(curr.total_amount) || 0), 0) : 0;

        res.json({
            totalSales,
            newOrders: newOrders || 0,
            totalOrders: totalOrders || 0,
            totalProducts: totalProducts || 0,
            activeUsers: totalUsers || 0,
            salesGrowth: '+12.5%'
        });
    } catch (err) {
        console.error('Stats Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
