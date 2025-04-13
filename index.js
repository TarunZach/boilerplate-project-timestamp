// index.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Root route - serve the index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle date parameters
app.get('/api/:date?', function(req, res) {
  let dateParam = req.params.date;
  let date;
  
  // If no date is provided, use current time
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if dateParam is a unix timestamp (all digits)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      // Try to parse as date string
      date = new Date(dateParam);
    }
  }
  
  // Check if date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }
  
  // Return both unix and UTC formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on the port provided in environment variables or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Timestamp Microservice listening on port ${port}`);
});