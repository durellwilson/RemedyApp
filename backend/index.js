const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const remedyRoutes = require('./routes/remedyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HerbaList Remedy API' });
});

// Remedy routes
app.use('/api/remedies', remedyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
