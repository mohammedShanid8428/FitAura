// routes/nutritionRoutes.js - Corrected routes to match frontend expectations
const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealsController');
const { nutritionUpload } = require('../middleware.js/multer');

router.get('/getmeals', mealController.getAllMeals);


router.get('/getallmeals', mealController.getAllMeals);


router.delete('/admin/:id', mealController.deleteMeal);

router.put('/updatemeal/:id', nutritionUpload.single('image'), mealController.updateMealWithUpload);

router.patch('/updatemeal/:id', nutritionUpload.single('image'), mealController.updateMealWithUpload);

router.delete('/deletemeal/:id', mealController.deleteMeal);

module.exports = router;