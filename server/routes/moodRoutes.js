const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

// API Endpoints
router.get('/', moodController.getAllMoods);                  // GET All Moods
router.get('/:id', moodController.getMoodById);               // GET Single Mood
router.post('/', moodController.addMood);                     // POST Add Mood
router.put('/:id', moodController.updateMood);                // PUT Update Mood
router.delete('/:id', moodController.deleteMood);             // DELETE Mood

module.exports = router;
