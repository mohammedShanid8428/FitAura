// models/moodModel.js
const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  link: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

const featureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const tipSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  description: { type: String }
});

const heroSchema = new mongoose.Schema({
  color: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  gif: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  actions: [actionSchema]
});

const enhanceSchema = new mongoose.Schema({
  colorClass: { type: String, required: true },
  emojisGif: { type: String, required: true },
  intro: { type: String, required: true },
  services: [serviceSchema]
});

const nutritionSchema = new mongoose.Schema({
  titleColor: { type: String, required: true },
  borderColor: { type: String, required: true },
  badgeBg: { type: String, required: true },
  badgeText: { type: String, required: true },
  buttonBg: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  features: [featureSchema]
});

const routineSchema = new mongoose.Schema({
  titleColor: { type: String, required: true },
  borderColor: { type: String, required: true },
  buttonBg: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  tips: [tipSchema]
});

const ourTipsSchema = new mongoose.Schema({
  titleColor: { type: String, required: true },
  borderColor: { type: String, required: true },
  iconBg: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  emojisGif: { type: String, required: true },
  tips: [tipSchema]
});

const dailyChallengeSchema = new mongoose.Schema({
  color: { type: String, required: true },
  challenges: [{ type: String, required: true }]
});

const affirmationSchema = new mongoose.Schema({
  color: { type: String, required: true },
  borderColor: { type: String, required: true },
  emoji: { type: String, required: true },
  affirmation: { type: String, required: true }
});

const moodSchema = new mongoose.Schema({
  moodType: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry'],
    unique: true
  },
  hero: heroSchema,
  enhance: enhanceSchema,
  nutrition: nutritionSchema,
  routine: routineSchema,
  ourTips: ourTipsSchema,
  dailyChallenge: dailyChallengeSchema,
  affirmation: affirmationSchema
}, {
  timestamps: true
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;