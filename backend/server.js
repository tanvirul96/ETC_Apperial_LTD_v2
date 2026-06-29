const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - Welcome message for the API
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to the ETC Apparel API', 
        status: 'Active',
        healthCheck: '/api/health'
    });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running', database: 'Supabase (PostgreSQL)' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`✅ ETC Apparel server running on http://localhost:${PORT}`);
        console.log(`🚀 Connection Mode: Supabase HTTPS API (Stable)`);
    });
}

module.exports = app;
