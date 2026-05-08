const { Client } = require('pg');
require('dotenv').config();

async function test() {
  console.log('Testing connection to:', process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connection successful!');
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed!');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('Full Error:', err);
  }
}

test();
