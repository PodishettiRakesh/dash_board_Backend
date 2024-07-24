// src/controllers/adminController.js
const pool = require('../db');

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const queryText = 'INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING *';
    const newAdmin = await pool.query(queryText, [email, password]);
    res.status(201).json(newAdmin.rows[0]);
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).send('Server Error: Failed to create new admin');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const queryText = 'SELECT * FROM admins WHERE email = $1 AND password = $2';
    const admin = await pool.query(queryText, [email, password]);
    if (admin.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server Error: Failed to log in');
  }
};


// Fetch all pending applications
const fetchPendingApplications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications WHERE status = $1', ['pending']);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).send('Server Error');
  }
};
module.exports = { signup, login };
