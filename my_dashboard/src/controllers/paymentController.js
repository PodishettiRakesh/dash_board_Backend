const pool = require('../db');

const submitPayment = async (req, res) => {
  const { email, programId, paymentOption, amount } = req.body;

  // Ensure all required fields are provided
  if (!email || !programId || !paymentOption || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Update the application status to 'paid'
    const queryText = `
      UPDATE applications
      SET status = 'paid'
      WHERE email = $1 AND program_id = $2 AND status = 'accepted'
      RETURNING *;
    `;
    const result = await pool.query(queryText, [email, programId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No accepted application found for the provided email and program ID' });
    }

    res.status(200).json({ message: 'Payment successful and application status updated to paid', application: result.rows[0] });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = { submitPayment };
