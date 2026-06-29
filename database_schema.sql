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

-- 3. Orders Table (Sales Tracking with Delivery Details)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(100),
    shipping_address TEXT NOT NULL,
    phone VARCHAR(30) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Shipped', 'Delivered', 'Cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order Items Table (M-to-M link connecting Orders to Products)
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. News & Events Table (Editorial Content)
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

-- 6. Contacts / Inquiries Table (Customer Message Box)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Unread', -- 'Unread', 'Read', 'Resolved'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Seed Default Admin User (admin@etc.com / password123)
INSERT INTO users (name, email, password_hash, role) 
VALUES ('Master Curator', 'admin@etc.com', '$2b$10$Usc81uR6eH.t7mQ3vE7DquF.T4PjUun2UvL/g8nZ05g6BwP/kK3U6', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 8. Seed Sample Products
INSERT INTO products (sku, name, category, price, stock, status) VALUES 
('ETC-CS-204', 'Signature Cashmere Crewneck', 'Signature Knits', 325.00, 42, 'Active'),
('ETC-WC-102', 'Double-Breasted Wool Coat', 'Outerwear', 840.00, 15, 'Active'),
('ETC-LT-305', 'Linen Trousers', 'Essentials', 210.00, 0, 'Out of Stock')
ON CONFLICT (sku) DO NOTHING;

