// routes/plannerRoutes.js
const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Routes
router.get('/getmealplanner', plannerController.getPlannerMeals);
router.post('/addmealplanner', plannerController.addMealToPlanner);
router.delete('/deleteplanner/:id', plannerController.deleteMealFromPlanner);

module.exports = router; // ✅ THIS IS MANDATORY
