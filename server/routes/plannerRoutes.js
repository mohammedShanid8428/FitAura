const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

// Route: GET /api/mealplanner
router.get('/getmealplanner', plannerController.getPlannerMeals);

// Route: POST /api/mealplanner
router.post('/addmealplanner', plannerController.addMealToPlanner);

// Route: DELETE /api/mealplanner/:id
router.delete('/deleteplanner/:id', plannerController.deleteMealFromPlanner);

module.exports = router;
