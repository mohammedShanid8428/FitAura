// src/pages/RoutineDayPreview.js

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routineData } from "../../components/lib/routineData"; // use combined data

// Stretch count per day
const dayExerciseCounts = {
  1: 10, 2: 8, 3: 12, 4: 6, 5: 9, 6: 11, 7: 7,
};

// Seeded shuffle to ensure consistent order per day
function shuffleWithSeed(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed * (i + 17) + i * 31) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RoutineDayPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const day = parseInt(queryParams.get("day")) || 1;
  const type = queryParams.get("type") || "stretch";
  const isYoga = type === "yoga";

  // Extract appropriate exercise list
  const baseExercises = routineData.find((r) => r.type === "stretch")?.exercises || [];
  const yogaSessions = routineData.find((r) => r.type === "yoga")?.exercises || [];

  const routines = isYoga
    ? yogaSessions
    : shuffleWithSeed(baseExercises, day).slice(0, dayExerciseCounts[day] || 8);

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-blue-100 to-white pb-4 pt-10 px-4 rounded-b-3xl">
        <div
          className="absolute top-4 left-4 text-2xl text-gray-600 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          ←
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isYoga ? "Yoga Session" : `Stretch - Day ${day}`}
          </h1>
          <div className="flex justify-center space-x-2 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {isYoga ? "20 MINS" : "15 MINS"}
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {routines.length} WORKOUTS
            </span>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
            alt="header person"
            className="w-20 h-20 mx-auto"
          />
        </div>
      </div>

      {/* Exercise List */}
      <div className="mt-4 px-4">
        {routines.map((routine) => (
          <div
            key={routine.id + routine.title} // safer unique key if ids are reused
            className="flex items-center justify-between py-3 border-b border-gray-200"
          >
            <div className="max-w-[70%]">
              <h3 className="text-sm font-semibold text-gray-800">
                {routine.title}
              </h3>
              <p className="text-blue-500 text-xs">
                {isYoga ? routine.description : "30s"}
              </p>
            </div>
            <img
              src={routine.image}
              alt={routine.title}
              className="w-16 h-16 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Go Button */}
      <div className="fixed bottom-4 w-full px-4">
        <button
          onClick={() =>
            navigate(`/routines/Planner?day=${day}&type=${type}`)
          }
          className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 rounded-full text-lg shadow-md"
        >
          GO!
        </button>
      </div>
    </div>
  );
}
