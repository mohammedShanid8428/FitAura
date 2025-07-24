const ContactMessage = require('../models/contactMessageModel');

// Submit a new contact message
exports.submitMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, section, message } = req.body;

    if (!firstName || !email || !section || !message) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      section,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message submitted successfully.' });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

// Fetch all contact messages (Admin view)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
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

    res.status(200).json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Failed to delete message.' });
  }
};
