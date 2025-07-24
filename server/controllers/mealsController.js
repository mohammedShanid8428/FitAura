// controllers/mealsController.js - Enhanced with file upload support
const Meal = require('../models/mealsModels');
const { cloudinary } = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');

// ============= PUBLIC CONTROLLERS =============

/**
 * @desc    Get all meals
 * @route   GET /api/nutrition/getmeals
 * @access  Public
 */
exports.getAllMeals = async (req, res) => {
  try {
    console.log('📋 Fetching all meals...');
    const meals = await Meal.find().sort({ createdAt: -1 });
    
    console.log(`✅ Found ${meals.length} meals`);
    res.status(200).json(meals);
  } catch (error) {
    console.error('❌ Error fetching all meals:', error);
    res.status(500).json({ 
      message: 'Failed to fetch meals',
      error: error.message 
    });
  }
};

// ============= ADMIN CONTROLLERS =============

/**
 * @desc    Add a new meal with file upload
 * @route   POST /api/nutrition/admin/add
 * @access  Admin
 */
exports.addMealWithUpload = async (req, res) => {
  try {
    const { title, mealType, benefit = '', tags = '[]' } = req.body;

    console.log('📝 Adding new meal:', { title, mealType, benefit });
    console.log('📎 File uploaded:', req.file ? req.file.filename || 'Cloudinary' : 'No file');

    // Validation
    if (!title || !mealType) {
      return res.status(400).json({ 
        message: 'Title and meal type are required.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        message: 'Image is required for new meals.' 
      });
    }

    // Parse tags
    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (err) {
      console.warn('⚠️ Tags parsing failed:', err);
      parsedTags = [];
    }

    // Handle image URL (Cloudinary or local)
    let imageUrl;
    if (req.file.path && req.file.path.startsWith('http')) {
      // Cloudinary URL
      imageUrl = req.file.path;
    } else {
      // Local file path
      imageUrl = `/uploads/nutritions/${req.file.filename}`;
    }

    // Create new meal
    const newMeal = new Meal({
      title: title.trim(),
      mealType,
      benefit: benefit.trim(),
      tags: parsedTags,
      imageUrl
    });

    const savedMeal = await newMeal.save();
    
    console.log('✅ Meal added successfully:', savedMeal._id);
    res.status(201).json({ 
      message: 'Meal added successfully!', 
      meal: savedMeal 
    });

  } catch (error) {
    console.error('❌ Add Meal Error:', error);
    
    // Cleanup uploaded file on error
    if (req.file) {
      if (req.file.public_id) {
        // Cloudinary cleanup
        try {
          await cloudinary.uploader.destroy(req.file.public_id);
        } catch (deleteErr) {
          console.error('Cloudinary cleanup error:', deleteErr);
        }
      } else if (req.file.path && !req.file.path.startsWith('http')) {
        // Local file cleanup
        try {
          fs.unlinkSync(req.file.path);
        } catch (deleteErr) {
          console.error('Local file cleanup error:', deleteErr);
        }
      }
    }
    
    res.status(500).json({ 
      message: 'Server error. Failed to add meal.', 
      error: error.message 
    });
  }
};

/**
 * @desc    Update an existing meal with optional file upload
 * @route   PUT /api/nutrition/admin/:id
 * @access  Admin
 */
