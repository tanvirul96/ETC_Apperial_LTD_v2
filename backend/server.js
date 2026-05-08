const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use('/frontend', express.static(path.join(__dirname, '..', 'frontend')));

// Redirect root to frontend
app.get('/', (req, res) => {
    res.redirect('/frontend/index.html');
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running', database: 'Supabase (PostgreSQL)' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`✅ ETC Apparel server running on http://localhost:${PORT}`);
    console.log(`📦 Database: Supabase (wcbuhijjpljnrphhoyny.supabase.co)`);
});
