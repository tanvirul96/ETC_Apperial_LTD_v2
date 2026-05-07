-- ETC Apparel LTD - Database Schema
-- Optimized for Admin Dashboard & E-commerce Functionality

-- 1. Users Table (Authentication & Roles)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer', -- 'admin' or 'customer'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table (Inventory Management)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active',
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table (Sales Tracking)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT REFERENCES users(id),
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(100),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Shipped', 'Delivered', 'Cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. News & Events Table (Editorial Content)
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(100),
    category VARCHAR(50), -- 'Corporate', 'Collection Launch', 'Press'
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'Published', -- 'Draft', 'Published', 'Scheduled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Seed Initial Admin User (Default: admin@etc.com / password123)
-- Note: In a real production environment, the password_hash should be generated using bcrypt.
-- For local testing: password123 (hashed)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Master Curator', 'admin@etc.com', '$2b$10$YourHashedPasswordHere', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 6. Seed Sample Products
INSERT INTO products (sku, name, category, price, stock, status) VALUES 
('ETC-CS-204', 'Signature Cashmere Crewneck', 'Signature Knits', 325.00, 42, 'Active'),
('ETC-WC-102', 'Double-Breasted Wool Coat', 'Outerwear', 840.00, 15, 'Active'),
('ETC-LT-305', 'Linen Trousers', 'Essentials', 210.00, 0, 'Out of Stock')
ON CONFLICT (sku) DO NOTHING;
