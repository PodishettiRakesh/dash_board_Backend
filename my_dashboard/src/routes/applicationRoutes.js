// routes/applicationRoutes.js

const express = require('express');
const { submitApplication, getStudentApplications } = require('../controllers/applicationController');
const router = express.Router();

router.post('/submit', submitApplication);
router.get('/student/:email', getStudentApplications); // Modified route to capture email

module.exports = router;
