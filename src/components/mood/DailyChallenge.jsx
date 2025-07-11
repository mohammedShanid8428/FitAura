import React from "react";

const challengeData = {
  happy: {
    color: "orange",
    challenges: [
      "Compliment one person today, and watch joy multiply.",
      "Take a photo of something that makes you smile.",
      "Share a positive memory with someone close.",
    ],
  },
  sad: {
    color: "blue",
    challenges: [
      "Go for a short walk and observe your surroundings silently.",
      "Write down 3 things that brought you comfort today.",
      "Listen to a calming song or nature sounds for 5 minutes.",
    ],
  },
  angry: {
    color: "red",
    challenges: [
      "Pause before reacting—count to 5 and breathe deeply.",
      "Write your feelings in a private journal.",
      "Do a quick physical task like 10 push-ups or a short jog.",
    ],
  },
};

export default function DailyChallenge({ mood = "happy" }) {
  const data = challengeData[mood] || challengeData.happy;

  return (
    <section className="bg-orange-50 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl font-bold text-${data.color}-600 mb-6`}>
          💪 Daily Challenges
        </h2>

        <div className="space-y-6">
          {data.challenges.map((challenge, index) => (
            <blockquote
              key={index}
              className={`bg-white border-l-8 border-${data.color}-400 text-${data.color}-800 text-lg md:text-xl italic font-medium px-8 py-6 rounded-lg shadow-sm`}
            >
              “{challenge}”
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
