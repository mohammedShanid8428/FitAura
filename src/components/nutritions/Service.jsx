import React from "react";


import { serviceImg } from "../../assets/images";

const services = [
  {
    title: "Happy",
    image: serviceImg.service1,
  },
  {
    title: "Sad",
    image: serviceImg.service2,
  },
  {
    title: "Angry",
    image: serviceImg.service3,
  },
  {
    title: "Anxiety",
    image: serviceImg.service4,
  },
  {
    title: "Tired",
    image: serviceImg.service5,
  },
  {
    title: "Weight Loss",
    image: serviceImg.service6,
  },
  {
    title: "Weight Gain",
    image: serviceImg.service1,
  },
  {
    title: "Fitness",
    image: serviceImg.service3,
  },
];

export default function Service() {
  return (
    <section className="py-16 bg-white text-center px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs text-gray-500 mb-2">Our Services</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          Our Mood & Goal-Based Nutrition Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-left bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-44 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-bold uppercase text-emerald-700">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Personalized nutrition tips and meal ideas to support your {service.title.toLowerCase()} mood or goal.
              </p>
              <div className="flex gap-4 mt-4">
                <button className="text-sm font-medium bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  READ MORE
                </button>
                <button className="text-sm font-medium bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 transition">
                  ADD TO ITEM
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
