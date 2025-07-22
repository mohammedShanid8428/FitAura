const Mood = require('../models/moodModel');

// GET all moods
exports.getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);   // Always return array
  } catch (error) {
    res.status(500).json({ message: 'Error fetching moods.' });
  }
};

// GET single mood by ID
exports.getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    if (!mood) return res.status(404).json({ message: 'Mood not found.' });
    res.json(mood);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching mood.' });
  }
};

// POST mood
exports.addMood = async (req, res) => {
  try {
    const newMood = new Mood(req.body);
    await newMood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: 'Error adding mood.' });
  }
};

// PUT mood
exports.updateMood = async (req, res) => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMood) return res.status(404).json({ message: 'Mood not found.' });
    res.json(updatedMood);
  } catch (error) {
    res.status(500).json({ message: 'Error updating mood.' });
  }
};

// DELETE mood
exports.deleteMood = async (req, res) => {
  try {
    const deletedMood = await Mood.findByIdAndDelete(req.params.id);
    if (!deletedMood) return res.status(404).json({ message: 'Mood not found.' });
    res.json({ message: 'Mood deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mood.' });
  }
};
