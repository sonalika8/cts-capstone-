const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
const app = express();

app.use(express.json());


app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/books', reviewRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });