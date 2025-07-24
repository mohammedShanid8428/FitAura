import React, { useState } from "react";
import { yogaGif } from "../../assets/images";

const yogaSessions = [
  {
    id: 1,
    title: "🌞 Sun Salutation (Surya Namaskar)",
    image: yogaGif.yoga1,
    description: "A full-body flow to awaken muscles and energize your day.",
  },
  {
    id: 2,
    title: "🧘‍♀️ Cat-Cow Stretch",
    image: yogaGif.yoga2,
    description: "Gently warm up your spine and release tension in the back.",
  },
  {
    id: 3,
    title: "🌬️ Pranayama Breathing",
    image: yogaGif.yoga3,
    description: "A calming breath control exercise to reduce stress.",
  },
  {
    id: 4,
    title: "🪷 Child’s Pose",
    image: yogaGif.yoga4,
    description: "A resting pose to stretch hips and relax the body.",
  },
  {
    id: 5,
    title: "🦶 Downward Dog",
    image: yogaGif.yoga5,
    description: "Strengthens arms and legs while improving flexibility.",
  },
  {
    id: 6,
    title: "🧍‍♂️ Warrior II",
    image: yogaGif.yoga6,
    description: "Builds stamina and strengthens your legs and core.",
  },
  {
    id: 7,
    title: "🦋 Butterfly Pose",
    image: yogaGif.yoga1,
    description: "Opens up hips and improves circulation in the lower body.",
  },
  {
    id: 8,
    title: "🔄 Seated Twist",
    image: yogaGif.yoga2,
    description: "Relieves spinal tension and improves digestion.",
  },
  {
    id: 9,
    title: "💤 Corpse Pose (Savasana)",
    image: yogaGif.yoga3,
    description: "Final relaxation to restore energy and calm the mind.",
  },
];

export default function RoutinesYoga() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-gray-800 text-white py-12 px-4 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm uppercase tracking-widest text-orange-300 mb-2">
          Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-orange-400">
          Choose Your Yoga Plan 🧘
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {yogaSessions.map((yoga) => (
            <div
              key={yoga.id}
              className={`bg-gray-700 border border-gray-600 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${
                selected.includes(yoga.id)
                  ? "ring-2 ring-orange-400 scale-105"
                  : ""
              }`}
            >
              <img
                src={yoga.image}
                alt={yoga.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <input
                type="checkbox"
                checked={selected.includes(yoga.id)}
                onChange={() => toggleSelect(yoga.id)}
                className="accent-orange-400 w-5 h-5 mb-2"
              />
              <p className="text-md font-semibold text-orange-300 mb-1">
                {yoga.title}
              </p>
              <p className="text-sm text-gray-300">{yoga.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Add Selected to Plan
          </button>
        </div>
      </div>
    </section>
  );
}
