const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route: POST /api/users/register
router.post('/register', userController.userRegister);

// Route: POST /api/users/login
router.post('/login', userController.userLogin);

module.exports = router;
