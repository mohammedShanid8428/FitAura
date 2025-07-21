// models/Meal.js

const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: String,
  moodTags: [String],   // ["Happy", "Sad", etc.]
  category: String,
  tags: [String],       // Example: ["#Protein", "#MoodLift"]
  benefit: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', mealSchema);
