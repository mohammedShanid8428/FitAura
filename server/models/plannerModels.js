const mongoose = require('mongoose');

const mealPlannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  benefit: {
    type: String,
    default: ''
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'general'],
    default: 'general',
    lowercase: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  day: {
    type: String,
    default: null // For future scheduling feature
  }
}, {
  timestamps: true
});

// Index for faster queries
mealPlannerSchema.index({ mealType: 1 });
mealPlannerSchema.index({ dateAdded: -1 });

module.exports = mongoose.model('MealPlanner', mealPlannerSchema);