const express = require('express');
const router = express.Router();
const { fetchPendingApplications, updateApplicationStatus } = require('../controllers/adminController');

// Route to fetch all pending applications
router.get('/applications', fetchPendingApplications);

// Route to update application status
// router.post('/applications/:id/status', updateApplicationStatus);

module.exports = router;
