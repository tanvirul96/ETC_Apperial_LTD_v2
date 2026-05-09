const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Determine role
        const role = email === 'admin@etc.com' ? 'admin' : 'customer';

        // Insert user
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ name, email, password_hash: hashedPassword, role }])
            .select()
            .single();

        if (insertError) throw insertError;

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const { data: user, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError || !user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user details (Private)
const { verifyToken } = require('../middleware/auth');
router.get('/me', verifyToken, async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at')
            .eq('id', req.userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update current user profile (Private)
router.put('/update-profile', verifyToken, async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required.' });
    }

    try {
        // Check if email is taken
        const { data: existingEmailUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .neq('id', req.userId)
            .maybeSingle();

        if (existingEmailUser) {
            return res.status(400).json({ message: 'Email is already in use by another account.' });
        }

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update({ name, email })
            .eq('id', req.userId)
            .select('id, name, email, role')
            .single();

        if (error) throw error;

        res.json({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
