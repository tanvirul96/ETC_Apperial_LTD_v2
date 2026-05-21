const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { validateFields } = require('../utils/validator');

const registerRules = {
  name: { required: true, min: 2, max: 100, label: 'Name' },
  email: { required: true, isEmail: true, label: 'Email' },
  password: { required: true, min: 6, max: 100, label: 'Password' }
};

const loginRules = {
  email: { required: true, isEmail: true, label: 'Email' },
  password: { required: true, min: 6, label: 'Password' }
};

const changePasswordRules = {
  currentPassword: { required: true, min: 6, label: 'Current Password' },
  newPassword: { required: true, min: 6, label: 'New Password' }
};

const addAdminRules = {
  name: { required: true, min: 2, max: 100, label: 'Name' },
  email: { required: true, isEmail: true, label: 'Email' },
  password: { required: true, min: 6, max: 100, label: 'Password' }
};

// Register (Public - STRICTLY CLIENT/CUSTOMER ONLY)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const validation = validateFields(req.body, registerRules);
        if (!validation.isValid) {
            return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
        }

        // Check if user exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Strict Enforcement: Public register is ALWAYS a regular client (customer)
        const role = 'customer';

        // Insert user
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ name, email, password_hash: hashedPassword, role }])
            .select('id, name, email, role, created_at')
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

        const validation = validateFields(req.body, loginRules);
        if (!validation.isValid) {
            return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
        }

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
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role, 
                avatar_url: user.avatar_url 
            }
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user details (Private)
router.get('/me', verifyToken, async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at, avatar_url')
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
    const { name, email, avatar_url } = req.body;
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

        // Update fields including optional avatar_url
        const updateData = { name, email };
        if (avatar_url !== undefined) {
            updateData.avatar_url = avatar_url;
        }

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', req.userId)
            .select('id, name, email, role, avatar_url')
            .single();

        if (error) throw error;

        res.json({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Change Password (Private - Users and Admins)
router.put('/change-password', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    const validation = validateFields(req.body, changePasswordRules);
    if (!validation.isValid) {
        return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
    }

    try {
        // Fetch current user credentials
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', req.userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update database record
        const { error: updateError } = await supabase
            .from('users')
            .update({ password_hash: hashedNewPassword })
            .eq('id', req.userId);

        if (updateError) throw updateError;

        res.json({ message: 'Password updated successfully!' });
    } catch (err) {
        console.error('Error changing password:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register New Admin (Private - RESTRICTED TO ADMINS ONLY)
router.post('/add-admin', [verifyToken, verifyAdmin], async (req, res) => {
    const { name, email, password } = req.body;
    
    const validation = validateFields(req.body, addAdminRules);
    if (!validation.isValid) {
        return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
    }

    try {
        // Check if email already registered
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email address already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user with admin privileges
        const { data: newAdmin, error } = await supabase
            .from('users')
            .insert([{ name, email, password_hash: hashedPassword, role: 'admin' }])
            .select('id, name, email, role, created_at')
            .single();

        if (error) throw error;

        res.status(201).json({ message: 'New admin curator registered successfully!', admin: newAdmin });
    } catch (err) {
        console.error('Error adding admin:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// List all administrators (Private - RESTRICTED TO ADMINS ONLY)
router.get('/admins', [verifyToken, verifyAdmin], async (req, res) => {
    try {
        const { data: admins, error } = await supabase
            .from('users')
            .select('id, name, email, role, created_at, avatar_url')
            .eq('role', 'admin')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(admins);
    } catch (err) {
        console.error('Error fetching admins:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
