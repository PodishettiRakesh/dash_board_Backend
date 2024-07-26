const pool = require('../db');
const nodemailer = require('nodemailer');


// Configure nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'podishettirakesh70@msitprogram.net',
      pass: 'Rakesh*@*062'
    },
  });

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

     // Send email notification
     const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Payment Received',
        text: `Dear Student,\n\nYour payment of INR ${amount} for program ID ${programId} has been received successfully.\n\nThank you!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Payment successful but failed to send email notification.' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Payment successful and application status updated to paid. Email notification sent.', application: result.rows[0] });
        }
      });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = { submitPayment };
