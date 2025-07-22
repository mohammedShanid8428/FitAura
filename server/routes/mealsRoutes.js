const express = require('express');
const router = express.Router();
const mealsController = require('../controllers/mealsController');

// Route: GET /api/meals
router.get('/getmeal', mealsController.getAllMeals);

// Route: POST /api/meals
router.post('/addmeal', mealsController.addMeal);

// Route: DELETE /api/meals/:id
router.delete('/deletemeal/:id', mealsController.deleteMeal);

module.exports = router;
