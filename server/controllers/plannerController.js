const Meal = require('../models/Meal');

// Fetch all saved planner meals
exports.getPlannerMeals = async (req, res) => {
  try {
    const meals = await Meal.find().sort({ dateAdded: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
};

// Add a meal to planner
exports.addMealToPlanner = async (req, res) => {
  try {
    const { title, imageUrl, tags, benefit, mealType } = req.body;
    const newMeal = new Meal({ title, imageUrl, tags, benefit, mealType });
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add meal' });
  }
};

// Delete a meal from planner
exports.deleteMealFromPlanner = async (req, res) => {
  try {
    const { id } = req.params;
    await Meal.findByIdAndDelete(id);
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meal' });
  }
};
