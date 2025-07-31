// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Simple auth middleware (inline version)
const authMiddleware = require('../middleware.js/authMiddleware');

// Public routes (no auth needed)
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

// Protected routes (auth required)
router.put('/profile', authMiddleware, userController.updateProfile);

router.post('/upload-image', authMiddleware, userController.uploadProfileImage);

module.exports = router;