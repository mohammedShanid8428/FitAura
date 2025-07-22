const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  themeColor: { type: String, required: true },

  hero: {
    title: String,
    subtitle: String,
    backgroundImage: String,
    gif: String,
    actions: {
      type: [{ label: String, link: String }],
      default: []
    }
  },

  enhanceTips: {
    intro: String,
    gif: String,
    services: {
      type: [{ title: String, description: String }],
      default: []
    }
  },

  nutritionTips: {
    type: [{ title: String, description: String }],
    default: []
  },

  routineTips: {
    type: [{ title: String, description: String }],
    default: []
  },

  mindfulnessTips: {
    type: [{ title: String, description: String }],
    default: []
  },

  dailyChallenges: {
    type: [{ title: String, description: String }],
    default: []
  },

  affirmation: {
    emoji: String,
    text: String,
    color: String,
    borderColor: String
  },

  moodTips: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model('Mood', MoodSchema);
