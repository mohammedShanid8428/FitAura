const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/contactMessageModel');

// POST /api/contact
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

module.exports = router;
