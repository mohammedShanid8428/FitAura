// routes/moodRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllMoods,
  getMoodByType,
  createMood,
  updateMood,
  updateMoodSection,
  deleteMood,
  bulkUpdateMoods
} = require('../controllers/moodController');

// Public routes (for user frontend)
router.get('/getallmoods', getAllMoods);
router.get('/getmood/:moodType', getMoodByType);

// Admin routes (for admin panel)
router.post('/create', createMood);
router.put('/update/:moodType', updateMood);
router.put('/update/:moodType/:section', updateMoodSection);
router.delete('/delete/:moodType', deleteMood);
router.put('/bulk-update', bulkUpdateMoods);

module.exports = router;