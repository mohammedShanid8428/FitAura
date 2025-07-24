const Routine = require('../models/routineModel');
const { routineUpload } = require('../middleware.js/multer'); // Cloudinary upload middleware
const cloudinary = require('../config/cloudinary');

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

// Add a new routine with Cloudinary file upload
exports.addRoutine = async (req, res) => {
  routineUpload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({ message: err.message || 'File upload failed' });
    }

    try {
      const { title, description, duration } = req.body;

      if (!title || !req.file) {
        return res.status(400).json({ message: 'Title and image are required' });
      }

      const imageUrl = req.file.path;

      const newRoutine = new Routine({
        title: title.trim(),
        description: description?.trim() || "",
        imageUrl,
        duration: parseInt(duration) || 30
      });

      await newRoutine.save();

      res.status(201).json({
        message: 'Routine added successfully',
        routine: newRoutine
      });

    } catch (error) {
      console.error('Add Routine Error:', error);

      if (req.file && req.file.public_id) {
        try {
          await cloudinary.uploader.destroy(req.file.public_id);
        } catch (deleteErr) {
          console.error('Error deleting from Cloudinary:', deleteErr);
        }
      }

      res.status(500).json({ message: 'Failed to add routine' });
    }
  });
};

// Update routine (with optional new image)
exports.updateRoutine = async (req, res) => {
  routineUpload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({ message: err.message || 'File upload failed' });
    }

    try {
      const { id } = req.params;
      const { title, description, duration } = req.body;

      const existingRoutine = await Routine.findById(id);
      if (!existingRoutine) {
        return res.status(404).json({ message: 'Routine not found' });
      }

      const updateData = {
        title: title?.trim(),
        description: description?.trim() || "",
        duration: parseInt(duration) || 30,
      };

      let oldPublicId = null;
      if (existingRoutine.imageUrl) {
        const urlParts = existingRoutine.imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        const publicIdWithExt = filename.split('.')[0];
        oldPublicId = `FitAura/Routines/${publicIdWithExt}`;
      }

      if (req.file) {
        updateData.imageUrl = req.file.path;

        if (oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId);
          } catch (deleteErr) {
            console.error('Error deleting old image from Cloudinary:', deleteErr);
          }
        }
      }

      const updatedRoutine = await Routine.findByIdAndUpdate(id, updateData, { new: true });

      res.json({
        message: 'Routine updated successfully',
        routine: updatedRoutine
      });

    } catch (error) {
      console.error('Update Routine Error:', error);
      res.status(500).json({ message: 'Failed to update routine' });
    }
  });
};


// Delete a routine and its image
exports.deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    const routine = await Routine.findById(id);

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    let publicId = null;
    if (routine.imageUrl) {
      const urlParts = routine.imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      const publicIdWithExt = filename.split('.')[0];
      publicId = `FitAura/Routines/${publicIdWithExt}`;
    }

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error('Cloudinary deletion error:', cloudErr);
      }
    }

    await Routine.findByIdAndDelete(id);

    res.status(200).json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error('Delete Routine Error:', error);
    res.status(500).json({ message: 'Failed to delete routine' });
  }
};
