import React, { useState, useEffect } from "react";
import { fetchAllRoutines } from "../../services/allApis";
import { useNavigate } from "react-router-dom";

export default function RoutinePlayer() {
  const [routines, setRoutines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadRoutines = async () => {
      const data = await fetchAllRoutines();
      setRoutines(Array.isArray(data) ? data : []);
    };
    loadRoutines();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && !isPaused && routines.length > 0) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        handleNext();
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, isPaused, timeLeft, currentIndex, routines]);

  const startRoutine = () => {
    setCurrentIndex(0);
    setTimeLeft(routines[0]?.duration || 30);
    setIsRunning(true);
    setIsPaused(false);
  };

  const togglePause = () => setIsPaused(!isPaused);

  const handleNext = () => {
    if (currentIndex < routines.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(routines[currentIndex + 1]?.duration || 30);
    } else {
      setIsRunning(false);
      navigate("/routine/complete");
    }
  };

  const progressPercent = ((routines[currentIndex]?.duration - timeLeft) / (routines[currentIndex]?.duration || 30)) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8">

      {/* Top Exercise Progress Tracker */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {routines.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index < currentIndex
                ? "bg-green-500 w-6"
                : index === currentIndex
                ? "bg-green-300 w-6"
                : "bg-gray-300 w-4"
            }`}
          />
        ))}
      </div>

      {isRunning ? (
        routines[currentIndex] && (
          <div className="text-center">
            <img
              src={routines[currentIndex]?.imageUrl}
              alt={routines[currentIndex]?.title}
              className="w-56 h-56 object-contain mx-auto mb-6"
            />

            <div className="text-2xl font-bold text-black mb-1">
              {routines[currentIndex]?.title}
            </div>

            <div className="text-xl font-semibold text-gray-500">
              {timeLeft}" / {routines[currentIndex]?.duration}"
            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-72 mx-auto mt-2 mb-4 h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={togglePause}
                className="bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold"
              >
                Skip
              </button>
            </div>
          </div>
        )
      ) : (
        <button
          onClick={startRoutine}
          disabled={routines.length === 0}
          className={`mt-10 ${
            routines.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } px-6 py-3 rounded-full text-white font-semibold`}
        >
          {routines.length === 0 ? "No Routines Found" : "Start Workout"}
        </button>
      )}

    </div>
  );
}
