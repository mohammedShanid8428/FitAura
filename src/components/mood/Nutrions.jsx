import React from "react";
import { Leaf, Droplet, Cake } from "lucide-react";

export default function NutritionHero() {
  const features = [
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "Mood-Enhancing Foods",
      description: "Eat foods like bananas, berries, and dark chocolate to naturally boost serotonin.",
    },
    {
      icon: <Droplet className="w-5 h-5 text-blue-500" />,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to help your brain function at its best.",
    },
    {
      icon: <Cake className="w-5 h-5 text-red-500" />,
      title: "Avoid Sugar Crashes",
      description: "Balance carbs with protein (like oats + nuts) to stabilize energy and mood.",
    },
    {
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      title: "Mood-Enhancing Foods",
      description: "Eat foods like bananas, berries, and dark chocolate to naturally boost serotonin.",
    },
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Content */}
        <div>
          <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-xs mb-3 inline-block">
            Nutrition Health Guide
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 leading-tight mb-4">
            Fuel your body & mind with the <span className="text-green-600">right food</span>
          </h1>
          <p className="text-gray-200 mb-6 text-sm">
            Our expert tips are designed to help you boost mood and energy through better nutrition.
            Start small with these simple, science-backed habits.
          </p>
          <button className="bg-amber-400 text-gray-900 px-6 py-2 rounded-full hover:bg-green-700 transition">
            Learn More
          </button>
        </div>

        {/* Right Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 border border-yellow-400 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-2 text-sm text-yellow-400">
                {item.icon}
                <span className="font-semibold">{item.title}</span>
              </div>
              <p className="text-gray-200 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
