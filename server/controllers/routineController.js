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

// Add a new routine
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

// ✅ Update routine
exports.updateRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, description, duration } = req.body;

    const updatedRoutine = await Routine.findByIdAndUpdate(
      id,
      { title, imageUrl, description, duration },
      { new: true }
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.json({ message: 'Routine updated successfully', updatedRoutine });
  } catch (error) {
    console.error('Update Routine Error:', error);
    res.status(500).json({ message: 'Failed to update routine' });
  }
};

// ✅ Delete routine
exports.deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoutine = await Routine.findByIdAndDelete(id);

    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error('Delete Routine Error:', error);
    res.status(500).json({ message: 'Failed to delete routine' });
  }
};
