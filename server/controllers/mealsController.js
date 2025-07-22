const Meal = require('../models/mealsModels');

// Fetch all meals
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find().sort({ dateAdded: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error('Failed to fetch meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
};

// Add a new meal
exports.addMeal = async (req, res) => {
  try {
    const { title, imageUrl, tags = [], benefit = '', mealType } = req.body;

    if (!title || !imageUrl || !mealType) {
      return res.status(400).json({ error: 'title, imageUrl, and mealType are required.' });
    }

    const newMeal = new Meal({
      title,
      imageUrl,
      tags,
      benefit,
      mealType
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);

  } catch (error) {
    console.error('Failed to add meal:', error);
    res.status(500).json({ error: 'Failed to add meal' });
  }
};

// Delete a meal
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    res.json({ message: 'Meal deleted successfully' });

  } catch (error) {
    console.error('Failed to delete meal:', error);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
};
