const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
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
    default: ""
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// Mongoose will store this model's documents in the "meals" collection
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
