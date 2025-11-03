// index.js
// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // No date parameter → current date
  if (!dateParam) {
    date = new Date();
  } 
  // Numeric timestamp → treat as milliseconds
  else if (!isNaN(dateParam)) {
    date = new Date(Number(dateParam));
  } 
  // Otherwise, parse as date string
  else {
    date = new Date(dateParam);
  }

  // Invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return JSON object in correct format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});

module.exports = app;
