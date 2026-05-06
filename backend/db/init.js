const db = require('./index');

async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createProductsTable = `
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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(50) UNIQUE NOT NULL,
      user_id INT REFERENCES users(id),
      customer_name VARCHAR(200) NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createNewsTable = `
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      category VARCHAR(50),
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log("Initializing Database Schema...");
    await db.query(createUsersTable);
    await db.query(createProductsTable);
    await db.query(createOrdersTable);
    await db.query(createNewsTable);
    console.log("Database initialized successfully.");

    // Seed dummy data if tables are empty
    const productCheck = await db.query('SELECT COUNT(*) FROM products');
    if (productCheck.rows[0].count === '0') {
      console.log("Seeding initial products...");
      await db.query(`
        INSERT INTO products (sku, name, category, price, stock, status) VALUES 
        ('ETC-CS-204', 'Signature Cashmere Crewneck', 'Signature Knits', 325.00, 42, 'Active'),
        ('ETC-WC-102', 'Double-Breasted Wool Coat', 'Outerwear', 840.00, 15, 'Active'),
        ('ETC-LT-305', 'Linen Trousers', 'Essentials', 210.00, 0, 'Out of Stock')
      `);
    }

  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    process.exit();
  }
}

createTables();
