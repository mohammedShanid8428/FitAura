import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { exerciseImg, images } from "../../assets/images"; // make sure this path is valid

const slides = [
  {
    id: 1,
    image: images.modal7,
    title: "ONLINE ROUTINE WORKOUT PLAN.",
    subtitle: "BALANCED NUTRITION DIET",
    label: "NUTREE",
    description:
      "Nunc accumsan dui vel lobortis pulvinar. Duis convallis odio ut dignissim faucibus. Sed sit amet urna dictum.",
  },
  {
    id: 2,
    image: images.modal8,
    title: "DAILY FITNESS FOR EVERYONE.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Fuel your body with real nutrients. Start your wellness journey today with clean eating tips.",
  },
];

const exercises = [
  { id: 1, title: "Kneeling Back Rotation Stretch (female)", image: exerciseImg.exercise1 },
  { id: 2, title: "1 2 Stick Drill (male)", image: exerciseImg.exercise2 },
  { id: 3, title: "1 to 2 Jump Box (male)", image: exerciseImg.exercise3 },
  { id: 4, title: "123 Back Drill (male)", image: exerciseImg.exercise4 },
  { id: 5, title: "2 to 1 Jump Box (male)", image: exerciseImg.exercise5 },
  { id: 6, title: "3 4 Sit up (female)", image: exerciseImg.exercise6 },
  { id: 7, title: "3 Leg Chaturanga Pose", image: exerciseImg.exercise7 },
  { id: 8, title: "3 Leg Dog Pose (female)", image: exerciseImg.exercise8 },
  { id: 9, title: "Side Plank", image: exerciseImg.exercise9 },
  { id: 10, title: "Wall Squat", image: exerciseImg.exercise10 },
  { id: 11, title: "Mountain Climbers", image: exerciseImg.exercise11 },
  { id: 12, title: "Bridge Pose", image: exerciseImg.exercise12 },
];

export default function Routines() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const { image, title, subtitle, label, description } = slides[current];

  return (
    <>
      {/* Carousel Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src={image}
          alt="Slide"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full px-6">
          <div className="p-8 max-w-xl">
            <div className="flex items-center mb-6">
              <span className="bg-lime-500 text-white text-xl font-semibold px-2 py-1 rounded mr-2">
                {label}
              </span>
              <span className="text-xl text-white font-medium tracking-wide">
                {subtitle}
              </span>
            </div>
            <h2 className="text-5xl font-bold py-3 text-white mb-4">{title}</h2>
            <p className="text-white pr-4 mb-8">{description}</p>
            <div className="flex gap-6 flex-wrap">
              <button className="bg-orange-500 text-white px-8 py-3 rounded shadow hover:bg-orange-600 text-md">
                MORE ABOUT
              </button>
              <button className="flex items-center border border-white text-white px-6 py-2 rounded hover:bg-gray-200 hover:text-black text-sm">
                <Play className="w-4 h-4 mr-2" />
                PLAY SESSIONS
              </button>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow z-20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow z-20"
        >
          <ChevronRight />
        </button>
      </section>

      {/* Exercise Grid Section */}
      <section className="bg-white py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-md uppercase tracking-widest text-gray-400 mb-2">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
            Our Diet & Routine Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="border rounded-lg p-4 flex flex-col items-center text-center shadow-md hover:shadow-lg transition"
              >
                <img
                  src={exercise.image}
                  alt={exercise.title}
                  className="w-full h-40 object-contain mb-2"
                />
                <input type="checkbox" className="mb-3" />
                <p className="text-md font-semibold mb-2">{exercise.title}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Add selected to cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
