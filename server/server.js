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
const contactRoutes = require('./routes/contactRoutes');
const hydrationRoutes = require('./routes/hydrationRoutes');
const moodRoutes = require('./routes/moodRoutes');
const routineRoutes = require('./routes/routineRoutes');

const mealPlannerRoutes = require('./routes/plannerRoutes');

// Use Routes
app.use('/api/mealplanner', mealPlannerRoutes);

app.use('/api/routines', routineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/meals', mealsRoutes);          // This now includes all nutrition manager routes
app.use('/api/contact', contactRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/hydration', hydrationRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('FitAura API is running...');
});

// Start Server
const PORT =process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));