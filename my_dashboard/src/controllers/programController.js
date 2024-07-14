// src/controllers/programController.js

const pool = require('../db');

const getPrograms = async (req, res) => {
  try {
    const queryText = 'SELECT * FROM programs';
    const result = await pool.query(queryText);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getPrograms };
