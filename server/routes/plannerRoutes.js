const express = require('express');
const router = express.Router();
const Meal = require('../models/mealModel');

// GET all meals (Meal Planner)
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find().sort({ dateAdded: -1 });
    res.json(meals);
  } catch (error) {
    console.error('Failed to fetch meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// POST add meal to planner
router.post('/', async (req, res) => {
  try {
    const { title, imageUrl, mealType, benefit, tags } = req.body;

    if (!title || !imageUrl || !mealType) {
      return res.status(400).json({ error: 'title, imageUrl, and mealType are required.' });
    }

    const newMeal = new Meal({
      title,
      imageUrl,
      mealType,
      benefit: benefit || '',
      tags: tags || []
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);

  } catch (error) {
    console.error('Failed to add meal:', error);
    res.status(500).json({ error: 'Failed to add meal' });
  }
});

// DELETE meal from planner
router.delete('/:id', async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    console.error('Failed to delete meal:', error);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
});

module.exports = router;
