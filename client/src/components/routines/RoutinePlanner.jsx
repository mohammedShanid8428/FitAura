import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { exerciseImg, yogaGif } from "../../assets/images";

// --- Fitness Exercises ---
const fitnessExercises = [
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

// --- Yoga Sessions ---
const yogaExercises = [
  { id: 1, title: "🌞 Sun Salutation (Surya Namaskar)", image: yogaGif.yoga1 },
  { id: 2, title: "🧘‍♀️ Cat-Cow Stretch", image: yogaGif.yoga2 },
  { id: 3, title: "🌬️ Pranayama Breathing", image: yogaGif.yoga3 },
  { id: 4, title: "🪷 Child’s Pose", image: yogaGif.yoga4 },
  { id: 5, title: "🦶 Downward Dog", image: yogaGif.yoga5 },
  { id: 6, title: "🧍‍♂️ Warrior II", image: yogaGif.yoga6 },
  { id: 7, title: "🦋 Butterfly Pose", image: yogaGif.yoga1 },
  { id: 8, title: "🔄 Seated Twist", image: yogaGif.yoga2 },
  { id: 9, title: "💤 Corpse Pose (Savasana)", image: yogaGif.yoga3 },
];

export default function RoutinePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "fitness"; // default to "fitness"

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const exercises = type === "yoga" ? yogaExercises : fitnessExercises;
  const currentExercise = exercises[index];

  useEffect(() => {
    let timer;
    if (!isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      handleNext();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused]);

  const handleNext = () => {
    if (index < exercises.length - 1) {
      setIndex(index + 1);
      setTimeLeft(30);
    } else {
      navigate(type === "yoga" ? "/yoga/complete" : "/routine/complete");
    }
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-4 relative">
      {/* Progress header */}
      <div className="flex space-x-1 w-full mb-4">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full ${
              i < index ? "bg-green-500" : i === index ? "bg-green-300" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Top right controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="bg-blue-100 p-2 rounded-full text-sm">🔊</button>
        <button onClick={handlePause} className="bg-blue-100 p-2 rounded-full text-sm">
          {isPaused ? "▶️" : "⏸️"}
        </button>
        <button className="bg-blue-100 p-2 rounded-full text-sm">❓</button>
      </div>

      {/* Current Exercise Display */}
      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <img src={currentExercise.image} alt={currentExercise.title} className="w-56 h-56 object-contain mb-4" />
        <div className="text-blue-700 font-bold text-3xl mb-1">{30 - timeLeft}" / 30"</div>
        <div className="text-lg font-bold text-black uppercase">{currentExercise.title}</div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full px-6 pb-6">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
            style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/3"></div>
          <button onClick={handlePause} className="text-gray-700 text-xl">
            {isPaused ? "▶️" : "⏸️"}
          </button>
          <button onClick={handleNext} className="text-gray-700 text-xl">
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
