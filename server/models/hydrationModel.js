// models/Hydration.js
const mongoose = require('mongoose');

const hydrationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toDateString()
  },
  completed: [{
    type: String,
    required: true
  }],
  dailyGoal: {
    type: Number,
    default: 8,
    min: 1,
    max: 20
  },
  totalGlasses: {
    type: Number,
    default: 0,
    min: 0
  },
  percentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  waterGoal: {
    type: Number,
    default: 2000 // in ml
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  weeklyAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  reminderEnabled: {
    type: Boolean,
    default: false
  },
  completedAt: [{
    time: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
hydrationSchema.index({ userId: 1, date: 1 }, { unique: true });

// Pre-save middleware to calculate derived fields
hydrationSchema.pre('save', function(next) {
  this.totalGlasses = this.completed.length;
  this.percentage = Math.min((this.totalGlasses / this.dailyGoal) * 100, 100);
  this.waterGoal = this.dailyGoal * 250; // 250ml per glass
  this.updatedAt = new Date();
  next();
});

// Static method to get user's current hydration data
hydrationSchema.statics.getCurrentHydration = async function(userId) {
  const today = new Date().toDateString();
  let hydration = await this.findOne({ userId, date: today });
  
  if (!hydration) {
    hydration = new this({
      userId,
      date: today,
      completed: [],
      dailyGoal: 8
    });
    await hydration.save();
  }
  
  return hydration;
};

// Static method to calculate streak
hydrationSchema.statics.calculateStreak = async function(userId) {
  const hydrations = await this.find({ userId })
    .sort({ date: -1 })
    .limit(30);
  
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < hydrations.length; i++) {
    const hydrationDate = new Date(hydrations[i].date);
    const daysDiff = Math.floor((today - hydrationDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === i && hydrations[i].percentage >= 100) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

// Static method to calculate weekly average
hydrationSchema.statics.calculateWeeklyAverage = async function(userId) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklyData = await this.find({
    userId,
    createdAt: { $gte: oneWeekAgo }
  });
  
  if (weeklyData.length === 0) return 0;
  
  const totalPercentage = weeklyData.reduce((sum, day) => sum + day.percentage, 0);
  return Math.round(totalPercentage / weeklyData.length);
};

// Instance method to add completed glass
hydrationSchema.methods.addCompletedGlass = function(time) {
  if (!this.completed.includes(time)) {
    this.completed.push(time);
    this.completedAt.push({
      time,
      timestamp: new Date()
    });
  }
  return this;
};

// Instance method to remove completed glass
hydrationSchema.methods.removeCompletedGlass = function(time) {
  this.completed = this.completed.filter(t => t !== time);
  this.completedAt = this.completedAt.filter(entry => entry.time !== time);
  return this;
};

const Hydration = mongoose.model('Hydration', hydrationSchema);

module.exports = Hydration;