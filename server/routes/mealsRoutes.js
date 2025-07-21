// routes/mealRoutes.js

const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// POST: Add Single Meal
router.post('/', async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch All Meals
router.get('/', async (req, res) => {
  const meals = await Meal.find();
  res.json(meals);
});

// OPTIONAL: Filter by Mood
router.get('/mood/:mood', async (req, res) => {
  const meals = await Meal.find({ moodTags: req.params.mood });
  res.json(meals);
});

module.exports = router;
