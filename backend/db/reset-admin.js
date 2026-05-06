const bcrypt = require('bcryptjs');
const db = require('./index');

async function resetAdmin() {
    try {
        const hash = await bcrypt.hash('password123', 10);
        await db.query('UPDATE users SET password_hash = $1 WHERE email = $2', [hash, 'admin@etc.com']);
        console.log('Admin password for admin@etc.com has been reset to: password123');
    } catch (err) {
        console.error('Error resetting admin:', err);
    } finally {
        process.exit();
    }
}

resetAdmin();
