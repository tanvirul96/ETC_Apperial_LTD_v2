const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { validateFields } = require('../utils/validator');

const orderRules = {
  customer_name: { required: true, min: 2, max: 100, label: 'Name' },
  customer_email: { required: true, isEmail: true, label: 'Email' },
  shipping_address: { required: true, min: 10, max: 500, label: 'Shipping Address' },
  phone: { required: true, isPhone: true, label: 'Phone' },
  total_amount: { required: true, type: 'number', min: 0.01, label: 'Total Amount' }
};

// Get all orders (Admin only) - Detailed view
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    id,
                    quantity,
                    unit_price,
                    products (name, image_url)
                )
            `)
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
    const { 
        order_number, 
        customer_name, 
        customer_email, 
        shipping_address, 
        phone, 
        total_amount, 
        items 
    } = req.body;

    const validation = validateFields(req.body, orderRules);
    if (!validation.isValid) {
        return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: { items: 'Your shopping cart must contain at least one item.' } 
        });
    }

    try {
        // 1. Create the Order
        const { data: newOrder, error: orderError } = await supabase
            .from('orders')
            .insert([{ 
                order_number, 
                customer_name, 
                customer_email, 
                shipping_address,
                phone,
                total_amount, 
                user_id: req.user.id, 
                status: 'Pending' 
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create Order Items and update stock
        const orderItems = items.map(item => ({
            order_id: newOrder.id,
            product_id: item.id,
            quantity: item.qty,
            unit_price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Decrement Stock for each item
        for (const item of items) {
            const { data: product } = await supabase
                .from('products')
                .select('stock')
                .eq('id', item.id)
                .single();

            if (product) {
                const newStock = Math.max(0, product.stock - item.qty);
                await supabase
                    .from('products')
                    .update({ 
                        stock: newStock,
                        status: newStock === 0 ? 'Out of Stock' : 'Active'
                    })
                    .eq('id', item.id);
            }
        }

        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Create Order Error:', err.message);
        res.status(500).json({ message: 'Order processing failed', error: err.message });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', [verifyToken, verifyAdmin], async (req, res) => {
    const { status } = req.body;
    try {
        const { data: updatedOrder, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) throw error;
        res.json(updatedOrder);
    } catch (err) {
        console.error('Update Order Status Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Delete an order (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Delete Order Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
