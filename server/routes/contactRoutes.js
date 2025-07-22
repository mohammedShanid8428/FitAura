const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route: POST /api/contact
router.post('/addmessage', contactController.submitMessage);

// Route: GET /api/contact/messages
router.get('/getmessages', contactController.getAllMessages);

// Route: DELETE /api/contact/messages/:id
router.delete('/deletemessage/:id', contactController.deleteMessage);

module.exports = router;
