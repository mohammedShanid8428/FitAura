import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { moodThemes } from "../../components/lib/moodTheme"; // adjust path as needed

const base_url = "http://localhost:3000/api";

export default function HydrationDash() {
  const [hydrationData, setHydrationData] = useState({
    percentage: 0,
    totalGlasses: 0,
    dailyGoal: 8,
    waterGoal: 2000,
    completed: [],
    streak: 0,
    weeklyAverage: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userId] = useState(() => localStorage.getItem("userId") || "user123");

  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood") || "default";
  const theme = moodThemes[mood] || moodThemes.default;

  useEffect(() => {
    fetchHydrationData();
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
          waterGoal: (response.data.dailyGoal || 8) * 250,
          completed: response.data.completed || [],
          streak: response.data.streak || 0,
          weeklyAverage: response.data.weeklyAverage || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching hydration data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBenefitsByProgress = (percentage) => {
    if (percentage >= 100) {
      return [
        { percent: "100%", title: "Perfect Hydration", desc: "Optimal brain function and energy", icon: "🧠" },
        { percent: "95%", title: "Toxin Elimination", desc: "Body effectively removes waste", icon: "🌿" },
        { percent: "90%", title: "Skin Glow", desc: "Healthy, radiant skin appearance", icon: "✨" },
        { percent: "85%", title: "Digestion Boost", desc: "Improved nutrient absorption", icon: "🍃" },
      ];
    } else if (percentage >= 75) {
      return [
        { percent: "75%", title: "Good Progress", desc: "Better circulation and mood", icon: "💪" },
        { percent: "70%", title: "Energy Boost", desc: "Reduced fatigue throughout day", icon: "⚡" },
        { percent: "65%", title: "Mental Clarity", desc: "Improved focus and concentration", icon: "🎯" },
        { percent: "60%", title: "Joint Health", desc: "Better joint lubrication", icon: "🦴" },
      ];
    } else if (percentage >= 50) {
      return [
        { percent: "50%", title: "Halfway There", desc: "Body starts feeling refreshed", icon: "🌊" },
        { percent: "45%", title: "Kidney Function", desc: "Better waste filtration", icon: "🫘" },
        { percent: "40%", title: "Temperature Control", desc: "Improved body heat regulation", icon: "🌡️" },
        { percent: "35%", title: "Basic Hydration", desc: "Meeting minimum requirements", icon: "💧" },
      ];
    } else {
      return [
        { percent: "25%", title: "Getting Started", desc: "Beginning hydration journey", icon: "🚀" },
        { percent: "20%", title: "Initial Benefits", desc: "Slight improvement in energy", icon: "🌱" },
        { percent: "15%", title: "Cellular Function", desc: "Basic cellular hydration", icon: "🔬" },
        { percent: "10%", title: "Foundation", desc: "Building healthy habits", icon: "🏗️" },
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

  const getWaterColor = (percentage) => {
    if (percentage >= 100) return 'from-emerald-400 via-teal-500 to-cyan-600';
    if (percentage >= 75) return 'from-blue-400 via-blue-500 to-indigo-600';
    if (percentage >= 50) return 'from-amber-400 via-orange-500 to-yellow-600';
    return 'from-red-400 via-pink-500 to-rose-600';
  };

  const benefits = getBenefitsByProgress(hydrationData.percentage);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <div className="text-cyan-300 text-xl font-semibold">Loading hydration insights...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen bg-gradient-to-br ${theme.card} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl tracking-wider font-bold  ${theme.text} mb-4`}>
            💧 Hydration Benefits Dashboard
          </h1>
          <p className={`${theme.text} font-medium text-lg`}>Track your hydration journey and unlock amazing health benefits</p>
          <div className={`text-sm ${theme.text} mt-2`}>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-cyan-400 text-3xl font-bold">{hydrationData.totalGlasses}</div>
              <div className="text-3xl">💧</div>
            </div>
            <div className={`${theme.text}text-sm font-medium`}>Glasses Today</div>
            <div className="text-xs font-medium tracking-wider text-slate-400">Goal: {hydrationData.dailyGoal}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-blue-400 text-3xl font-bold">{Math.round(hydrationData.percentage)}%</div>
              <div className="text-3xl">🎯</div>
            </div>
            <div className={`${theme.text}text-sm font-medium`}>Progress</div>
            <div className="text-xs text-slate-500">Daily Goal</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-emerald-400 text-3xl font-bold">{hydrationData.streak}</div>
              <div className="text-3xl">🔥</div>
            </div>
            <div className={`${theme.text}text-sm font-medium`}>Day Streak</div>
            <div className="text-xs text-slate-500">Consecutive days</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-purple-400 text-3xl font-bold">{Math.round(hydrationData.weeklyAverage)}%</div>
              <div className="text-3xl">📊</div>
            </div>
            <div className={`${theme.text}text-sm font-medium`}>Weekly Avg</div>
            <div className="text-xs text-slate-500">Last 7 days</div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-5">

            {/* Left Benefits */}
            <div className="space-y-8 w-full lg:w-1/3">
              {benefits.slice(0, 2).map((benefit, index) => {
                const isAchieved = hydrationData.percentage >= parseInt(benefit.percent);
                const cardClasses = isAchieved
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10';

                return (
                  <div
                    key={index}
                    className={`group p-6 ${theme.card} px-2  rounded-2xl border transition-all duration-500 transform hover:scale-105`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{benefit.icon}</div>
                      <div className="flex-1">
                        <div className={`font-bold text-lg ${isAchieved ? 'text-cyan-400' : 'text-slate-400'
                          }`}>
                          {benefit.percent}
                        </div>
                        <div className={`font-semibold ${theme.text}`}>
                          {benefit.title}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">{benefit.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Glass Visualization */}
            <div className="relative">
              <div className="relative w-40 h-80 bg-gradient-to-b from-white/10 to-white/5 rounded-b-full border-4 border-white/20 overflow-hidden shadow-2xl backdrop-blur-sm">
                {/* Water */}
                <div
                  className={`absolute bottom-0 w-full transition-all duration-1000 bg-gradient-to-t ${getWaterColor(hydrationData.percentage)}`}
                  style={{ height: `${Math.min(hydrationData.percentage, 100)}%` }}
                >
                  {/* Water surface waves */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-pulse rounded-full" />
                  <div className="absolute top-2 left-0 right-0 h-2 bg-white/10 animate-pulse rounded-full" />

                  {/* Bubbles */}
                  {hydrationData.percentage > 0 && (
                    <>
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="absolute bottom-8 right-6 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                </div>

                {/* Percentage Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <span className="text-white text-xl font-bold drop-shadow-lg">
                      {Math.round(hydrationData.percentage)}%
                    </span>
                  </div>
                </div>

                {/* Measurement lines */}
                <div className="absolute inset-y-0 right-2 flex flex-col justify-between py-4">
                  {[100, 75, 50, 25].map((mark) => (
                    <div key={mark} className="flex items-center space-x-2">
                      <div className="w-4 h-px bg-white/40" />
                      <span className="text-xs text-white/60">{mark}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-b-full bg-gradient-to-t ${getWaterColor(hydrationData.percentage)} opacity-20 blur-xl -z-10`} />
            </div>

            {/* Right Benefits */}
            <div className="space-y-8 w-full lg:w-1/3">
              {benefits.slice(2, 4).map((benefit, index) => {
                const isAchieved = hydrationData.percentage >= parseInt(benefit.percent);
                const highlightStyle = isAchieved
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10';

                return (
                  <div
                    key={index}
                    className={`group p-6 px-4 rounded-2xl ${theme.card} border transition-all duration-500 transform hover:scale-105 `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{benefit.icon}</div>
                      <div className="flex-1">
                        <div className={`font-bold text-lg ${isAchieved ? 'text-cyan-400' : 'text-slate-400'}`}>
                          {benefit.percent}
                        </div>
                        <div className={`font-semibold ${theme.text}`}>
                          {benefit.title}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">{benefit.desc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
          <div className="text-center">
            <div className={`text-3xl font-bold ${theme.text} tracking-wide mb-4`}>
              {getMotivationalMessage(hydrationData.percentage)}
            </div>
            <div className={`text-lg ${theme.text} mb-2`}>
              {Math.round(hydrationData.percentage)}% of {hydrationData.waterGoal}ml daily goal completed
            </div>
            <div className="text-sm text-slate-500 mb-6">
              {hydrationData.totalGlasses} glasses completed • {hydrationData.dailyGoal - hydrationData.totalGlasses} remaining
            </div>

            {/* Progress Timeline */}
            <div className="flex justify-center items-center space-x-3 mb-6">
              {Array.from({ length: hydrationData.dailyGoal }, (_, i) => (
                <div
                  key={i}
                  className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 transform hover:scale-110 ${i < hydrationData.totalGlasses
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/10 border-white/20 text-slate-400 hover:bg-white/20'
                    }`}
                >
                  {i < hydrationData.totalGlasses ? '💧' : i + 1}
                  {i < hydrationData.totalGlasses && (
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping" />
                  )}
                </div>
              ))}
            </div>

            {/* Hydration Tips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className={`${theme.card} rounded-xl p-4 border border-white/10`}>
                <div className="text-2xl mb-2">🌅</div>
                <div className={`text-sm font-semibold ${theme.text}`}>Morning Boost</div>
                <div className="text-xs text-slate-500">Start with 2 glasses upon waking</div>
              </div>
              <div className={`${theme.card} rounded-xl p-4 border border-white/10`}>
                <div className="text-2xl mb-2">🍽️</div>
                <div className={`text-sm font-semibold ${theme.text}`}>Meal Hydration</div>
                <div className="text-xs text-slate-500">Drink before and after meals</div>
              </div>
              <div className={`${theme.card} rounded-xl p-4 border border-white/10`}>
                <div className="text-2xl mb-2">🏃</div>
                <div className={`text-sm font-semibold ${theme.text}`}>Active Recovery</div>
                <div className="text-xs text-slate-500">Extra water during exercise</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={fetchHydrationData}
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <div className="flex items-center space-x-2">
              <div className="animate-spin group-hover:animate-none transition-all">🔄</div>
              <span>Refresh Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => window.location.href = '/routines/hydrationplan'}
            className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40"
          >
            <div className="flex items-center space-x-2">
              <div className="group-hover:animate-bounce">🎯</div>
              <span>Go to Tracker</span>
            </div>
          </button>

          <button
            onClick={() => {
              const message = `💧 Hydration Update!\n\n🎯 Progress: ${Math.round(hydrationData.percentage)}%\n💧 Glasses: ${hydrationData.totalGlasses}/${hydrationData.dailyGoal}\n🔥 Streak: ${hydrationData.streak} days\n\nKeep up the great work! 💪`;
              if (navigator.share) {
                navigator.share({ title: 'My Hydration Progress', text: message });
              } else {
                navigator.clipboard.writeText(message);
                alert('Progress copied to clipboard!');
              }
            }}
            className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40"
          >
            <div className="flex items-center space-x-2">
              <div className="group-hover:animate-pulse">📤</div>
              <span>Share Progress</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}