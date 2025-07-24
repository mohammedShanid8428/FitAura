const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit a new contact message
router.post('/messages', contactController.submitMessage);

// Get all contact messages
router.get('/messages', contactController.getAllMessages);

// Delete a contact message by ID
router.delete('/messages/:id', contactController.deleteMessage);

module.exports = router;
