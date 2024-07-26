const express = require('express');
const { submitPayment } = require('../controllers/paymentController');
const router = express.Router();

// Route to handle payment submission
router.post('/', submitPayment);

module.exports = router;
