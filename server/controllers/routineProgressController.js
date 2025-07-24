const RoutineProgress = require("../models/routineProgressModel");

// POST or UPDATE routine progress
exports.updateRoutineProgress = async (req, res) => {
  try {
    const { userId, date, completedRoutines, totalDuration, progressPercent } = req.body;

    if (!userId || !date) {
      return res.status(400).json({ error: "userId and date are required" });
    }

    const updated = await RoutineProgress.findOneAndUpdate(
      { userId, date },
      { $set: { completedRoutines, totalDuration, progressPercent } },
      { upsert: true, new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
};

// GET routine progress by userId
exports.getRoutineProgressByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await RoutineProgress.find({ userId }).sort({ date: -1 });
    res.status(200).json(progress);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};
