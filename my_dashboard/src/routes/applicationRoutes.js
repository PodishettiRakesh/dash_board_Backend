// routes/applicationRoutes.js

const express = require('express');
const { submitApplication, getStudentApplications } = require('../controllers/applicationController');
const router = express.Router();

router.post('/submit', submitApplication);
router.get('/student', getStudentApplications); // New route for student applications/student', getStudentApplications); // New route for student applications


module.exports = router;
