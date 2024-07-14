// routes/programs.js

const express = require('express');
const router = express.Router();
const { getPrograms } = require('../controllers/programs');

router.get('/', getPrograms);

module.exports = router;
