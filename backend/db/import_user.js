const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.includes('[ETC2026Tanvir]')) {
  console.error('❌ Error: Please specify your actual Supabase database password in backend/.env');
  process.exit(1);
}

// Read arguments from command line: node import_user.js "Name" "email@example.com" "password" "role"
const args = process.argv.slice(2);
const name = args[0] || 'Executive Curator';
const email = args[1] || 'curator@etc.com';
const password = args[2] || 'curator123';
const role = args[3] || 'admin'; // default to 'admin' or 'customer'

async function importUser() {
  console.log(`⏳ Initializing user import for: ${name} (${email}) with role: ${role}...`);

  const client = new Client({ connectionString });

  try {
    // Connect to database
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL database.');

    // Ensure the users table exists (defensive practice)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'customer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Generate bcrypt hash of the password
    console.log('⏳ Hashing password securely with bcrypt...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user with ON CONFLICT resolution
    const query = {
      text: `
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) 
        DO UPDATE SET 
          name = EXCLUDED.name,
          password_hash = EXCLUDED.password_hash,
          role = EXCLUDED.role
        RETURNING id, name, email, role;
      `,
      values: [name, email, passwordHash, role],
    };

    console.log('⏳ Importing user into the users table...');
    const res = await client.query(query);
    const imported = res.rows[0];

    console.log('\n✨ User Imported Successfully! ✨');
    console.log('-----------------------------------');
    console.log(`ID:       ${imported.id}`);
    console.log(`Name:     ${imported.name}`);
    console.log(`Email:    ${imported.email}`);
    console.log(`Role:     ${imported.role}`);
    console.log('-----------------------------------');

  } catch (err) {
    console.error('❌ Failed to import user:', err.message);
    if (err.message.includes('ENOTFOUND')) {
      console.log('\n💡 Tip: Your database connection is still failing. Please make sure:');
      console.log('1. The database project is restored/unpaused on your Supabase dashboard.');
      console.log('2. The connection string in backend/.env is updated with the correct project reference.');
    }
  } finally {
    await client.end();
    process.exit();
  }
}

importUser();
