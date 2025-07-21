const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessageModel');

// POST /api/contact  - Submit new message
router.post('/', async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    await newMessage.save();
    res.status(201).json({ message: "Message submitted successfully" });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET /api/contact/messages  - Fetch all messages (Admin)
router.get('/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Fetching Messages Error:', error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// DELETE /api/contact/messages/:id  - Delete a message (Admin)
router.delete('/messages/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete Message Error:', error);
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;
