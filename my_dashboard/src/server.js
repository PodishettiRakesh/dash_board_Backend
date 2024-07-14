const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const programsRoutes = require('./routes/programs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/programs', programsRoutes); // Use programs routes


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
