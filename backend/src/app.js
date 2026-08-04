const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/users', userRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    errors: [{ message: 'The requested endpoint does not exist' }],
  });
});

app.use(errorHandler);

module.exports = app;
