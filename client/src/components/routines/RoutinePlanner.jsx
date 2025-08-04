import React, { useState, useEffect,useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Pause, Play, SkipForward, Volume2, HelpCircle, X } from "lucide-react";
import { routineData } from "../../components/lib/routineData";
import { useProgress } from "../../context/ Context";

const dayExerciseCounts = {
  1: 10, 2: 8, 3: 12, 4: 6, 5: 9, 6: 11, 7: 7,
};

function shuffleWithSeed(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed * (i + 17) + i * 31) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RoutinePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "stretch";
  const day = parseInt(params.get("day") || "1");

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showExitModal, setShowExitModal] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Progress Context
  const { updateProgress, completeRoutine, markExerciseCompleted, getDayProgress } = useProgress();

  // Get exercises
  const selectedRoutine = routineData.find((r) => r.type === type);
  const baseExercises = selectedRoutine?.exercises || [];

  const exercises = type === "stretch"
    ? shuffleWithSeed(baseExercises, day).slice(0, dayExerciseCounts[day] || 8)
    : baseExercises;

  // Current exercise
  const currentExercise = exercises[currentIndex];
  
  // Progress calculations
  const totalExercises = exercises.length;
  const completedCount = completedExercises.size;
  const currentProgress = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  // Load existing progress for this day
  useEffect(() => {
  const dayProgress = getDayProgress(type, day);
  if (dayProgress.completed.length > 0) {
    setCompletedExercises(new Set(dayProgress.completed));
    
    // Find the next incomplete exercise to start from
    const nextIncompleteIndex = exercises.findIndex((_, index) => 
      !dayProgress.completed.includes(index)
    );
    
    if (nextIncompleteIndex !== -1) {
      setCurrentIndex(nextIncompleteIndex);
    }
  }
}, [type, day])

  // Timer effect
  useEffect(() => {
  let timer;
  if (!isPaused && timeLeft > 0 && isAutoPlay) {
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-advance to next exercise
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return () => clearInterval(timer);
}, [isPaused, timeLeft, isAutoPlay]);


// Also, make sure you're calling updateProgress when exercises are marked complete
const markCurrentCompleted = () => {
  if (!completedExercises.has(currentIndex)) {
    const newCompleted = new Set(completedExercises);
    newCompleted.add(currentIndex);
    setCompletedExercises(newCompleted);
    
    // Update progress immediately instead of relying on useEffect
    markExerciseCompleted(type, day, currentIndex, exercises.length);
  }
};

// Handle next exercise - ensure progress is updated
const handleNext = useCallback(() => {
  markCurrentCompleted();
  
  if (currentIndex < exercises.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setTimeLeft(30);
  } else {
    // Complete the entire routine
    completeRoutine(type, day, exercises.length);
    navigate(`/routine/complete?type=${type}&day=${day}`);
  }
}, [currentIndex, exercises.length, type, day, completeRoutine, navigate]);

  // Handle previous exercise
  const handlePrevious = useCallback(() => {
  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
    setTimeLeft(30);
  }
}, [currentIndex]);

// Handle skip (without marking as completed) - UPDATED
const handleSkip = useCallback(() => {
  if (currentIndex < exercises.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setTimeLeft(30);
  } else {
    navigate(`/routine/complete?type=${type}&day=${day}`);
  }
}, [currentIndex, exercises.length, navigate, type, day]);

