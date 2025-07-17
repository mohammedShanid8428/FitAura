import React from "react";
import { serviceImg } from "../../assets/images";

const services = [
  { title: "Happy", image: serviceImg.service1 },
  { title: "Sad", image: serviceImg.service2 },
  { title: "Angry", image: serviceImg.service3 },
  { title: "Anxiety", image: serviceImg.service4 },
  { title: "Tired", image: serviceImg.service5 },
  { title: "Weight Loss", image: serviceImg.service6 },
  { title: "Weight Gain", image: serviceImg.service1 },
  { title: "Fitness", image: serviceImg.service3 },
];

export default function Service() {
  return (
    <section className="py-16 bg-[#0f0f0f] text-center px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs text-gray-400 mb-2 tracking-wide">Our Services</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-green-400">
          Our Mood & Goal-Based <br /> Nutrition Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-green-400 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition duration-300 group"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-44 object-cover rounded-t-2xl"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold uppercase text-green-400 mb-2 group-hover:text-green-300 transition">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-300 mb-4">
                  Personalized nutrition tips and meal ideas to support your{" "}
                  <span className="lowercase">{service.title}</span> mood or goal.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="text-xs font-semibold bg-green-500 hover:bg-green-600 text-white py-2 px-5 rounded-full shadow transition">
                    Read More
                  </button>
                  <button className="text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white py-2 px-5 rounded-full shadow transition">
                    Add to Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
