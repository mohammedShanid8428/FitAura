const Hydration = require('../models/hydrationModel');

// Get user's hydration data for today
const getHydrationData = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const hydration = await Hydration.getCurrentHydration(userId);
    
    // Calculate additional stats
    const streak = await Hydration.calculateStreak(userId);
    const weeklyAverage = await Hydration.calculateWeeklyAverage(userId);
    
    // Update the document with calculated values
    hydration.streak = streak;
    hydration.weeklyAverage = weeklyAverage;
    await hydration.save();

    res.status(200).json(hydration);
  } catch (error) {
    console.error('Error fetching hydration data:', error);
    res.status(500).json({ error: 'Failed to fetch hydration data' });
  }
};

// Update hydration progress
const updateHydrationData = async (req, res) => {
  try {
    const { 
      userId, 
      completed, 
      dailyGoal, 
      date,
      reminderEnabled 
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const today = date || new Date().toDateString();
    
    let hydration = await Hydration.findOne({ userId, date: today });
    
    if (!hydration) {
      hydration = new Hydration({
        userId,
        date: today,
        completed: completed || [],
        dailyGoal: dailyGoal || 8,
        reminderEnabled: reminderEnabled || false
      });
    } else {
      hydration.completed = completed || hydration.completed;
      hydration.dailyGoal = dailyGoal || hydration.dailyGoal;
      hydration.reminderEnabled = reminderEnabled !== undefined ? reminderEnabled : hydration.reminderEnabled;
    }

    // Update completedAt timestamps
    hydration.completedAt = completed.map(time => ({
      time,
      timestamp: hydration.completedAt.find(entry => entry.time === time)?.timestamp || new Date()
    }));

    await hydration.save();

    // Calculate and update additional stats
    const streak = await Hydration.calculateStreak(userId);
    const weeklyAverage = await Hydration.calculateWeeklyAverage(userId);
    
    hydration.streak = streak;
    hydration.weeklyAverage = weeklyAverage;
    await hydration.save();

    res.status(200).json({
      message: 'Hydration data updated successfully',
      data: hydration
    });
  } catch (error) {
    console.error('Error updating hydration data:', error);
    res.status(500).json({ error: 'Failed to update hydration data' });
  }
};

// Get hydration history
const getHydrationHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const history = await Hydration.find({
      userId,
      createdAt: { $gte: startDate }
    }).sort({ date: -1 });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching hydration history:', error);
    res.status(500).json({ error: 'Failed to fetch hydration history' });
  }
};

// Get hydration statistics
const getHydrationStats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const [
      totalDays,
      completedDays,
      averageCompletion,
      bestStreak,
      currentStreak
    ] = await Promise.all([
      Hydration.countDocuments({ userId }),
      Hydration.countDocuments({ userId, percentage: { $gte: 100 } }),
      Hydration.aggregate([
        { $match: { userId } },
        { $group: { _id: null, avgPercentage: { $avg: '$percentage' } } }
      ]),
      // Calculate best streak (simplified)
      Hydration.find({ userId }).sort({ createdAt: -1 }),
      Hydration.calculateStreak(userId)
    ]);

    const avgPercentage = averageCompletion[0]?.avgPercentage || 0;
    
    // Calculate best streak from history
    let maxStreak = 0;
    let tempStreak = 0;
    
    const sortedHistory = bestStreak.reverse();
    for (let i = 0; i < sortedHistory.length; i++) {
      if (sortedHistory[i].percentage >= 100) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    const stats = {
      totalDays,
      completedDays,
      completionRate: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
      averageCompletion: Math.round(avgPercentage),
      currentStreak,
      bestStreak: maxStreak,
      weeklyAverage: await Hydration.calculateWeeklyAverage(userId)
    };

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching hydration stats:', error);
    res.status(500).json({ error: 'Failed to fetch hydration statistics' });
  }
};

// Reset daily hydration
const resetDailyHydration = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const today = new Date().toDateString();
    
    await Hydration.findOneAndUpdate(
      { userId, date: today },
      { 
        completed: [],
        completedAt: [],
        totalGlasses: 0,
        percentage: 0,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Daily hydration reset successfully' });
  } catch (error) {
    console.error('Error resetting hydration:', error);
    res.status(500).json({ error: 'Failed to reset hydration' });
  }
};

// Add single glass of water
const addWaterGlass = async (req, res) => {
  try {
    const { userId, time } = req.body;

    if (!userId || !time) {
      return res.status(400).json({ error: 'User ID and time are required' });
    }

    const hydration = await Hydration.getCurrentHydration(userId);
    hydration.addCompletedGlass(time);
    await hydration.save();

    res.status(200).json({
      message: 'Water glass added successfully',
      data: hydration
    });
  } catch (error) {
    console.error('Error adding water glass:', error);
    res.status(500).json({ error: 'Failed to add water glass' });
  }
};

// Remove single glass of water
const removeWaterGlass = async (req, res) => {
  try {
    const { userId, time } = req.body;

    if (!userId || !time) {
      return res.status(400).json({ error: 'User ID and time are required' });
    }

    const hydration = await Hydration.getCurrentHydration(userId);
    hydration.removeCompletedGlass(time);
    await hydration.save();

    res.status(200).json({
      message: 'Water glass removed successfully',
      data: hydration
    });
  } catch (error) {
    console.error('Error removing water glass:', error);
    res.status(500).json({ error: 'Failed to remove water glass' });
  }
};

module.exports = {
  getHydrationData,
  updateHydrationData,
  getHydrationHistory,
  getHydrationStats,
  resetDailyHydration,
  addWaterGlass,
  removeWaterGlass
};