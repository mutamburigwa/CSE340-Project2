const express = require('express'); // Import Express
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Use environment PORT or default to 3000

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware for CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Route handlers
app.use('/', require('./routes'));

// Initialize database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}. Database connected successfully.`);
    });
  }
});
