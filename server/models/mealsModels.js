// /models/mealsModels.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
  benefit: { type: String },
  mealType: {
    type: [String], // Support multiple types like ["Happy", "Breakfast", "Weight Loss"]
    enum: [
      "Breakfast", "Lunch", "Dinner", "Snacks",
      "Happy", "Sad", "Angry", "Tired", "Anxious",
      "Weight Loss", "Weight Gain", "Muscle Gain", "Mental Health", "Fitness"
    ],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);
