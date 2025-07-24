const mongoose = require('mongoose');

const mealPlannerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
  benefit: { type: String, default: "" },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true },
  dateAdded: { type: Date, default: Date.now }
});

// Explicitly set collection name
module.exports = mongoose.model('MealPlanner', mealPlannerSchema, 'mealsplanner');
