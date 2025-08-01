require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Endpoint to send the API key securely
app.get('/api-key', (req, res) => {
  res.json({ key: process.env.GOOGLE_MAPS_API_KEY});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
