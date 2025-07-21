const Contact = require('../models/contactMessageModel');

exports.submitMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, section, message } = req.body;

    if (!firstName || !email || !message || !section) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new Contact({
      firstName,
      lastName,
      email,
      section,
      message,
    });

    await newMessage.save();

    res.status(201).json({ message: "Message submitted successfully." });

  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};
