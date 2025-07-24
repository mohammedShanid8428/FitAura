const mongoose = require("mongoose");

const routineProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  type: {
    type: String,
    default: "routine",
  },
  completedRoutines: {
    type: [String], // Or [Object] if detailed
    default: [],
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  progressPercent: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

routineProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("routineprogresses", routineProgressSchema);
