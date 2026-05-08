const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all orders (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('id, order_number, customer:customer_name, customer_email, amount:total_amount, status, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(orders);
    } catch (err) {
        console.error('Fetch Orders Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Create a new order (Authenticated user)
router.post('/', verifyToken, async (req, res) => {
    const { order_number, customer_name, customer_email, total_amount, user_id } = req.body;
    try {
        const { data: newOrder, error } = await supabase
            .from('orders')
            .insert([{ 
                order_number, 
                customer_name, 
                customer_email, 
                total_amount, 
                user_id: user_id || null, 
                status: 'Pending' 
            }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Create Order Error:', err.message);
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
        const { data: updatedOrder, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ message: 'Order not found' });
            throw error;
        }
        res.json(updatedOrder);
    } catch (err) {
        console.error('Update Order Status Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Delete an order (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .delete()
            .eq('id', req.params.id)
            .select('id')
            .single();

        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ message: 'Order not found' });
            throw error;
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Delete Order Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
