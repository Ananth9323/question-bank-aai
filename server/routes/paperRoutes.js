const express = require('express');
const sqlite = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite.Database('./db/database.db');

router.get('/generate', (req, res) => {
    const { course, marks } = req.query;
    db.all(
        'SELECT * FROM questions WHERE course = ? AND marks <= ? ORDER BY RANDOM()',
        [course, marks],
        (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(rows);
        }
    );
});

module.exports = router;