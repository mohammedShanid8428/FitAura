const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true    // Example: 'Nutrition', 'Moods', 'Routines'
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Stored in MongoDB collection named "contactmessages"
const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

module.exports = ContactMessage;
