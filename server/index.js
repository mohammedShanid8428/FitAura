const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express(); // ✅ Initialized before using app.use

app.use(cors()); // ✅ CORS for frontend/backend interaction
app.use(express.json()); // ✅ Parses incoming JSON

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ API Routes
app.use('/api/users', userRouter);         // handles /api/users/register and /login
app.use('/api/contact', contactRoutes);    // handles contact form submissions at /api/contact

// ✅ Default Home Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Servana API", timestamp: Date.now() });
});

// ✅ Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
