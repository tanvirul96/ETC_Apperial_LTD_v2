const express = require('express');
const router = express.Router();
const db = require('../db');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all news entries
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a news entry (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, excerpt, content, author, category, image_url, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO news (title, excerpt, content, author, category, image_url, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, excerpt, content, author, category, image_url, status || 'Published']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a news entry (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await db.query('DELETE FROM news WHERE id = $1', [req.params.id]);
    res.json({ message: 'News entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
