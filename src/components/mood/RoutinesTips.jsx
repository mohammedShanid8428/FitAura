import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, HeartPulse, Footprints, Move } from "lucide-react";

const moodThemes = {
  happy: {
    titleColor: "text-yellow-400",
    borderColor: "border-yellow-400",
    buttonBg: "bg-yellow-400 hover:bg-yellow-500",
  },
  sad: {
    titleColor: "text-blue-400",
    borderColor: "border-blue-400",
    buttonBg: "bg-blue-400 hover:bg-blue-500",
  },
  angry: {
    titleColor: "text-red-400",
    borderColor: "border-red-400",
    buttonBg: "bg-red-400 hover:bg-red-500",
  },
};

export default function Routine({ mood = "happy" }) {
  const theme = moodThemes[mood] || moodThemes.happy;

  const tips = [
    {
      icon: <Dumbbell className="w-6 h-6 text-yellow-500" />,
      title: "Morning Strength Boost",
      content: "Start your day with light dumbbell exercises to energize both body and mind.",
    },
    {
      icon: <Footprints className="w-6 h-6 text-green-400" />,
      title: "Short Cardio Session",
      content: "A quick 10-minute jog or brisk walk can lift your mood and focus.",
    },
    {
      icon: <Move className="w-6 h-6 text-purple-500" />,
      title: "Stretch to Destress",
      content: "Simple morning stretches release muscle tension and calm your mind.",
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-pink-500" />,
      title: "Pulse Check Meditation",
      content: "Focus on your heartbeat while breathing deeply for 5 minutes to center yourself.",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme.titleColor}`}>
          Routine Tips for a {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm">
          Build mood-boosting habits with easy daily routines. Focus on mindful movement and energy-building exercises tailored to your emotions.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 ${theme.borderColor} border rounded-xl p-5 shadow-sm hover:shadow-lg transition`}
          >
            <div className="mb-4 p-2 bg-white/10 rounded-full w-fit">
              {item.icon}
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${theme.titleColor}`}>
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm">{item.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/routines">
          <button className={`${theme.buttonBg} text-black px-6 py-2 rounded-full transition`}>
            Explore Tips
          </button>
        </Link>
      </div>
    </section>
  );
}