// Toggle pause - UPDATED
const togglePause = useCallback(() => {
  setIsPaused(prev => !prev);
}, []);

  // Handle exit
  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    navigate("/dashboard");
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Error handling
  if (!currentExercise || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-200 mb-2">No Exercises Found</h2>
          <p className="text-gray-400 mb-4">Unable to load exercises for this routine.</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="bg-lime-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-lime-300 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-lime-400 shadow-lg px-4 py-4 flex items-center justify-between">
        <button 
          onClick={handleExit}
          className="p-2 rounded-full hover:bg-gray-900/10 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        
        <div className="text-center">
          <h1 className="text-lg font-semibold capitalize tracking-wider text-gray-900">
            {type} Routine - Day {day}
          </h1>
          <p className="text-sm text-gray-800">
            {completedCount} of {totalExercises} completed • {currentProgress}%
          </p>
        </div>
        
        <div className="text-sm text-gray-900 font-medium bg-gray-900/10 px-3 py-1 rounded-full">
          {currentIndex + 1} / {totalExercises}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 bg-lime-400">
        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 shadow-lg"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      {/* Exercise Progress Indicators */}
      <div className="px-4 py-2 bg-lime-400">
        <div className="flex space-x-1">
          {exercises.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                completedExercises.has(index) 
                  ? "bg-gray-900 shadow-md" 
                  : index === currentIndex 
                    ? "bg-gray-700 animate-pulse" 
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-3 bg-lime-400 border-b border-lime-300">
        <div className="flex justify-around text-center">
          <div>
            <div className="text-xl font-bold text-gray-900">{completedCount}</div>
            <div className="text-sm text-gray-800">Completed</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{currentProgress}%</div>
            <div className="text-sm text-gray-800">Progress</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{totalExercises - completedCount}</div>
            <div className="text-sm text-gray-800">Remaining</div>
          </div>
        </div>
      </div>

      {/* Control Icons */}
      <div className="absolute top-32 right-4 flex flex-col space-y-2 z-10">
        <button className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors">
          <Volume2 className="w-5 h-5 text-lime-400" />
        </button>
        
        <button 
          onClick={togglePause}
          className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        >
          {isPaused ? <Play className="w-5 h-5 text-lime-400" /> : <Pause className="w-5 h-5 text-lime-400" />}
        </button>
        
        <button className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors">
          <HelpCircle className="w-5 h-5 text-lime-400" />
        </button>
      </div>

      {/* Main Exercise Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Exercise Image */}
        <div className="relative mb-6">
          <div className="w-80 h-80 rounded-3xl border-2 border-lime-400 overflow-hidden shadow-2xl bg-gray-800">
            <img 
              src={currentExercise.image} 
              alt={currentExercise.title} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/320x320/374151/84cc16?text=Exercise";
              }}
            />
          </div>
          
          {/* Pause Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center">
              <div className="bg-lime-400 rounded-full p-4">
                <Pause className="w-8 h-8 text-gray-900" />
              </div>
            </div>
          )}
          
          {/* Completed Indicator */}
          {completedExercises.has(currentIndex) && (
            <div className="absolute top-4 right-4 bg-lime-400 text-gray-900 rounded-full p-3 shadow-lg">
              <span className="text-lg font-bold">✓</span>
            </div>
          )}
        </div>
        
        {/* Timer Display */}
        <div className={`text-6xl font-bold mb-4 ${isPaused ? 'text-gray-500' : 'text-lime-400'}`}>
          {isPaused ? "PAUSED" : `${timeLeft}s`}
        </div>
        
        {/* Exercise Title */}
        <h2 className="text-2xl font-bold text-gray-200 uppercase text-center mb-2">
          {currentExercise.title}
        </h2>

        {/* Exercise Description (for yoga) */}
        {currentExercise.description && type === 'yoga' && (
          <p className="text-gray-400 text-center max-w-md mb-4 leading-relaxed">
            {currentExercise.description}
          </p>
        )}

        {/* Exercise Info */}
        <div className="text-center text-gray-400">
          <p className="text-sm">
            Exercise {currentIndex + 1} of {totalExercises}
            {completedExercises.has(currentIndex) && (
              <span className="text-lime-400 font-semibold ml-2">✓ Completed</span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 px-6 py-6 border-t border-gray-700">
        {/* Timer Progress Bar */}
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-lime-400 transition-all duration-1000 shadow-lg"
            style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
          />
        </div>

        {/* Main Control Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-4 rounded-full transition-all ${
              currentIndex === 0 
                ? "text-gray-600 cursor-not-allowed" 
                : "text-gray-300 hover:bg-gray-700 hover:text-lime-400"
            }`}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="flex space-x-3">
            <button 
              onClick={togglePause} 
              className="bg-lime-400 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-lime-300 transition-colors flex items-center space-x-2 shadow-lg"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              <span>{isPaused ? "Resume" : "Pause"}</span>
            </button>

            <button 
              onClick={handleSkip} 
              className="bg-gray-600 text-gray-200 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-500 transition-colors flex items-center space-x-2"
            >
              <SkipForward className="w-5 h-5" />
              <span>Skip</span>
            </button>
          </div>

          <button 
            onClick={handleNext}
            className="p-4 rounded-full text-gray-300 hover:bg-gray-700 hover:text-lime-400 transition-all"
          >
            <ChevronLeft className="w-8 h-8 rotate-180" />
          </button>
        </div>

        {/* Status Text */}
        <div className="text-center text-sm text-gray-400">
          {isPaused 
            ? "Routine paused - Resume when ready" 
            : completedExercises.has(currentIndex) 
              ? "Exercise completed! Move to next" 
              : "Complete the exercise or skip to continue"
          }
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full border border-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Exit Routine?
              </h3>
              <p className="text-gray-400 mb-6">
                Your progress will be saved, but you'll need to restart this session.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 bg-gray-600 text-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}