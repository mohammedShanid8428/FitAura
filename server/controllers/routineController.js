const Routine = require('../models/routineModel');

// Fetch all routines
exports.getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.find().sort({ createdAt: -1 });
    res.json(routines);
  } catch (error) {
    console.error('Routine Fetch Error:', error);
    res.status(500).json({ message: 'Failed to fetch routines' });
  }
};

// (Optional) Add a routine (Admin usage)
exports.addRoutine = async (req, res) => {
  try {
    const { title, imageUrl, description, duration } = req.body;
    const newRoutine = new Routine({ title, imageUrl, description, duration });
    await newRoutine.save();
    res.status(201).json({ message: 'Routine added successfully' });
  } catch (error) {
    console.error('Add Routine Error:', error);
    res.status(500).json({ message: 'Failed to add routine' });
  }
};
