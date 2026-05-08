const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all products (Public)
router.get('/', async (req, res) => {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(products);
    } catch (err) {
        console.error('Fetch Products Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Create a product (Admin only)
router.post('/', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { sku, name, category, price, stock, status, image_url, description } = req.body;
        
        // Ensure numeric types
        const priceNum = parseFloat(price);
        const stockNum = parseInt(stock);

        const { data: newProduct, error } = await supabase
            .from('products')
            .insert([{ 
                sku: sku || `ETC-${Date.now()}`, 
                name, 
                category, 
                price: priceNum, 
                stock: stockNum, 
                status: status || 'Active', 
                image_url: image_url || null, 
                description: description || null 
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase Insert Error:', error);
            throw error;
        }
        res.json(newProduct);
    } catch (err) {
        console.error('Create Product Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Update a product (Admin only)
router.put('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { name, category, price, stock, status, image_url, description } = req.body;
        const stockNum = parseInt(stock);
        const autoStatus = status || (stockNum > 0 ? 'Active' : 'Out of Stock');

        const { data: updatedProduct, error } = await supabase
            .from('products')
            .update({ 
                name, 
                category, 
                price, 
                stock: stockNum, 
                status: autoStatus, 
                image_url: image_url || null, 
                description: description || null, 
                updated_at: new Date().toISOString()
            })
            .eq('id', req.params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ message: 'Product not found' });
            throw error;
        }
        res.json(updatedProduct);
    } catch (err) {
        console.error('Update Product Error:', err.message);
        res.status(500).send('Server error');
    }
});

// Delete a product (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .delete()
            .eq('id', req.params.id)
            .select('id')
            .single();

        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ message: 'Product not found' });
            throw error;
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Delete Product Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
