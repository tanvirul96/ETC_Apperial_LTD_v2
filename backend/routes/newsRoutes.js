const express = require('express');
const router = express.Router();
const supabase = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all news entries (Public)
router.get('/', async (req, res) => {
  try {
    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single news entry (Public)
router.get('/:id', async (req, res) => {
  try {
    const { data: entry, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ message: 'Narrative not found' });
      throw error;
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a news entry (Admin only)
router.post('/', [verifyToken, verifyAdmin], async (req, res) => {
  const { title, excerpt, content, author, category, image_url, status } = req.body;
  try {
    const { data: newEntry, error } = await supabase
      .from('news')
      .insert([{ title, excerpt, content, author, category, image_url, status: status || 'Published' }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a news entry (Admin only)
router.put('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  const { title, excerpt, content, author, category, image_url, status } = req.body;
  try {
    const { data: updatedEntry, error } = await supabase
      .from('news')
      .update({ title, excerpt, content, author, category, image_url, status: status || 'Published', updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ message: 'News entry not found' });
      throw error;
    }
    res.json(updatedEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a news entry (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'News entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
