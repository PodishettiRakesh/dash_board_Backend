// controllers/programController.js

const pool = require('../db');

const getPrograms = async (req, res) => {
  try {
    const queryText = 'SELECT * FROM programs';
    const { rows } = await pool.query(queryText);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPrograms };
