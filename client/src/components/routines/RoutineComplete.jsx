import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Trophy, Star, Target, TrendingUp, Home, BarChart3 } from "lucide-react";
import { useProgress } from "../../context/ Context";

export default function RoutineComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getOverallStats, progress } = useProgress();
  
  const [stats, setStats] = useState({
    overallProgress: 0,
    stretchProgress: 0,
    yogaProgress: 0,
    completedToday: 0,
    totalExercises: 0
  });

  const [showConfetti, setShowConfetti] = useState(true);

  // Get routine type and day from URL params
  const params = new URLSearchParams(location.search);
  const completedType = params.get("type") || "routine";
  const completedDay = params.get("day") || "";

  useEffect(() => {
    const newStats = getOverallStats();
    setStats(newStats);
    
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [getOverallStats]);

  // Calculate achievements
  const achievements = [];
  if (stats.overallProgress >= 20) achievements.push({ icon: "🌟", text: "Getting Started", color: "bg-lime-400 text-gray-900" });
  if (stats.overallProgress >= 50) achievements.push({ icon: "💪", text: "Habit Builder", color: "bg-gray-600 text-gray-200" });
  if (stats.overallProgress >= 80) achievements.push({ icon: "🔥", text: "Consistency King", color: "bg-lime-500 text-gray-900" });
  if (stats.completedToday >= 5) achievements.push({ icon: "⚡", text: "Daily Warrior", color: "bg-gray-700 text-lime-400" });
  if (completedDay && parseInt(completedDay) === 7) achievements.push({ icon: "🏆", text: "Week Complete", color: "bg-lime-400 text-gray-900" });

  // Get motivational message
  const getMotivationalMessage = () => {
    if (stats.overallProgress === 0) return "🌟 Amazing start to your fitness journey!";
    if (stats.overallProgress < 25) return "💪 Every expert was once a beginner. Keep going!";
    if (stats.overallProgress < 50) return "🚀 Progress, not perfection. You're doing great!";
    if (stats.overallProgress < 75) return "🔥 Consistency is the key to success!";
    return "🏆 You're unstoppable! Keep up the amazing work!";
  };

  const handleReturnToDashboard = () => {
    navigate("/dashboard");
  };

  const handleViewProgress = () => {
    navigate("/routine/dashboard");
  };

  const handleContinueNextDay = () => {
    if (completedDay && parseInt(completedDay) < 7) {
      const nextDay = parseInt(completedDay) + 1;
      navigate(`/routine/day-preview?type=${completedType}&day=${nextDay}`);
    } else {
      navigate(`/routines/${completedType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <>
          <div className="absolute top-10 left-10 text-4xl opacity-60 animate-bounce text-lime-400">🎉</div>
          <div className="absolute top-20 right-20 text-3xl opacity-60 animate-bounce delay-300 text-lime-300">✨</div>
          <div className="absolute bottom-20 left-20 text-3xl opacity-60 animate-bounce delay-500 text-lime-400">💫</div>
          <div className="absolute bottom-10 right-10 text-4xl opacity-60 animate-bounce delay-700 text-lime-300">⭐</div>
          <div className="absolute top-1/2 left-1/4 text-2xl opacity-40 animate-pulse text-lime-400">🌟</div>
          <div className="absolute top-1/3 right-1/3 text-2xl opacity-40 animate-pulse delay-1000 text-lime-300">💪</div>
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Main Celebration */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">
            <Trophy className="w-20 h-20 mx-auto text-lime-400 drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-lime-400">
            {completedType.charAt(0).toUpperCase() + completedType.slice(1)} Complete!
          </h1>
          {completedDay && (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-2 inline-block mb-4 border border-lime-400">
              <p className="text-xl font-semibold text-lime-400">Day {completedDay} Finished! 🎯</p>
            </div>
          )}
          <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
            Amazing work! You've completed another step in your fitness journey and are building lasting healthy habits!
          </p>
        </div>

        {/* Progress Summary Card */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 mb-8 w-full max-w-md border border-gray-700 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 mr-2 text-lime-400" />
            <h3 className="text-xl font-semibold text-lime-400">Your Progress</h3>
          </div>
          
          {/* Overall Progress Circle */}
          <div className="text-center mb-6">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-600"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - stats.overallProgress / 100)}`}
                  className="text-lime-400 transition-all duration-1000 drop-shadow-lg"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-lime-400">{stats.overallProgress}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">Overall Progress</p>
          </div>

          {/* Individual Progress Bars */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 bg-lime-400 rounded-full mr-2"></span>
                  Stretch Progress
                </span>
                <span className="text-sm font-bold text-lime-400">{stats.stretchProgress}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-lime-400 h-2 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${stats.stretchProgress}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                  Yoga Progress
                </span>
                <span className="text-sm font-bold text-gray-300">{stats.yogaProgress}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gray-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.yogaProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-400">{stats.completedToday}</div>
              <div className="text-xs text-gray-400">Exercises Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-lime-400">
                {progress[completedType]?.completedDays?.length || 0}
              </div>
              <div className="text-xs text-gray-400">Days Completed</div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        {achievements.length > 0 && (
          <div className="mb-8 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-5 h-5 mr-2 text-lime-400" />
              <h3 className="text-lg font-semibold text-lime-400">New Achievements</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`${achievement.color} backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium flex items-center space-x-2 animate-pulse border border-gray-600`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span>{achievement.icon}</span>
                  <span>{achievement.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3">
          {/* Continue Next Day Button (if applicable) */}
          {completedDay && parseInt(completedDay) < 7 && (
            <button
              onClick={handleContinueNextDay}
              className="w-full bg-lime-400 text-gray-900 font-bold py-4 rounded-2xl text-lg shadow-lg hover:bg-lime-300 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Target className="w-5 h-5" />
              <span>Continue to Day {parseInt(completedDay) + 1}</span>
            </button>
          )}
          
          <button
            onClick={handleViewProgress}
            className="w-full bg-gray-800/80 backdrop-blur-sm border-2 border-lime-400 text-lime-400 font-bold py-4 rounded-2xl text-lg hover:bg-gray-700/80 transition-all flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-5 h-5" />
            <span>View Full Progress</span>
          </button>
          
          <button
            onClick={handleReturnToDashboard}
            className="w-full bg-gray-700/60 backdrop-blur-sm border border-gray-600 text-gray-200 font-semibold py-3 rounded-2xl text-base hover:bg-gray-600/60 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 text-center max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <p className="text-sm text-gray-300 italic leading-relaxed">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>

        {/* Next Session Preview */}
        {completedDay && parseInt(completedDay) < 7 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              💡 Next session: Day {parseInt(completedDay) + 1} {completedType} routine
            </p>
          </div>
        )}
      </div>
    </div>
  );
}