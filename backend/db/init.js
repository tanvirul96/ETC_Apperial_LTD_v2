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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log("Creating tables...");
    await db.query(createUsersTable);
    await db.query(createProductsTable);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    process.exit();
  }
}

createTables();
