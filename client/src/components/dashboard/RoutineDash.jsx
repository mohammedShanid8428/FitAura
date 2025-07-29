import React from "react";
import { useSearchParams } from "react-router-dom";
import { moodThemes } from "../../components/lib/moodTheme";

export default function StretchYogaCards() {
  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood") || "default";
  const theme = moodThemes[mood] || moodThemes.default;

  const routines = [
    {
      label: "Stretch with Coach",
      image: "https://images.pexels.com/photos/4498292/pexels-photo-4498292.jpeg",
      time: "20 min",
      progress: 66,
    },
    {
      label: "Morning Yoga Flow",
      image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      time: "30 min",
      progress: 73,
    },
  ];

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className={`rounded-2xl p-6 shadow-md ${theme.card} ${theme.text}`}>
        <h2 className="text-2xl font-bold mb-6">Daily Routine Tracker</h2>

        {/* Grid of 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routines.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition ${theme.bg}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                <p className="text-sm mb-3">🕒 Today’s Duration: {item.time}</p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-lime-400 h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="mt-8 border-t border-gray-300 pt-4">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Overall Progress</span>
            <span>69%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-lime-400 h-2 rounded-full"
              style={{ width: `69%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
