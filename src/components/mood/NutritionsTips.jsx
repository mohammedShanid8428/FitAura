import React from "react";
import { Leaf, Droplet, Cake } from "lucide-react";
import { Link } from "react-router-dom";

const moodColors = {
  happy: {
    titleColor: "text-yellow-400",
    borderColor: "border-yellow-400",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-700",
    buttonBg: "bg-yellow-400 hover:bg-yellow-500",
  },
  sad: {
    titleColor: "text-blue-400",
    borderColor: "border-blue-400",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    buttonBg: "bg-blue-400 hover:bg-blue-500",
  },
  angry: {
    titleColor: "text-red-400",
    borderColor: "border-red-400",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    buttonBg: "bg-red-400 hover:bg-red-500",
  },
};

export default function NutritionTips({ mood = "happy" }) {
  const moodTheme = moodColors[mood];

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
          <span className={`${moodTheme.badgeBg} ${moodTheme.badgeText} font-medium px-3 py-1 rounded-full text-xs mb-4 inline-block`}>
            Nutrition Health Guide
          </span>
          <h1 className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${moodTheme.titleColor}`}>
            Fuel your body & mind with the <span className="text-green-600">right food</span>
          </h1>
          <p className="text-gray-200 mb-8 text-sm">
            Our expert tips are designed to help you boost mood and energy through better nutrition.
            Start small with these simple, science-backed habits.
          </p>
          <Link to="/nutrition">
            <button className={`${moodTheme.buttonBg} text-gray-900 px-6 py-2 rounded-full transition`}>
              Learn More
            </button>
          </Link>
        </div>

        {/* Right Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-700 ${moodTheme.borderColor} border rounded-lg p-4 shadow-sm hover:shadow-md transition`}
            >
              <div className={`flex items-center gap-2 mb-2 text-sm ${moodTheme.titleColor}`}>
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
