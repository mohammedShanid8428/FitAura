// routes/nutritionRoutes.js - Corrected routes to match frontend expectations
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealsController');
// const { nutritionUpload } = require('../middleware/multer');

// ============= PUBLIC ROUTES =============

// Get all meals (matches frontend expectation: /nutrition/getmeals)
router.get('/getmeals', mealController.getAllMeals);

// Alternative endpoint for compatibility (if frontend uses /meals/getallmeals)
router.get('/getallmeals', mealController.getAllMeals);


// Delete meal
router.delete('/admin/:id', mealController.deleteMeal);

module.exports = router;