import React from "react";
import { Leaf, Droplet, Cake } from "lucide-react";

export default function Rountine() {
  const tips = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Mood-Enhancing Foods",
      content: "Eat foods like bananas, berries, and dark chocolate to naturally boost serotonin.",
    },
    {
      icon: <Droplet className="w-6 h-6 text-blue-500" />,
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily to help your brain function at its best.",
    },
    {
      icon: <Cake className="w-6 h-6 text-red-500" />,
      title: "Avoid Sugar Crashes",
      content: "Balance carbs with protein (like oats + nuts) to stabilize energy and mood.",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-10">
          Routines Tips for a Happy Mood
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 via-white to-yellow-100 border border-orange-200 rounded-xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="mb-4 p-2 bg-orange-100 rounded-full w-fit">
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-orange-800 mb-2">{tip.title}</h3>
              <p className="text-gray-700 text-sm">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
