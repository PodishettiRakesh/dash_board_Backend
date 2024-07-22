// controllers/applicationController.js

const pool = require('../db');
const nodemailer = require('nodemailer');

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'podishettirakesh70@msitprogram.net',
  },
});

const submitApplication = async (req, res) => {
  const { program_id, email, personalDetails, educationalBackground, statementOfPurpose } = req.body;
  const status = 'pending';

  // Ensure programId is correctly received
  if (!program_id || isNaN(program_id)) {
    console.log('Invalid program_id')
    return res.status(400).json({ message: 'Invalid program_id' });

  }


  try {
    const queryText = 'INSERT INTO applications (program_id, email, personal_details, educational_background, statement_of_purpose, status, submission_date) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *';
    const newApplication = await pool.query(queryText, [program_id, email, personalDetails, educationalBackground, statementOfPurpose, status]);

    // Send confirmation email
    const mailOptions = {
      from: 'podishettirakesh70@msitprogram.net',
      to: email,
      subject: 'Application Submission Confirmation',
      text: `Dear Student,

      Your application has been successfully submitted for program ID: ${program_id}. It takes up to two days to verify the application. 

      Thank you for applying.

      Best regards,
      Rakesh podishetti,
      Admissions Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Application submitted but email not sent');
      } else {
        console.log('Email sent:', info.response);
        return res.status(201).json(newApplication.rows[0]);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { submitApplication };
