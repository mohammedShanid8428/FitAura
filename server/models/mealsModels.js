const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mealType: { type: String, required: true },
  benefit: { type: String },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Meal", mealSchema);
