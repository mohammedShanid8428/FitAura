import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { images } from "../../assets/images"; // ✅ Make sure this file exists

const slides = [
  {
    id: 1,
    image: images.hero1, // ✅ image must be defined here
    title: "GET 100% TRUSTED NUTRITION TIPS.",
    subtitle: "EAT HEALTHY FOOD FOR FAT TO FIT",
    label: "NUTREE",
    description:
      "Nunc accumsan dui vel lobortis pulvinar. Duis convallis odio ut dignissim faucibus. Sed sit amet urna dictum.",
  },
  {
    id: 2,
    image: images.hero2,
    title: "BOOST YOUR ENERGY NATURALLY.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Fuel your body with real nutrients. Start your wellness journey today with clean eating tips.",
  },
];

export default function CarouselComponent() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const { image, title, subtitle, label, description } = slides[current];

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="grid md:grid-cols-2 items-center max-w-7xl mx-auto min-h-[500px] px-6 py-12 relative z-10">
        {/* Left content */}
        <div className="z-20 relative">
          <div className="flex items-center mb-4">
            <span className="bg-lime-500 text-white text-xs font-semibold px-2 py-1 rounded mr-3">
              {label}
            </span>
            <span className="uppercase text-sm tracking-widest text-gray-600">
              {subtitle}
            </span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-6 max-w-md">{description}</p>
          <div className="flex items-center gap-4">
            <button className="bg-orange-500 text-white px-5 py-2 rounded shadow hover:bg-orange-600 text-sm">
              More About
            </button>
            <button className="flex items-center border px-5 py-2 rounded hover:bg-gray-100 text-sm">
              <Play className="w-4 h-4 mr-2" />
              Play Sessions
            </button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative z-0">
          <img
            src={image}
            alt="Nutrition"
            className="w-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Carousel Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-30"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow z-30"
      >
        <ChevronRight />
      </button>
    </section>
  );
}
