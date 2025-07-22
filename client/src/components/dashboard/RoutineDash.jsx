import React from "react";

export default function StretchYogaCards() {
  const routines = [
    {
      label: "Stretch with Coach",
      image:
        "https://images.pexels.com/photos/4498292/pexels-photo-4498292.jpeg",
      time: "20 min",
      progress: 66,
    },
    {
      label: "Morning Yoga Flow",
      image:
        "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      time: "30 min",
      progress: 73,
    },
  ];

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <div className="border rounded-xl p-6 shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Daily Routine Tracker
        </h2>

        {/* Grid of 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routines.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden"
            >
              {/* Top Image */}
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-md font-semibold text-gray-800 mb-3">
                  {item.label}
                </h3>

                {/* Time Today */}
                <p className="text-sm text-gray-600 mb-2">
                  ✅ Today’s Duration: {item.time}
                </p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-600 font-medium">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-sm text-gray-600 font-medium mb-1">
            <span>Overall Progress</span>
            <span>69%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `69%` }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
