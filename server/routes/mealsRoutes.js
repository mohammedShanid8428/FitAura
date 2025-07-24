const express = require('express');
const router = express.Router();

const mealsController = require('../controllers/mealsController');
const { nutritionUpload } = require('../middleware.js/multer');

// ✅ Add meal (POST)
router.post('/addmeal', nutritionUpload.single("image"), mealsController.addMeal);

// ✅ Update meal (PUT)
router.put('/updatemeal/:id', nutritionUpload.single('image'), mealsController.updateMeal);

// ✅ Get all meals (GET)
router.get('/getallmeals', mealsController.getAllMeals);

// ✅ Delete meal (DELETE)
router.delete('/deletemeal/:id', mealsController.deleteMeal);

module.exports = router;
