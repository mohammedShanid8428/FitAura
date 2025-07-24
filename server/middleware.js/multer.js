const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // ✅ Use configured instance

// 💪 Common reusable function for creating a Cloudinary storage by folder
const createCloudinaryStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary, // ✅ configured instance
    params: {
      folder: `FitAura/${folderName}`,
      
    },
  });
};

// 🎯 Define storage instances
const routineStorage = createCloudinaryStorage('Routines');
const nutritionStorage = createCloudinaryStorage('Nutritions');
const moodStorage = createCloudinaryStorage('Moods');

// 📤 Define upload handlers
const routineUpload = multer({ storage: routineStorage });
const nutritionUpload = multer({ storage: nutritionStorage });
const moodUpload = multer({ storage: moodStorage });

module.exports = {
  routineUpload,
  nutritionUpload,
  moodUpload,
};
