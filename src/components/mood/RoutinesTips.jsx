import React from "react";
import { Leaf, Droplet, Cake, Sun } from "lucide-react";

export default function Routine() {
  const tips = [
    {
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
      title: "Morning Sunshine",
      content: "Start your day with 10 minutes of natural sunlight to boost serotonin and wakefulness.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Stretch & Breathe",
      content: "Simple stretching and deep breathing in the morning improves focus and reduces stress.",
    },
    {
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
      title: "Stay Hydrated",
      content: "Keep a water bottle with you and drink throughout the day to stay refreshed.",
    },
    {
      icon: <Cake className="w-6 h-6 text-red-500" />,
      title: "Avoid Sugar Crashes",
      content: "Choose balanced meals with protein and fiber to avoid energy slumps.",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          Routine Tips for a Happy Mood
        </h2>
        <p className="text-gray-200 max-w-2xl mx-auto text-sm">
          Healthy routines help stabilize your mood, improve energy levels, and boost your overall well-being.
          Start with small, daily habits and feel the difference.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-900 via-gray to-gray-600 border border-yellow-400 rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <div className="mb-4 p-2 bg-orange-100 rounded-full w-fit">
              {tip.icon}
            </div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">{tip.title}</h3>
            <p className="text-gray-200 text-sm">{tip.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-600 transition">
          Explore Tips
        </button>
      </div>
    </section>
  );
}
