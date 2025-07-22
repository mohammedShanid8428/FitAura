const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },  // Example: "/uploads/exercise1.jpg"
  description: { type: String, default: "" },
  duration: { type: Number, default: 30 }  // Seconds
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
