import React from "react";
import { useNavigate } from "react-router-dom";
import { exerciseImg } from "../../assets/images";

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

export default function RoutinesStrech() {
  const navigate = useNavigate();

  const handleStartRoutine = () => {
    navigate("/routines/Planner");
  };

  return (
    <section className="bg-gray-900 py-14 px-4 md:px-12 text-white min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ✅ Start Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleStartRoutine}
            className="bg-lime-400 hover:bg-lime-500 text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            Start Routine
          </button>
        </div>

        <p className="text-center text-sm uppercase tracking-widest text-lime-400 mb-2">
          Our Services
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-white">
          Stretching & Fitness Plans 💪
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition hover:scale-105"
            >
              <img
                src={exercise.image}
                alt={exercise.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <input
                type="checkbox"
                className="mb-2 w-5 h-5 accent-lime-400"
              />
              <p className="text-lg font-semibold text-white">{exercise.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