exports.updateMealWithUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, mealType, benefit = '', tags = '[]' } = req.body;

    console.log('📝 Updating meal:', id);
    console.log('📎 New file uploaded:', req.file ? 'Yes' : 'No');

    // Find existing meal
    const existingMeal = await Meal.findById(id);
    if (!existingMeal) {
      // Cleanup uploaded file if meal not found
      if (req.file) {
        if (req.file.public_id) {
          await cloudinary.uploader.destroy(req.file.public_id);
        } else if (req.file.path && !req.file.path.startsWith('http')) {
          fs.unlinkSync(req.file.path);
        }
      }
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Parse tags
    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (err) {
      console.warn('⚠️ Tags parsing failed, keeping existing tags');
      parsedTags = existingMeal.tags || [];
    }

    // Prepare update data
    const updateData = {
      title: title?.trim() || existingMeal.title,
      mealType: mealType || existingMeal.mealType,
      benefit: benefit.trim(),
      tags: parsedTags
    };

    // Handle new image upload
    if (req.file) {
      // Set new image URL
      if (req.file.path && req.file.path.startsWith('http')) {
        updateData.imageUrl = req.file.path; // Cloudinary
      } else {
        updateData.imageUrl = `/uploads/nutritions/${req.file.filename}`; // Local
      }

      // Cleanup old image
      if (existingMeal.imageUrl) {
        if (existingMeal.imageUrl.startsWith('http')) {
          // Old Cloudinary image
          try {
            const urlParts = existingMeal.imageUrl.split('/');
            const filename = urlParts[urlParts.length - 1];
            const publicIdWithExt = filename.split('.')[0];
            const publicId = `FitAura/Nutritions/${publicIdWithExt}`;
            await cloudinary.uploader.destroy(publicId);
          } catch (deleteErr) {
            console.error('Old Cloudinary cleanup error:', deleteErr);
          }
        } else {
          // Old local file
          try {
            const oldFilePath = path.join('.', existingMeal.imageUrl);
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          } catch (deleteErr) {
            console.error('Old local file cleanup error:', deleteErr);
          }
        }
      }
    }

    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    console.log('✅ Meal updated successfully:', updatedMeal._id);
    res.status(200).json({ 
      message: 'Meal updated successfully!', 
      meal: updatedMeal 
    });

  } catch (error) {
    console.error('❌ Error updating meal:', error);
    
    // Cleanup uploaded file on error
    if (req.file) {
      if (req.file.public_id) {
        await cloudinary.uploader.destroy(req.file.public_id);
      } else if (req.file.path && !req.file.path.startsWith('http')) {
        fs.unlinkSync(req.file.path);
      }
    }
    
    res.status(500).json({ 
      message: 'Failed to update meal', 
      error: error.message 
    });
  }
};

/**
 * @desc    Delete a meal by ID
 * @route   DELETE /api/nutrition/admin/:id
 * @access  Admin
 */
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🗑️ Deleting meal:', id);
    
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    // Delete associated image
    if (deletedMeal.imageUrl) {
      if (deletedMeal.imageUrl.startsWith('http')) {
        // Cloudinary file
        try {
          const urlParts = deletedMeal.imageUrl.split('/');
          const filename = urlParts[urlParts.length - 1];
          const publicIdWithExt = filename.split('.')[0];
          const publicId = `FitAura/Nutritions/${publicIdWithExt}`;
          await cloudinary.uploader.destroy(publicId);
        } catch (deleteErr) {
          console.error('Cloudinary delete error:', deleteErr);
        }
      } else {
        // Local file
        try {
          const filePath = path.join('.', deletedMeal.imageUrl);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (deleteErr) {
          console.error('Local file delete error:', deleteErr);
        }
      }
    }

    console.log('✅ Meal deleted successfully');
    res.json({ message: 'Meal deleted successfully' });

  } catch (error) {
    console.error('❌ Error deleting meal:', error);
    res.status(500).json({ 
      message: 'Failed to delete meal',
      error: error.message 
    });
  }
};

// ============= LEGACY CONTROLLERS (for backward compatibility) =============

/**
 * @desc    Add a new meal (legacy - expects imageUrl in body)
 * @route   POST /api/meals/add
 * @access  Admin
 */
exports.addMeal = async (req, res) => {
  try {
    const { title, mealType, benefit = '', tags = '[]', imageUrl } = req.body;

    if (!title || !mealType || !imageUrl) {
      return res.status(400).json({ 
        message: 'Title, mealType, and imageUrl are required.' 
      });
    }

    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (err) {
      console.warn('⚠️ Tags parsing failed:', err);
      parsedTags = [];
    }

    const newMeal = new Meal({
      title: title.trim(),
      mealType,
      benefit: benefit.trim(),
      tags: parsedTags,
      imageUrl
    });

    const savedMeal = await newMeal.save();
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

/**
 * @desc    Update an existing meal (legacy - expects imageUrl in body)
 * @route   PUT /api/meals/update/:id
 * @access  Admin
 */
exports.updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, mealType, benefit = '', tags = '[]', imageUrl } = req.body;

    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    let parsedTags = [];
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (err) {
      parsedTags = meal.tags;
    }

    if (title) meal.title = title.trim();
    if (mealType) meal.mealType = mealType;
    meal.benefit = benefit.trim();
    if (parsedTags) meal.tags = parsedTags;
    if (imageUrl) meal.imageUrl = imageUrl;

    const updatedMeal = await meal.save();
    res.status(200).json({ 
      message: 'Meal updated successfully!', 
      meal: updatedMeal 
    });

  } catch (error) {
    console.error('❌ Error updating meal:', error);
    res.status(500).json({ 
      message: 'Failed to update meal', 
      error: error.message 
    });
  }
};