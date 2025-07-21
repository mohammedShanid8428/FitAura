import React from "react";

const affirmationData = {
  happy: {
    color: "yellow-400",
    borderColor: "yellow-400",
    emoji: "😊",
    affirmation: "I radiate joy and attract positivity wherever I go.",
  },
  sad: {
    color: "blue-400",
    borderColor: "blue-400",
    emoji: "😢",
    affirmation: "My feelings are valid, and I am healing with every breath.",
  },
  angry: {
    color: "red-500",
    borderColor: "red-500",
    emoji: "😠",
    affirmation: "I choose calm and respond with clarity and strength.",
  },
};

export default function Affirmation({ mood = "happy" }) {
  const data = affirmationData[mood] || affirmationData.happy;

  return (
    <section className="relative bg-gradient-to-tr from-gray-800 to-gray-900 py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

        <div className="text-6xl animate-bounce mb-4">{data.emoji}</div>

        
        <h2 className={`text-3xl md:text-4xl font-extrabold text-${data.color} mb-6`}>
          Your Daily Affirmation
        </h2>

        {/* Card Box */}
        <div
          className={`relative bg-gray-600 border-l-8 border-${data.borderColor} text-xl md:text-2xl text-${data.color} italic font-medium px-8 py-8 rounded-3xl shadow-xl transition-all duration-500`}
        >
          <span className="absolute top-[-15px] left-8 bg-white text-sm text-gray-600 px-2">
            Affirmation
          </span>
          “{data.affirmation}”
        </div>

        
        <p className="mt-8 text-gray-200 text-sm md:text-base max-w-md">
          Repeat this to yourself today—aloud or silently. Let it ground your thoughts and actions.
        </p>
      </div>
    </section>
  );
}
