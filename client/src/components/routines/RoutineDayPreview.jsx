import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { exerciseImg, yogaGif } from "../../assets/images";

// Stretch Exercises
const baseExercises = [
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

// Yoga Sessions
const yogaSessions = [
  { id: 1, title: "🌞 Sun Salutation (Surya Namaskar)", image: yogaGif.yoga1, description: "A full-body flow to awaken muscles and energize your day." },
  { id: 2, title: "🧘‍♀️ Cat-Cow Stretch", image: yogaGif.yoga2, description: "Gently warm up your spine and release tension in the back." },
  { id: 3, title: "🌬️ Pranayama Breathing", image: yogaGif.yoga3, description: "A calming breath control exercise to reduce stress." },
  { id: 4, title: "🪷 Child’s Pose", image: yogaGif.yoga4, description: "A resting pose to stretch hips and relax the body." },
  { id: 5, title: "🦶 Downward Dog", image: yogaGif.yoga5, description: "Strengthens arms and legs while improving flexibility." },
  { id: 6, title: "🧍‍♂️ Warrior II", image: yogaGif.yoga6, description: "Builds stamina and strengthens your legs and core." },
  { id: 7, title: "🦋 Butterfly Pose", image: yogaGif.yoga1, description: "Opens up hips and improves circulation in the lower body." },
  { id: 8, title: "🔄 Seated Twist", image: yogaGif.yoga2, description: "Relieves spinal tension and improves digestion." },
  { id: 9, title: "💤 Corpse Pose (Savasana)", image: yogaGif.yoga3, description: "Final relaxation to restore energy and calm the mind." },
];

// Stretch count per day
const dayExerciseCounts = {
  1: 10, 2: 8, 3: 12, 4: 6, 5: 9, 6: 11, 7: 7,
};

// Seeded shuffle
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

      {/* List of Exercises */}
      <div className="mt-4 px-4">
        {routines.map((routine) => (
          <div
            key={routine.id}
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

      {/* Go to Player */}
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
