// controllers/moodController.js
const Mood = require('../models/moodModel');

// Get all moods
const getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.status(200).json({
      success: true,
      data: moods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching moods',
      error: error.message
    });
  }
};

// Get mood by type
const getMoodByType = async (req, res) => {
  try {
    const { moodType } = req.params;
    const mood = await Mood.findOne({ moodType });
    
    if (!mood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      });
    }

    res.status(200).json({
      success: true,
      data: mood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mood',
      error: error.message
    });
  }
};

// Create new mood
const createMood = async (req, res) => {
  try {
    const moodData = req.body;
    const existingMood = await Mood.findOne({ moodType: moodData.moodType });
    
    if (existingMood) {
      return res.status(400).json({
        success: false,
        message: 'Mood type already exists'
      });
    }

    const newMood = new Mood(moodData);
    const savedMood = await newMood.save();
    
    res.status(201).json({
      success: true,
      message: 'Mood created successfully',
      data: savedMood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating mood',
      error: error.message
    });
  }
};

// Update mood
const updateMood = async (req, res) => {
  try {
    const { moodType } = req.params;
    const updates = req.body;
    
    const updatedMood = await Mood.findOneAndUpdate(
      { moodType },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!updatedMood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mood updated successfully',
      data: updatedMood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating mood',
      error: error.message
    });
  }
};

// Update specific section of mood
const updateMoodSection = async (req, res) => {
  try {
    const { moodType, section } = req.params;
    const updates = req.body;
    
    const updateQuery = {};
    updateQuery[section] = updates;
    
    const updatedMood = await Mood.findOneAndUpdate(
      { moodType },
      { $set: updateQuery },
      { new: true, runValidators: true }
    );
    
    if (!updatedMood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `${section} section updated successfully`,
      data: updatedMood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updating ${section} section`,
      error: error.message
    });
  }
};

// Delete mood
const deleteMood = async (req, res) => {
  try {
    const { moodType } = req.params;
    const deletedMood = await Mood.findOneAndDelete({ moodType });
    
    if (!deletedMood) {
      return res.status(404).json({
        success: false,
        message: 'Mood not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mood deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting mood',
      error: error.message
    });
  }
};

// Bulk update moods
const bulkUpdateMoods = async (req, res) => {
  try {
    const { moods } = req.body;
    const updatePromises = moods.map(moodData => 
      Mood.findOneAndUpdate(
        { moodType: moodData.moodType },
        moodData,
        { new: true, upsert: true, runValidators: true }
      )
    );
    
    const updatedMoods = await Promise.all(updatePromises);
    
    res.status(200).json({
      success: true,
      message: 'Moods updated successfully',
      data: updatedMoods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error bulk updating moods',
      error: error.message
    });
  }
};

module.exports = {
  getAllMoods,
  getMoodByType,
  createMood,
  updateMood,
  updateMoodSection,
  deleteMood,
  bulkUpdateMoods
};