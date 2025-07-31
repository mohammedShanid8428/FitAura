// routes/moodRoutes.js - Fixed to match frontend expectations
const express = require('express');
const router = express.Router();
const {
  getAllMoods,
  getMoodById,
  getMoodByType,
  createMood,
  updateMood,
  updateMoodByType,
  updateMoodSection,
  deleteMood,
  deleteMoodByType,
  bulkUpdateMoods
} = require('../controllers/moodController');

// Routes that match your frontend calls
router.get('/', getAllMoods);                    // GET /api/moods
router.get('/:id', getMoodById);                 // GET /api/moods/:id
router.post('/', createMood);                    // POST /api/moods
router.put('/:id', updateMood);                  // PUT /api/moods/:id
router.delete('/:id', deleteMood);               // DELETE /api/moods/:id

// Additional admin routes (optional)
router.get('/getallmoods', getAllMoods);
router.get('/getmood/:moodType', getMoodByType);
router.post('/create', createMood);
router.put('/update/:moodType', updateMoodByType);
router.put('/update/:moodType/:section', updateMoodSection);
router.delete('/delete/:moodType', deleteMoodByType);
router.put('/bulk-update', bulkUpdateMoods);

module.exports = router;