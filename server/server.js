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

const moodRoutes = require('./routes/moodRoutes');
const routineRoutes = require('./routes/routineRoutes');
const routineDashRoutes = require("./routes/routineProgressRoutes");
const mealPlannerRoutes = require('./routes/plannerRoutes');
app.use('/api/mealplanner', mealPlannerRoutes);

app.use("/api/routineprogresses", routineDashRoutes);
app.use('/api/routines', routineRoutes);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/moods', moodRoutes);


// Base Route
app.get('/', (req, res) => {
  res.send('FitAura API is running...');
});

// Start Server
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
