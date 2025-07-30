import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircle, TrendingUp, Calendar, Target } from "lucide-react";
import { useProgress } from "../../context/ Context";
import { moodThemes } from "../../components/lib/moodTheme";
import { useSearchParams } from "react-router-dom";

// Sample routine data for display
const routines = [
  {
    type: "stretch",
    label: "Stretch Routine",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    color: "green"
  },
  {
    type: "yoga",
    label: "Yoga Routine",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
    color: "purple"
  }
];

// Progress Bar Component
const ProgressBar = ({ value, color = "blue" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full transition-all duration-500 ${
        color === "green" 
          ? "bg-gradient-to-r from-green-400 to-green-600" 
          : color === "purple"
            ? "bg-gradient-to-r from-purple-400 to-purple-600"
            : "bg-gradient-to-r from-blue-500 to-green-500"
      }`}
      style={{ width: `${Math.min(value, 100)}%` }}
    />
  </div>
);

// Benefits based on progress
const getBenefitsByProgress = (progress, type) => {
  const benefits = {
    stretch: [
      { title: "Flexibility", desc: "Improved range of motion" },
      { title: "Posture", desc: "Better spinal alignment" },
      { title: "Circulation", desc: "Enhanced blood flow" }
    ],
    yoga: [
      { title: "Balance", desc: "Better stability and coordination" },
      { title: "Mindfulness", desc: "Reduced stress and anxiety" },
      { title: "Strength", desc: "Core and muscle strengthening" }
    ]
  };

  const typeBenefits = benefits[type] || benefits.stretch;

  if (progress >= 80) return typeBenefits;
  if (progress >= 50) return typeBenefits.slice(0, 2);
  if (progress >= 20) return typeBenefits.slice(0, 1);
  return [];
};

export default function RoutineDash() {
    const [searchParams] = useSearchParams();
    const mood = searchParams.get("mood") || "default";
    const theme = moodThemes[mood] || moodThemes.default;
  const navigate = useNavigate();
  const { getOverallStats, progress, getTypeProgress } = useProgress();

  // Memoize stats to prevent unnecessary re-calculations
  const stats = useMemo(() => {
    try {
      return getOverallStats();
    } catch (error) {
      console.error("Error getting overall stats:", error);
      return {
        overallProgress: 0,
        stretchProgress: 0,
        yogaProgress: 0,
        completedToday: 0,
        totalExercises: 0,
        stretchCompletedDays: 0,
        yogaCompletedDays: 0,
        totalCompletedDays: 0
      };
    }
  }, [progress, getOverallStats]);

  // Get detailed progress for each routine type
  const stretchDetails = useMemo(() => {
    return getTypeProgress("stretch") || {
      overallProgress: 0,
      totalDays: 0,
      completedDays: 0,
      totalExercises: 0,
      completedExercises: 0,
      daysProgress: {}
    };
  }, [progress, getTypeProgress]);

  const yogaDetails = useMemo(() => {
    return getTypeProgress("yoga") || {
      overallProgress: 0,
      totalDays: 0,
      completedDays: 0,
      totalExercises: 0,
      completedExercises: 0,
      daysProgress: {}
    };
  }, [progress, getTypeProgress]);

 const handleContinueRoutine = (type) => {
  const typeProgress = progress[type]?.days || {};
  const dayNumbers = Object.keys(typeProgress).map(Number).sort((a, b) => a - b);
  
  let nextDay = 1;
  if (dayNumbers.length > 0) {
    const lastDay = Math.max(...dayNumbers);
    const lastDayData = typeProgress[lastDay];

    if (lastDayData && lastDayData.todayProgress < 100) {
      nextDay = lastDay;
    } else {
      nextDay = lastDay >= 7 ? 1 : lastDay + 1;
    }
  }

  // ✅ Navigate to new URL format
  navigate(`/routines/Planner?day=${nextDay}&type=${type}`);
};

  // Calculate today's progress for each routine type
  const getTodayProgressForType = (type) => {
    const typeProgress = progress[type]?.days || {};
    const dayNumbers = Object.keys(typeProgress).map(Number);
    
    if (dayNumbers.length === 0) {
      return { completed: 0, total: 0, day: 1 };
    }
    
    const latestDay = Math.max(...dayNumbers);
    const todayData = typeProgress[latestDay] || { completed: [], totalExercises: 0 };
    
    return {
      completed: todayData.completed.length,
      total: todayData.totalExercises,
      day: latestDay,
      progress: todayData.todayProgress || 0
    };
  };

  const stretchToday = getTodayProgressForType("stretch");
  const yogaToday = getTodayProgressForType("yoga");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${theme.card} ${theme.text} p-6 rounded-xl shadow-lg`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Today's Progress</h2>
          <TrendingUp className="w-6 h-6" />
        </div>
        <p className="text-4xl font-bold mb-2">{stats.overallProgress}%</p>
        <p className={`${theme.text} mb-4`}>
          {stats.completedToday} of {stats.totalExercises} exercises completed
        </p>
        <ProgressBar value={stats.overallProgress} />
        <div className={`flex justify-between text-sm mt-3 ${theme.text}`}>
          <span>Stretch: {stats.stretchProgress}%</span>
          <span>Yoga: {stats.yogaProgress}%</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`${theme.card} rounded-lg p-4 text-center shadow`}>
          <div className="text-2xl font-bold text-green-600">{stats.totalCompletedDays}</div>
          <div className={`text-xs ${theme.text}`}>Days Completed</div>
        </div>
        <div className={`${theme.card} rounded-lg p-4 text-center shadow`}>
          <div className="text-2xl font-bold text-blue-600">{stretchDetails.completedExercises + yogaDetails.completedExercises}</div>
          <div className={`text-xs ${theme.text}`}>Total Exercises</div>
        </div>
        <div className={`${theme.card} rounded-lg p-4 text-center shadow`}>
          <div className="text-2xl font-bold text-purple-600">{Math.round((stats.stretchProgress + stats.yogaProgress) / 2)}%</div>
          <div className={`text-xs ${theme.text}`}>Avg Progress</div>
        </div>
      </div>

      {/* Routine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routines.map((routine) => {
          const value = routine.type === "stretch" ? stats.stretchProgress : stats.yogaProgress;
          const todayData = routine.type === "stretch" ? stretchToday : yogaToday;
          const details = routine.type === "stretch" ? stretchDetails : yogaDetails;
          const benefits = getBenefitsByProgress(value, routine.type);

          return (
            <div key={routine.type} className={`${theme.card} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="relative h-48">
                <img 
                  src={routine.image} 
                  alt={routine.label} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=Routine";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-bold">{routine.label}</h3>
                  <p className="text-white/90 text-sm">Day {todayData.day}</p>
                </div>
                {value > 0 && (
                  <div className="absolute top-3 right-3 bg-white/95 text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                    {value}%
                  </div>
                )}
              </div>
              
              <div className="p-5 space-y-4">
                {/* Today's Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${theme.text} font-semibold `}>Today's Session</span>
                    <span className="text-sm text-gray-900">{todayData.progress}%</span>
                  </div>
                  <ProgressBar value={todayData.progress} color={routine.color} />
                  <div className="text-xs text-gray-500 mt-1">
                    {todayData.completed} of {todayData.total} exercises completed
                  </div>
                </div>

                {/* Overall Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${theme.text} font-semibold `}>Overall Progress</span>
                    <span className="text-sm text-gray-500">{value}%</span>
                  </div>
                  <ProgressBar value={value} color={routine.color} />
                  <div className="text-xs text-gray-500 mt-1">
                    {details.completedDays} of 7 days • {details.completedExercises} exercises total
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <div>
                        <span className="font-medium text-gray-700">{benefit.title}</span>
                        <span className="text-gray-500"> – {benefit.desc}</span>
                      </div>
                    </div>
                  ))}
                  {benefits.length === 0 && (
                    <div className={`${theme.text} text-sm italic`}>
                      Start your routine to unlock benefits!
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleContinueRoutine(routine.type)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 transition-all transform hover:scale-105 ${
                    routine.color === "green" 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-purple-500 hover:bg-purple-600"
                  }`}
                >
                  <PlayCircle size={20} />
                  <span>
                    {todayData.total === 0 
                      ? 'Start Routine' 
                      : todayData.progress === 100 
                        ? 'Start Next Day'
                        : 'Continue Day ' + todayData.day
                    }
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Overview */}
      <div className={`${theme.card} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-lg">Weekly Progress Overview</h3>
        </div>

        <div className="space-y-6">
          {/* Stretch Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${theme.text}`}>Stretch Routine</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {stats.stretchProgress}%
              </span>
            </div>
            <ProgressBar value={stats.stretchProgress} color="green" />
            <div className={`grid grid-cols-2 gap-4 text-sm ${theme.text}`}>
              <div>Days: {stretchDetails.completedDays}/7</div>
              <div>Exercises: {stretchDetails.completedExercises}</div>
            </div>
          </div>

          {/* Yoga Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${theme.text}`}>Yoga Routine</span>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                {stats.yogaProgress}%
              </span>
            </div>
            <ProgressBar value={stats.yogaProgress} color="purple" />
            <div className={`grid grid-cols-2 gap-4 text-sm ${theme.text}`}>
              <div>Days: {yogaDetails.completedDays}/7</div>
              <div>Exercises: {yogaDetails.completedExercises}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Footer */}
      <div className={`${theme.card} rounded-xl shadow-lg p-6 text-center`}>
        <div className="mb-3">
          {stats.overallProgress === 0 ? (
            <span className="text-3xl">🌟</span>
          ) : stats.overallProgress < 30 ? (
            <span className="text-3xl">💪</span>
          ) : stats.overallProgress < 70 ? (
            <span className="text-3xl">🔥</span>
          ) : (
            <span className="text-3xl">🏆</span>
          )}
        </div>
        <p className={`${theme.text} font-medium`}>
          {stats.overallProgress === 0
            ? "Ready to start your wellness journey? Your first routine awaits!"
            : stats.overallProgress < 30
              ? "Great start! Consistency is key to building healthy habits."
              : stats.overallProgress < 70
                ? "You're building momentum! Keep up the fantastic work."
                : "Outstanding progress! You're truly committed to your wellness."}
        </p>
        {stats.overallProgress > 0 && (
          <div className="mt-3 text-sm text-gray-600">
            Keep going – you've got this! 💚
          </div>
        )}
      </div>
    </div>
  );
}