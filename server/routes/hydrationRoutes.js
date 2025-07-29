// routes/hydrationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getHydrationData,
  updateHydrationData,
  getHydrationHistory,
  getHydrationStats,
  resetDailyHydration,
  addWaterGlass,
  removeWaterGlass
} = require('../controllers/hydrationController');

// Middleware for input validation
const validateUserId = (req, res, next) => {
  const userId = req.params.userId || req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  next();
};

// GET routes
router.get('/gethydration/:userId', validateUserId, getHydrationData);
router.get('/history/:userId', validateUserId, getHydrationHistory);
router.get('/stats/:userId', validateUserId, getHydrationStats);

// POST routes
router.post('/updatehydration', validateUserId, updateHydrationData);
router.post('/reset', validateUserId, resetDailyHydration);
router.post('/add-glass', validateUserId, addWaterGlass);
router.post('/remove-glass', validateUserId, removeWaterGlass);

// PUT route for updating daily goal
router.put('/goal/:userId', validateUserId, async (req, res) => {
  try {
    const { userId } = req.params;
    const { dailyGoal } = req.body;

    if (!dailyGoal || dailyGoal < 1 || dailyGoal > 20) {
      return res.status(400).json({ error: 'Daily goal must be between 1 and 20' });
    }

    const hydration = await require('../models/Hydration').getCurrentHydration(userId);
    hydration.dailyGoal = dailyGoal;
    await hydration.save();

    res.status(200).json({
      message: 'Daily goal updated successfully',
      data: hydration
    });
  } catch (error) {
    console.error('Error updating daily goal:', error);
    res.status(500).json({ error: 'Failed to update daily goal' });
  }
});

// DELETE route for clearing all data
router.delete('/clear/:userId', validateUserId, async (req, res) => {
  try {
    const { userId } = req.params;
    
    await require('../models/Hydration').deleteMany({ userId });
    
    res.status(200).json({ message: 'All hydration data cleared successfully' });
  } catch (error) {
    console.error('Error clearing hydration data:', error);
    res.status(500).json({ error: 'Failed to clear hydration data' });
  }
});

module.exports = router;