const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Create a new contact inquiry (Public)
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields (name, email, subject, and message) are required.' });
  }

  try {
    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([{ name, email, subject, message }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Inquiry submitted successfully!', contact: newContact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all contact inquiries (Admin only)
router.get('/', [verifyToken, verifyAdmin], async (req, res) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update inquiry status (Admin only)
router.put('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  const { status } = req.body;
  try {
    const { data: updatedContact, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an inquiry (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
