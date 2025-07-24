// /models/mealsModels.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
  benefit: { type: String },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema); // 👈 Should be capital "Meal"
