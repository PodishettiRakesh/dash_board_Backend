// routes/applicationRoutes.js

const express = require('express');
const { submitApplication } = require('../controllers/applicationController');
const router = express.Router();

router.post('/submit', submitApplication);
router.get('/student', authMiddleware, getStudentApplications); // New route for student applications


module.exports = router;
