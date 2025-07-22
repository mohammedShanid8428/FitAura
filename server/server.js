const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables before anything else
dotenv.config();

// Connect to MongoDB
require('./config/dbConnection');

// Initialize Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require('./routes/userRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const mealPlannerRoutes = require('./routes/plannerRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/mealplanner', mealPlannerRoutes);
app.use('/api/contact', contactRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('FitAura API is running...');
});

// Start Server
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
