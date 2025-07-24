// routes/plannerRoutes.js
const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// GET all planner meals
router.get('/getmealplanner', plannerController.getPlannerMeals);

// POST a new meal to planner
router.post('/addmealplanner', plannerController.addMealToPlanner);

// DELETE a meal from planner by ID
router.delete('/deleteplanner/:id', plannerController.deleteMealFromPlanner);

module.exports = router;
