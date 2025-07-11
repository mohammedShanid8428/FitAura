import React from "react";
import { exerciseImg, images } from "../../assets/images";

const exercises = [
  { id: 1, title: "Kneeling Back Rotation Stretch (female)", image: "/assets/exercise1.jpg" },
  { id: 2, title: "1 2 Stick Drill (male)", image: "/assets/exercise2.jpg" },
  { id: 3, title: "1 to 2 Jump Box (male)", image: "/assets/exercise3.jpg" },
  { id: 4, title: "123 Back Drill (male)", image: "/assets/exercise4.jpg" },
  { id: 5, title: "2 to 1 Jump Box (male)", image: "/assets/exercise5.jpg" },
  { id: 6, title: "3 4 Sit up (female)", image: "/assets/exercise6.jpg" },
  { id: 7, title: "3 Leg Chaturanga Pose", image: "/assets/exercise7.jpg" },
  { id: 8, title: "3 Leg Dog Pose (female)", image: "/assets/exercise8.jpg" },
  { id: 9, title: "Side Plank", image: "/assets/exercise9.jpg" },
  { id: 10, title: "Wall Squat", image: "/assets/exercise10.jpg" },
  { id: 11, title: "Mountain Climbers", image: "/assets/exercise11.jpg" },
  { id: 12, title: "Bridge Pose", image: "/assets/exercise12.jpg" },
];

export default function Strech() {
  return (
    <section className="bg-white py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm uppercase tracking-widest text-gray-400 mb-2">
          Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          Our Diet & Routine Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border rounded-xl p-4 flex flex-col items-center text-center shadow-md hover:shadow-xl transition"
            >
              <img
                src={exercise.image}
                alt={exercise.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <input type="checkbox" className="mb-2 w-5 h-5 text-blue-500" />
              <p className="text-md font-semibold">{exercise.title}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Add selected to cart
          </button>
        </div>
      </div>
    </section>
  );
}
