import React, { useState, useEffect } from "react";
import { images } from "../../assets/images"; // Adjust the path

const slides = [
  {
    id: 1,
    image: images.modal5,
    title: "HEALTH & NUTRITION INFORMATION.",
    subtitle: "BALANCED NUTRITION DIET",
    label: "NUTREE",
    description:
      "Eat a variety of fresh fruits, veggies, and lean proteins daily. Balanced nutrition fuels energy and boosts your overall health.",
  },
  {
    id: 2,
    image: images.modal6,
    title: "BOOST YOUR ENERGY NATURALLY.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Power your day with nutrient-rich foods and fresh greens. Natural meals help your body stay strong and energized.",
  },
];


export default function AutoChangingSlide() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const { image, title, subtitle, label, description } = slides[current];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <img
        src={image}
        alt="Slide"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full px-6">
        <div className="p-8 max-w-xl">
          <div className="flex items-center mb-6">
            <span className="bg-lime-600 text-white text-xl font-semibold px-2 py-1 rounded mr-2">
              {label}
            </span>
            <span className="text-xl text-gray-800 font-medium tracking-wide">
              {subtitle}
            </span>
          </div>
          <h2 className="text-5xl font-bold py-3 text-gray-700 mb-4">{title}</h2>
          <p className="text-gray-800 pr-4 mb-8">{description}</p>
          <div className="flex gap-6 flex-wrap">
            <a href="https://www.healthline.com/nutrition/50-super-healthy-foods">
              <button className="bg-orange-500 text-gray-800 px-8 py-3 rounded shadow hover:bg-orange-600 text-md">
              MORE ABOUT
            </button>
            </a>
            <button className="flex items-center border border-gray-300 px-6 py-2 rounded hover:bg-gray-200 text-md">
              VIEW SECTION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
