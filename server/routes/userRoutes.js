// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware.js/authMiddleware');

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);


router.put('/profile', authMiddleware, userController.updateProfile);

router.post('/upload-image', authMiddleware, userController.uploadProfileImage);

module.exports = router;