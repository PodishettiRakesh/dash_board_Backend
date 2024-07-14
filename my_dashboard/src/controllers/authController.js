const pool = require('../db');

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const queryText = 'INSERT INTO students (email, password) VALUES ($1, $2) RETURNING *';
    const newStudent = await pool.query(queryText, [email, password]);
    res.status(201).json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const queryText = 'SELECT * FROM students WHERE email = $1 AND password = $2';
    const student = await pool.query(queryText, [email, password]);
    if (student.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { signup, login };
