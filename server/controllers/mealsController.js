const Meal = require('../models/mealsModels');

// @desc    Get all meals
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching all meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
};

// @desc    Add a new meal
exports.addMeal = async (req, res) => {
  try {
    console.log('📝 Request body:', req.body);
    console.log('📸 Request file:', req.file);
    
    const { title, mealType, benefit = '', tags = '[]' } = req.body;

    // Validation
    if (!title || !mealType) {
      return res.status(400).json({ message: 'Title and mealType are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required for new meals.' });
    }

    // Cloudinary image URL
    const imageUrl = req.file.path;

    // Parse tags from string if needed
    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (parseError) {
      console.warn('⚠️ Tags parsing failed, using empty array:', parseError);
      parsedTags = [];
    }

    const newMeal = new Meal({
      title,
      mealType,
      benefit,
      tags: parsedTags,
      imageUrl,
    });

    const savedMeal = await newMeal.save();
    console.log('✅ Meal saved successfully:', savedMeal._id);
    
    res.status(201).json({ 
      message: 'Meal added successfully!', 
      meal: savedMeal 
    });

  } catch (error) {
    console.error('❌ Add Meal Error:', error);
    res.status(500).json({ 
      message: 'Server error. Failed to add meal.',
      error: error.message 
    });
  }
};

// @desc    Update an existing meal
exports.updateMeal = async (req, res) => {
  try {
    console.log('📝 Update request body:', req.body);
    console.log('📸 Update request file:', req.file);
    
    const { id } = req.params;
    const { title, mealType, benefit = '', tags = '[]' } = req.body;

    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    // Parse tags
    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (parseError) {
      console.warn('⚠️ Tags parsing failed during update:', parseError);
      parsedTags = meal.tags; // Keep existing tags if parsing fails
    }

    // Update fields
    if (title) meal.title = title;
    if (mealType) meal.mealType = mealType;
    meal.benefit = benefit; // Allow empty benefit
    if (parsedTags && parsedTags.length >= 0) meal.tags = parsedTags;
    
    // Update image only if new file is uploaded
    if (req.file && req.file.path) {
      meal.imageUrl = req.file.path;
      console.log('🖼️ Image updated to:', req.file.path);
    }

    const updatedMeal = await meal.save();
    console.log('✅ Meal updated successfully:', updatedMeal._id);
    
    res.status(200).json({
      message: 'Meal updated successfully!',
      meal: updatedMeal
    });

  } catch (error) {
    console.error('❌ Error updating meal:', error);
    res.status(500).json({ 
      error: 'Failed to update meal',
      message: error.message 
    });
  }
};

// @desc    Delete a meal by ID
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Meal.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Meal not found' });
    }

    console.log('🗑️ Meal deleted successfully:', id);
    res.json({ message: 'Meal deleted successfully' });
    
  } catch (error) {
    console.error('❌ Error deleting meal:', error);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
};