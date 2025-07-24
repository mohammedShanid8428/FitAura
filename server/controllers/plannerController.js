const MealPlanner = require('../models/plannerModels');

// GET all planner meals
exports.getPlannerMeals = async (req, res) => {
  try {
    const meals = await MealPlanner.find().sort({ dateAdded: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error('Failed to fetch planner meals:', error);
    res.status(500).json({ error: 'Failed to fetch planner meals' });
  }
};

// ADD a new meal to planner
exports.addMealToPlanner = async (req, res) => {
  try {
    const { title, imageUrl, tags = [], benefit = '', mealType } = req.body;

    if (!title || !imageUrl || !mealType) {
      return res.status(400).json({ error: 'title, imageUrl, and mealType are required.' });
    }

    const newMeal = new MealPlanner({ title, imageUrl, tags, benefit, mealType });
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    console.error('Failed to add meal to planner:', error);
    res.status(500).json({ error: 'Failed to add meal to planner' });
  }
};

// DELETE a meal from planner
exports.deleteMealFromPlanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeal = await MealPlanner.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ error: 'Meal not found in planner' });
    }

    res.status(200).json({ message: 'Meal deleted from planner successfully' });
  } catch (error) {
    console.error('Failed to delete meal from planner:', error);
    res.status(500).json({ error: 'Failed to delete meal from planner' });
  }
};
