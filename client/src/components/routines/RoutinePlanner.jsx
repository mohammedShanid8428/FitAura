import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routineData } from "../../components/lib/routineData"; // 👈 import from your routineData.js

export default function RoutinePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "fitness"; // "fitness" or "yoga"

  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const selectedRoutine = routineData.find((r) => r.type === type);
  const exercises = selectedRoutine ? selectedRoutine.exercises : [];
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

  if (!currentExercise) return <div className="text-center mt-10 text-red-600">No exercises found.</div>;

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
