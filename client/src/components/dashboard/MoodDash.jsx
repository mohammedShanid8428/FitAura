import React, { useState } from "react";

const moods = [
  { label: "Excited 😄", color: "bg-blue-400", text: "You’re feeling energetic and pumped!" },
  { label: "Happy 😊", color: "bg-green-400", text: "Great to see you in a good mood!" },
  { label: "Neutral 😐", color: "bg-yellow-400", text: "Balanced and calm — keep it steady." },
  { label: "Sad 😢", color: "bg-orange-400", text: "It's okay to feel down. Take care of yourself." },
  { label: "Angry 😡", color: "bg-red-500", text: "Try breathing exercises or a walk to release stress." },
];

export default function MoodDash() {
  const [currentMoodIndex, setCurrentMoodIndex] = useState(1); // Default to Happy
  const [moodRecovery, setMoodRecovery] = useState(60);

  const handleImproveMood = () => {
    const nextMood = (currentMoodIndex + 1) % moods.length;
    setCurrentMoodIndex(nextMood);
    setMoodRecovery(Math.min(100, moodRecovery + 10));
  };

  return (
    <section className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl text-center">
        <h2 className="text-lg font-semibold mb-2">
          Current Mood: <span className="text-gray-700">{moods[currentMoodIndex].label}</span>
        </h2>

        {/* Mood Meter Dial */}
        <div className="relative w-64 h-32 mx-auto my-4">
          <div className="absolute inset-0 flex justify-between items-center">
            {moods.map((mood, i) => (
              <div key={i} className={`w-10 h-20 rounded-t-full ${mood.color}`} />
            ))}
          </div>

          {/* Pointer */}
          <div className="absolute left-1/2 top-[40%] w-1 h-20 bg-black origin-bottom rotate-[calc(72deg*${currentMoodIndex}-144deg)] transition-transform duration-300" />
        </div>

        {/* Mood Explanation */}
        <div className="text-sm text-gray-500 my-2">{moods[currentMoodIndex].text}</div>

        {/* Recovery Progress */}
        <div className="text-sm text-gray-500 mb-1">Recovery Progress</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="h-3 bg-blue-500 rounded-full"
            style={{ width: `${moodRecovery}%` }}
          />
        </div>
        <div className="font-semibold text-sm mb-4">{moodRecovery}%</div>

        {/* Improve Mood Button */}
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          onClick={handleImproveMood}
        >
          Improve Mood
        </button>
      </div>
    </section>
  );
}
