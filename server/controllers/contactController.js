const ContactMessage = require('../models/contactMessageModel');

// Submit a new contact message
exports.submitMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, section, message } = req.body;

    // Basic validation
    if (!firstName || !email || !section || !message) {
      return res.status(400).json({ message: 'firstName, email, section, and message are required.' });
    }

    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      section,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message submitted successfully.' });

  } catch (error) {
    console.error('Failed to submit message:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// Fetch all contact messages (Admin view)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
};

// Delete a contact message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    res.json({ message: 'Message deleted successfully.' });

  } catch (error) {
    console.error('Failed to delete message:', error);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
};
