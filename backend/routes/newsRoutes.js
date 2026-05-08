const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all news entries (Public)
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a news entry (Admin only)
router.post('/', [verifyToken, verifyAdmin], async (req, res) => {
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

// Update a news entry (Admin only)
router.put('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  const { title, excerpt, content, author, category, image_url, status } = req.body;
  try {
    const result = await db.query(
      `UPDATE news SET title=$1, excerpt=$2, content=$3, author=$4, category=$5, image_url=$6, status=$7, updated_at=CURRENT_TIMESTAMP
       WHERE id=$8 RETURNING *`,
      [title, excerpt, content, author, category, image_url, status || 'Published', req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'News entry not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a news entry (Admin only)
router.delete('/:id', [verifyToken, verifyAdmin], async (req, res) => {
  try {
    await db.query('DELETE FROM news WHERE id = $1', [req.params.id]);
    res.json({ message: 'News entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
