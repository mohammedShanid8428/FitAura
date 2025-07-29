import React, { useState, useEffect } from "react";
import axios from 'axios';

const base_url =  'http://localhost:3000/api';

export default function HydrationDash() {
  const [hydrationData, setHydrationData] = useState({
    percentage: 0,
    totalGlasses: 0,
    dailyGoal: 8,
    waterGoal: 2000,
    completed: [],
    streak: 0,
    weeklyAverage: 0
  });
  const [loading, setLoading] = useState(true);
  const [userId] = useState(() => localStorage.getItem('userId') || 'user123');

  useEffect(() => {
    fetchHydrationData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchHydrationData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchHydrationData = async () => {
    try {
      const response = await axios.get(`${base_url}/hydration/gethydration/${userId}`);
      if (response.data) {
        setHydrationData({
          percentage: response.data.percentage || 0,
          totalGlasses: response.data.totalGlasses || 0,
          dailyGoal: response.data.dailyGoal || 8,
          waterGoal: (response.data.dailyGoal || 8) * 250, // 250ml per glass
          completed: response.data.completed || [],
          streak: response.data.streak || 0,
          weeklyAverage: response.data.weeklyAverage || 0
        });
      }
    } catch (error) {
      console.error('Error fetching hydration data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBenefitsByProgress = (percentage) => {
    if (percentage >= 100) {
      return [
        { percent: "100%", title: "Perfect Hydration", desc: "Optimal brain function and energy" },
        { percent: "95%", title: "Toxin Elimination", desc: "Body effectively removes waste" },
        { percent: "90%", title: "Skin Glow", desc: "Healthy, radiant skin appearance" },
        { percent: "85%", title: "Digestion Boost", desc: "Improved nutrient absorption" }
      ];
    } else if (percentage >= 75) {
      return [
        { percent: "75%", title: "Good Progress", desc: "Better circulation and mood" },
        { percent: "70%", title: "Energy Boost", desc: "Reduced fatigue throughout day" },
        { percent: "65%", title: "Mental Clarity", desc: "Improved focus and concentration" },
        { percent: "60%", title: "Joint Health", desc: "Better joint lubrication" }
      ];
    } else if (percentage >= 50) {
      return [
        { percent: "50%", title: "Halfway There", desc: "Body starts feeling refreshed" },
        { percent: "45%", title: "Kidney Function", desc: "Better waste filtration" },
        { percent: "40%", title: "Temperature Control", desc: "Improved body heat regulation" },
        { percent: "35%", title: "Basic Hydration", desc: "Meeting minimum requirements" }
      ];
    } else {
      return [
        { percent: "25%", title: "Getting Started", desc: "Beginning hydration journey" },
        { percent: "20%", title: "Initial Benefits", desc: "Slight improvement in energy" },
        { percent: "15%", title: "Cellular Function", desc: "Basic cellular hydration" },
        { percent: "10%", title: "Foundation", desc: "Building healthy habits" }
      ];
    }
  };

  const getMotivationalMessage = (percentage) => {
    if (percentage >= 100) return "🎉 Perfect hydration achieved!";
    if (percentage >= 75) return "💪 You're doing great!";
    if (percentage >= 50) return "🌊 Keep up the good work!";
    if (percentage >= 25) return "💧 Making progress!";
    return "🚀 Let's start hydrating!";
  };

  const benefits = getBenefitsByProgress(hydrationData.percentage);

  if (loading) {
    return (
      <section className="p-6 flex justify-center">
        <div className="bg-[#1f1f1f] rounded-xl shadow-md p-6 w-full max-w-4xl text-gray-300 border border-gray-700">
          <div className="text-center text-lime-400">Loading hydration data...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 flex justify-center">
      <div className="bg-[#1f1f1f] rounded-xl shadow-md p-6 w-full max-w-4xl text-gray-300 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-lime-400">
            Hydration Benefits Dashboard
          </h2>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="text-lime-400 text-2xl font-bold">{hydrationData.totalGlasses}</div>
            <div className="text-white text-sm">Glasses Today</div>
            <div className="text-xs text-gray-500">Goal: {hydrationData.dailyGoal}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="text-blue-400 text-2xl font-bold">{Math.round(hydrationData.percentage)}%</div>
            <div className="text-white text-sm">Progress</div>
            <div className="text-xs text-gray-500">Daily Goal</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="text-green-400 text-2xl font-bold">{hydrationData.streak}</div>
            <div className="text-white text-sm">Day Streak</div>
            <div className="text-xs text-gray-500">Consecutive days</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <div className="text-purple-400 text-2xl font-bold">{Math.round(hydrationData.weeklyAverage)}%</div>
            <div className="text-white text-sm">Weekly Avg</div>
            <div className="text-xs text-gray-500">Last 7 days</div>
          </div>
        </div>

        <div className="flex justify-center items-center relative py-16">
          {/* Left Benefits */}
          <div className="space-y-6 text-right pr-6 text-sm w-1/3">
            {benefits.slice(0, 2).map((benefit, index) => (
              <div key={index} className={`p-3 rounded-lg ${hydrationData.percentage >= parseInt(benefit.percent) ? 'bg-lime-900/30 border border-lime-500/30' : 'bg-gray-800'}`}>
                <div className={`font-bold ${hydrationData.percentage >= parseInt(benefit.percent) ? 'text-lime-400' : 'text-gray-500'}`}>
                  {benefit.percent}
                </div>
                <div className={`font-semibold ${hydrationData.percentage >= parseInt(benefit.percent) ? 'text-white' : 'text-gray-400'}`}>
                  {benefit.title}
                </div>
                <div className="text-xs text-gray-500">{benefit.desc}</div>
              </div>
            ))}
          </div>

          {/* Glass Visualization */}
          <div className="relative w-32 h-64 bg-gray-800 rounded-b-full border-2 border-gray-600 overflow-hidden shadow-inner">
            <div
              className="absolute bottom-0 w-full transition-all duration-1000 flex items-end justify-center text-black text-lg font-bold"
              style={{ 
                height: `${Math.min(hydrationData.percentage, 100)}%`,
                background: hydrationData.percentage >= 100 
                  ? 'linear-gradient(to top, #84cc16, #65a30d)' 
                  : hydrationData.percentage >= 75 
                    ? 'linear-gradient(to top, #3b82f6, #1d4ed8)'
                    : hydrationData.percentage >= 50
                      ? 'linear-gradient(to top, #f59e0b, #d97706)'
                      : 'linear-gradient(to top, #ef4444, #dc2626)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-bold drop-shadow-lg">
                  {Math.round(hydrationData.percentage)}%
                </span>
              </div>
              {/* Water wave effect */}
              <div 
                className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-pulse"
                style={{
                  borderRadius: '50% 50% 0 0',
                  transform: 'scaleX(1.1)'
                }}
              />
            </div>
            
            {/* Hour markers */}
            <div className="absolute inset-0 flex flex-col justify-between p-2">
              {hydrationData.completed.map((time, index) => (
                <div key={index} className="text-right text-xs text-lime-400">
                  ✓
                </div>
              ))}
            </div>
          </div>

          {/* Right Benefits */}
          <div className="space-y-6 text-left pl-6 text-sm w-1/3">
            {benefits.slice(2, 4).map((benefit, index) => (
              <div key={index} className={`p-3 rounded-lg ${hydrationData.percentage >= parseInt(benefit.percent) ? 'bg-lime-900/30 border border-lime-500/30' : 'bg-gray-800'}`}>
                <div className={`font-bold ${hydrationData.percentage >= parseInt(benefit.percent) ? 'text-lime-400' : 'text-gray-500'}`}>
                  {benefit.percent}
                </div>
                <div className={`font-semibold ${hydrationData.percentage >= parseInt(benefit.percent) ? 'text-white' : 'text-gray-400'}`}>
                  {benefit.title}
                </div>
                <div className="text-xs text-gray-500">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hydration Info */}
        <div className="text-center mt-6">
          <div className="text-lg font-semibold text-lime-400 mb-2">
            {getMotivationalMessage(hydrationData.percentage)}
          </div>
          <div className="text-sm text-gray-400">
            {Math.round(hydrationData.percentage)}% of {hydrationData.waterGoal}ml daily goal
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {hydrationData.totalGlasses} glasses completed • {hydrationData.dailyGoal - hydrationData.totalGlasses} remaining
          </div>
          
          {/* Progress Timeline */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: hydrationData.dailyGoal }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                  i < hydrationData.totalGlasses
                    ? 'bg-lime-500 border-lime-400 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-400'
                }`}
              >
                {i < hydrationData.totalGlasses ? '💧' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={fetchHydrationData}
            className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Refresh Data
          </button>
          <button 
            onClick={() => window.location.href = '/hydration-tracker'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Go to Tracker
          </button>
        </div>
      </div>
    </section>
  );
}