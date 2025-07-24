import React, { useState } from "react";
import { Sparkles, Smile, Meh, Frown, Angry } from "lucide-react";

const moods = [
  {
    label: "Excited 😄",
    icon: <Sparkles className="text-lime-500" size={24} />,
    description: "You’re feeling energetic and pumped!",
    bg: "bg-lime-100",
  },
  {
    label: "Happy 😊",
    icon: <Smile className="text-lime-500" size={24} />,
    description: "Great to see you in a good mood!",
    bg: "bg-lime-200",
  },
  {
    label: "Neutral 😐",
    icon: <Meh className="text-yellow-500" size={24} />,
    description: "Balanced and calm — keep it steady.",
    bg: "bg-gray-100",
  },
  {
    label: "Sad 😢",
    icon: <Frown className="text-orange-500" size={24} />,
    description: "It’s okay to feel down. Take care of yourself.",
    bg: "bg-orange-100",
  },
  {
    label: "Angry 😡",
    icon: <Angry className="text-red-500" size={24} />,
    description: "Try breathing exercises or a walk to release stress.",
    bg: "bg-red-100",
  },
];

export default function MoodDash() {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(1); // default: Happy
  const [moodRecovery, setMoodRecovery] = useState(60);

  const handleImproveMood = () => {
    const next = (currentMoodIndex + 1) % moods.length;
    setCurrentMoodIndex(next);
    setMoodRecovery((prev) => Math.min(100, prev + 10));
  };

  return (
    <section className="p-4">
      <div className="bg-[#111] text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-lime-400 mb-2">Mood Tracker</h2>
        <p className="text-gray-400 mb-4">Tap on your current mood or improve your recovery!</p>

        {/* Mood Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {moods.map((mood, index) => (
            <div
              key={index}
              onClick={() => setCurrentMoodIndex(index)}
              className={`rounded-xl p-4 cursor-pointer transition transform hover:scale-105 shadow-md border border-gray-700 ${
                index === currentMoodIndex ? "ring-2 ring-lime-400" : ""
              } ${mood.bg}`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {mood.icon}
                <span className="font-medium text-black">{mood.label}</span>
              </div>
              <p className="text-xs text-gray-700">{mood.description}</p>
            </div>
          ))}
        </div>

        {/* Recovery Progress */}
        <div className="text-sm text-gray-300 mb-1">Recovery Progress</div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-3 bg-lime-400 rounded-full transition-all"
            style={{ width: `${moodRecovery}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-300 mb-4">{moodRecovery}%</div>

        {/* Improve Button */}
        <button
          onClick={handleImproveMood}
          className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-4 py-2 rounded-full transition"
        >
          Improve Mood
        </button>
      </div>
    </section>
  );
}
