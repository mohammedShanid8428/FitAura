import React, { useEffect, useState } from "react";
import axios from "axios";

const moodMeta = {
  happy: { 
    gradient: "from-yellow-400 to-amber-500",
    emoji: "😊", 
    label: "Happy",
    buttonColor: "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
  },
  sad: { 
    gradient: "from-blue-400 to-indigo-500",
    emoji: "😢", 
    label: "Sad",
    buttonColor: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
  },
  angry: { 
    gradient: "from-red-500 to-rose-600",
    emoji: "😠", 
    label: "Angry",
    buttonColor: "bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800"
  },
};

export default function MoodEmojiProgress({ mood = "happy", userId }) {
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ completed: 0, total: 0 });

  const { gradient, emoji, label, buttonColor } = moodMeta[mood] || moodMeta.happy;

  // Function to increment progress by 10%
  const boostProgress = () => {
    const newProgress = Math.min(progress + 10, 100);
    setProgress(newProgress);
    
    // Update completed activities based on new progress
    const newCompleted = Math.ceil((newProgress / 100) * stats.total);
    setStats(prev => ({ ...prev, completed: newCompleted }));
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`/api/moodprogress/${userId}/${mood}`);
        setProgress(res.data.progress || 0);
        setStats({
          completed: res.data.activitiesDone || 0,
          total: res.data.totalActivities || 0,
        });
      } catch (error) {
        console.error("Failed to fetch mood progress", error);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [mood, userId]);

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 md:p-8 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{emoji}</div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {label} Mood Progress
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white">{progress}%</span>
          </div>
        </div>

        {/* Progress Container */}
        <div className="relative mb-12">
          {/* Track */}
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            {/* Progress Bar */}
            <div 
              className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Emoji Marker */}
          <div 
            className="absolute top-0 -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center shadow-lg z-10 relative">
                <span className="text-xl">{emoji}</span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.completed}</p>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-gray-400">Total Activities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{progress}%</p>
            <p className="text-sm text-gray-400">Progress</p>
          </div>
        </div>

        {/* Boost Button */}
        <button 
          onClick={boostProgress}
          disabled={progress >= 100}
          className={`${buttonColor} w-full py-3.5 rounded-xl text-white font-bold text-lg transition-all transform hover:scale-[1.02] shadow-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Boost Mood +10%
        </button>

        {/* Explore Button */}
        <button 
          className="w-full py-3.5 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-bold text-lg transition-all"
        >
          Explore Mood Activities
        </button>
      </div>
    </div>
  );
}