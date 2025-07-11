import React from "react";

const services = [
  {
    id: 1,
    title: "Yoga Routine",
    image: "/assets/yoga-banner.jpg",
    desc: "Improve flexibility and calm your mind with guided yoga sessions.",
  },
  {
    id: 2,
    title: "Stretching Plan",
    image: "/assets/stretching-banner.jpg",
    desc: "Gentle stretches to improve mobility and prevent injuries.",
  },
];

export default function Service() {
  return (
    <section className="bg-[#0f0f0f] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <p className="uppercase text-sm text-gray-400 mb-1">Wellness Plans</p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Build Balance with Yoga & Stretching
            </h2>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Our curated yoga and stretching programs help you boost flexibility, reduce stress, and stay active. Designed for every level — from beginner to advanced.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden shadow-md group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 p-4 flex flex-col justify-end">
                <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{item.desc}</p>
                <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition w-fit">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
