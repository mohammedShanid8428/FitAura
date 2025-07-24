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
    const { title, imageUrl, tags = [], benefit = '', mealType = 'general' } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ error: 'title and imageUrl are required.' });
    }

    // Check if meal already exists in planner
    const existingMeal = await MealPlanner.findOne({ 
      title: title, 
      imageUrl: imageUrl 
    });

    if (existingMeal) {
      return res.status(409).json({ error: 'This meal is already in your planner' });
    }

    // Normalize mealType to lowercase
    const normalizedMealType = mealType.toLowerCase();

    const newMeal = new MealPlanner({ 
      title, 
      imageUrl, 
      tags, 
      benefit, 
      mealType: normalizedMealType,
      dateAdded: new Date()
    });
    
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

// GET meals by meal type
exports.getMealsByType = async (req, res) => {
  try {
    const { mealType } = req.params;
    const meals = await MealPlanner.find({ mealType: mealType.toLowerCase() }).sort({ dateAdded: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error('Failed to fetch meals by type:', error);
    res.status(500).json({ error: 'Failed to fetch meals by type' });
  }
};