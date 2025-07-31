// controllers/moodController.js - Fixed to return data format expected by frontend
const Mood = require('../models/moodModel');

// Get all moods - Return direct array for frontend compatibility
const getAllMoods = async (req, res) => {
  try {
    console.log('📋 Fetching all moods...');
    const moods = await Mood.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${moods.length} moods`);
    
    // Return direct array to match frontend expectation
    res.status(200).json(moods);
  } catch (error) {
    console.error('❌ Error fetching moods:', error);
    res.status(500).json({ 
      message: 'Error fetching moods', 
      error: error.message 
    });
  }
};

// Get mood by ID (for edit/delete operations)
const getMoodById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching mood with ID: ${id}`);

    // ✅ Check for valid ObjectId first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid mood ID format' });
    }

    const mood = await Mood.findById(id);
    
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood found');
    res.status(200).json(mood);
  } catch (error) {
    console.error('❌ Error fetching mood:', error);
    res.status(500).json({ 
      message: 'Error fetching mood', 
      error: error.message 
    });
  }
};
// Get mood by type (for original functionality)
const getMoodByType = async (req, res) => {
  try {
    const { moodType } = req.params;
    console.log(`🔍 Fetching mood with type: ${moodType}`);
    
    const mood = await Mood.findOne({ mood: moodType });
    
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood found');
    res.status(200).json(mood);
  } catch (error) {
    console.error('❌ Error fetching mood:', error);
    res.status(500).json({ 
      message: 'Error fetching mood', 
      error: error.message 
    });
  }
};

// Create new mood
const createMood = async (req, res) => {
  try {
    console.log('📝 Creating new mood...');
    console.log('Body:', req.body);
    
    const moodData = req.body;
    
    // Check if mood already exists
    const existingMood = await Mood.findOne({ mood: moodData.mood });
    
    if (existingMood) {
      return res.status(400).json({ message: 'Mood already exists' });
    }

    const newMood = new Mood(moodData);
    const savedMood = await newMood.save();
    
    console.log('✅ Mood created:', savedMood._id);
    res.status(201).json(savedMood);
  } catch (error) {
    console.error('❌ Error creating mood:', error);
    res.status(500).json({ 
      message: 'Error creating mood', 
      error: error.message 
    });
  }
};

const updateMood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 Updating mood with ID: ${id}`);
    console.log('Body:', req.body);

    // ✅ Validate Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid mood ID format' });
    }

    const updates = req.body;

    const updatedMood = await Mood.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood updated:', updatedMood._id);
    res.status(200).json(updatedMood);
  } catch (error) {
    console.error('❌ Error updating mood:', error);
    res.status(500).json({ 
      message: 'Error updating mood', 
      error: error.message 
    });
  }
};

// Update mood by type (for backward compatibility)
const updateMoodByType = async (req, res) => {
  try {
    const { moodType } = req.params;
    console.log(`📝 Updating mood with type: ${moodType}`);
    
    const updates = req.body;
    
    const updatedMood = await Mood.findOneAndUpdate(
      { mood: moodType },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood updated');
    res.status(200).json(updatedMood);
  } catch (error) {
    console.error('❌ Error updating mood:', error);
    res.status(500).json({ 
      message: 'Error updating mood', 
      error: error.message 
    });
  }
};

// Update specific section of mood
const updateMoodSection = async (req, res) => {
  try {
    const { moodType, section } = req.params;
    console.log(`📝 Updating ${section} for mood: ${moodType}`);
    
    const updates = req.body;
    
    const updateQuery = {};
    updateQuery[section] = updates;
    
    const updatedMood = await Mood.findOneAndUpdate(
      { mood: moodType },
      { $set: updateQuery },
      { new: true, runValidators: true }
    );
    
    if (!updatedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log(`✅ ${section} section updated`);
    res.status(200).json(updatedMood);
  } catch (error) {
    console.error(`❌ Error updating ${section} section:`, error);
    res.status(500).json({ 
      message: `Error updating ${section} section`, 
      error: error.message 
    });
  }
};

// Delete mood by ID
const deleteMood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deleting mood with ID: ${id}`);
    
    const deletedMood = await Mood.findByIdAndDelete(id);
    
    if (!deletedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood deleted successfully');
    res.status(200).json({ 
      message: 'Mood deleted successfully',
      deletedId: id 
    });
  } catch (error) {
    console.error('❌ Error deleting mood:', error);
    res.status(500).json({ 
      message: 'Error deleting mood', 
      error: error.message 
    });
  }
};

// Delete mood by type (for backward compatibility)
const deleteMoodByType = async (req, res) => {
  try {
    const { moodType } = req.params;
    console.log(`🗑️ Deleting mood with type: ${moodType}`);
    
    const deletedMood = await Mood.findOneAndDelete({ mood: moodType });
    
    if (!deletedMood) {
      return res.status(404).json({ message: 'Mood not found' });
    }

    console.log('✅ Mood deleted successfully');
    res.status(200).json({ message: 'Mood deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting mood:', error);
    res.status(500).json({ 
      message: 'Error deleting mood', 
      error: error.message 
    });
  }
};

// Bulk update moods
const bulkUpdateMoods = async (req, res) => {
  try {
    console.log('📝 Bulk updating moods...');
    
    const { moods } = req.body;
    const updatePromises = moods.map(moodData => 
      Mood.findOneAndUpdate(
        { mood: moodData.mood },
        moodData,
        { new: true, upsert: true, runValidators: true }
      )
    );
    
    const updatedMoods = await Promise.all(updatePromises);
    
    console.log(`✅ ${updatedMoods.length} moods updated`);
    res.status(200).json(updatedMoods);
  } catch (error) {
    console.error('❌ Error bulk updating moods:', error);
    res.status(500).json({ 
      message: 'Error bulk updating moods', 
      error: error.message 
    });
  }
};

module.exports = {
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
};