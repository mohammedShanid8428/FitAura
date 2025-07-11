import React, { useState } from "react";

const yogaSessions = [
  {
    id: 1,
    title: "🌞 Sun Salutation (Surya Namaskar)",
    image: "/assets/yoga_sunsalutation.gif",
    description: "A full-body flow to awaken muscles and energize your day.",
  },
  {
    id: 2,
    title: "🧘‍♀️ Cat-Cow Stretch",
    image: "/assets/yoga_catcow.gif",
    description: "Gently warm up your spine and release tension in the back.",
  },
  {
    id: 3,
    title: "🌬️ Pranayama Breathing",
    image: "/assets/yoga_pranayama.gif",
    description: "A calming breath control exercise to reduce stress.",
  },
  {
    id: 4,
    title: "🪷 Child’s Pose",
    image: "/assets/yoga_childpose.gif",
    description: "A resting pose to stretch hips and relax the body.",
  },
  {
    id: 5,
    title: "🦶 Downward Dog",
    image: "/assets/yoga_downwarddog.gif",
    description: "Strengthens arms and legs while improving flexibility.",
  },
  {
    id: 6,
    title: "🧍‍♂️ Warrior II",
    image: "/assets/yoga_warrior2.gif",
    description: "Builds stamina and strengthens your legs and core.",
  },
  {
    id: 7,
    title: "🦋 Butterfly Pose",
    image: "/assets/yoga_butterfly.gif",
    description: "Opens up hips and improves circulation in the lower body.",
  },
  {
    id: 8,
    title: "🔄 Seated Twist",
    image: "/assets/yoga_seatedtwist.gif",
    description: "Relieves spinal tension and improves digestion.",
  },
  {
    id: 9,
    title: "💤 Corpse Pose (Savasana)",
    image: "/assets/yoga_savasana.gif",
    description: "Final relaxation to restore energy and calm the mind.",
  },
];


export default function Yoga() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm uppercase tracking-widest text-gray-400 mb-2">
          Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Choose Your Yoga Plan 🧘
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {yogaSessions.map((yoga) => (
            <div
              key={yoga.id}
              className={`border rounded-xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center text-center ${
                selected.includes(yoga.id) ? "bg-blue-50 ring-2 ring-blue-400" : ""
              }`}
            >
              <img
                src={yoga.image}
                alt={yoga.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <input
                type="checkbox"
                checked={selected.includes(yoga.id)}
                onChange={() => toggleSelect(yoga.id)}
                className="mb-2 w-5 h-5 text-blue-500"
              />
              <p className="text-md font-semibold mb-1">{yoga.title}</p>
              <p className="text-sm text-gray-600">{yoga.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Add selected to plan
          </button>
        </div>
      </div>
    </section>
  );
}
