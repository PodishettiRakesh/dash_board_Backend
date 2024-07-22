// controllers/applicationController.js

const pool = require('../db');
const nodemailer = require('nodemailer');

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'podishettirakesh70@msitprogram.net',
    pass: 'Rakesh*@*062',
  },
});

const submitApplication = async (req, res) => {
  const { programId, email, personalDetails, educationalBackground, statementOfPurpose } = req.body;
  const status = 'pending';

  try {
   

    // Send confirmation email
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Application Submission Confirmation',
      text: `Dear Student,

      Your application has been successfully submitted for program ID: ${programId}. It takes up to two days to verify the application. 

      Thank you for applying.

      Best regards,
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
