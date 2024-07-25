const express = require('express');
const { signup, login,fetchPendingApplications, updateApplicationStatus } = require('../controllers/adminController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Route to fetch all pending applications
router.get('/applications', fetchPendingApplications);

// Route to update application status
router.post('/applications/:id/status', updateApplicationStatus);

module.exports = router;
