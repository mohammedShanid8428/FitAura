import React from "react";
import { images } from "../../assets/images";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Yoga Routine",
    image: images.modal7,
    desc: "Improve flexibility and calm your mind with guided yoga sessions.",
    link: "/routines/yoga",   // Update to match your route
  },
  {
    id: 2,
    title: "Stretching Plan",
    image: images.modal21,
    desc: "Gentle stretches to improve mobility and prevent injuries.",
    link: "/routines/stretch", // Update to match your route
  },
];
export default function RoutinesService() {
  return (
    <section className="text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <p className="uppercase text-sm text-gray-300 mb-1">Wellness Plans</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-lime-400">
              Build Balance with Yoga & Stretching
            </h2>
          </div>
          <p className="text-gray-300 text-sm md:text-base mt-10">
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
                <h4 className="text-xl font-bold mb-1 text-lime-400">{item.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{item.desc}</p>
                <Link
                  to={item.link}
                  className="bg-lime-500 text-white text-sm px-2 py-2 rounded hover:bg-lime-600 transition w-fit block text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
