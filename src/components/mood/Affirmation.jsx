import React from "react";

const affirmationData = {
  happy: {
    color: "orange",
    emoji: "😊",
    affirmation: "I radiate joy and attract positivity wherever I go.",
  },
  sad: {
    color: "blue",
    emoji: "😢",
    affirmation: "My feelings are valid, and I am healing with every breath.",
  },
  angry: {
    color: "red",
    emoji: "😠",
    affirmation: "I choose calm and respond with clarity and strength.",
  },
};

export default function Affirmation({ mood = "happy" }) {
  const data = affirmationData[mood] || affirmationData.happy;

  return (
    <section className={`relative bg-gradient-to-tr from-${data.color}-50 to-${data.color}-100 py-20 px-6 md:px-12`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Emoji */}
        <div className="text-6xl animate-bounce mb-4">{data.emoji}</div>

        {/* Title */}
        <h2 className={`text-4xl md:text-5xl font-extrabold text-${data.color}-700 mb-6`}>
          Your Daily Affirmation
        </h2>

        {/* Card Box */}
        <div
          className={`relative bg-white border-l-8 border-${data.color}-500 text-${data.color}-800 text-xl md:text-2xl italic font-medium px-8 py-8 rounded-3xl shadow-xl transition-all duration-500`}
        >
          <span className="absolute top-[-15px] left-8 bg-white text-sm text-gray-500 px-2">
            Affirmation
          </span>
          “{data.affirmation}”
        </div>

        {/* Subtext */}
        <p className="mt-8 text-gray-600 text-sm md:text-base max-w-md">
          Repeat this to yourself today—aloud or silently. Let it ground your thoughts and actions.
        </p>
      </div>
    </section>
  );
}
