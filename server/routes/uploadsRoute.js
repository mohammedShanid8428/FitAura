const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadController');

// POST /api/uploads/image
router.post('/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });  // Frontend can save this URL in MongoDB
});

module.exports = router;
