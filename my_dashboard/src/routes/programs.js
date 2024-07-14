// routes/programs.js

const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router.get('/', programController.getPrograms);

module.exports = router;
