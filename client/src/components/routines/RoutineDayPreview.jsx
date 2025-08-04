import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Clock, Target, Play } from "lucide-react";
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

export default function RoutineDayPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get progress context
  const { getDayProgress, isDayCompleted } = useProgress();

  const day = parseInt(queryParams.get("day")) || 1;
  const type = queryParams.get("type") || "stretch";
  const isYoga = type === "yoga";

  // Get exercises based on type
  const selectedRoutine = routineData.find((r) => r.type === type);
  const baseExercises = selectedRoutine?.exercises || [];

  const exercises = isYoga 
    ? baseExercises
    : shuffleWithSeed(baseExercises, day).slice(0, dayExerciseCounts[day] || 8);

  // Get progress data for this day
  const dayProgress = getDayProgress(type, day);
  const isCompleted = isDayCompleted(type, day);
  const completedCount = dayProgress.completed.length;
  const totalCount = exercises.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Calculate estimated time
  const estimatedTime = isYoga ? "20-25 MINS" : "15-20 MINS";

  const handleStartRoutine = () => {
    navigate(`/routines/Planner?day=${day}&type=${type}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-200 mb-2">No Exercises Found</h2>
          <p className="text-gray-400 mb-4">Unable to load exercises for this routine.</p>
          <button 
            onClick={handleGoBack}
            className="bg-lime-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-lime-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-lime-400 to-gray-900 text-white">
        <div className="px-4 pt-12 pb-8">
          {/* Back Button */}
          <button 
            onClick={handleGoBack}
            className="absolute top-12 left-4 p-2 rounded-full bg-gray-800/70 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Title and Info */}
          <div className="text-center pt-8">
            <h1 className="text-3xl tracking-wider font-bold mb-2 text-gray-900">
              {isYoga ? "Yoga Session" : `Stretch Routine`}
            </h1>
            <h2 className="text-lg mb-4 text-gray-900 font-bold">Day {day}</h2>
            
            {/* Stats Row */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-gray-800/60 rounded-full px-4 py-2 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-lime-300" />
                <span className="text-sm font-semibold text-white">{estimatedTime}</span>
              </div>
              <div className="bg-gray-800/60 rounded-full px-4 py-2 flex items-center space-x-2">
                <Target className="w-4 h-4 text-lime-300" />
                <span className="text-sm font-semibold text-white">{exercises.length} EXERCISES</span>
              </div>
            </div>

            {/* Progress Indicator */}
            {progressPercentage > 0 && (
              <div className="bg-gray-800/70 border-lime-400 border-2 rounded-2xl p-4 mx-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/90">Progress</span>
                  <span className="text-sm font-bold text-lime-300">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3 mb-2">
                  <div
                    className="bg-lime-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-white/80">
                  {completedCount} of {totalCount} exercises completed
                  {isCompleted && <span className="text-lime-300 ml-2 font-semibold">✓ Day Completed!</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#111827"></path>
          </svg>
        </div>
      </div>

      {/* Exercise List */}
      <div className="px-4 pt-6 pb-24">
        <h3 className="text-lg font-semibold tracking-wide text-lime-400 mb-4">Today's Exercises</h3>
        
        <div className="space-y-3">
          {exercises.map((exercise, index) => {
            const isExerciseCompleted = dayProgress.completed.includes(index);
            
            return (
              <div
                key={`${exercise.id || index}-${exercise.title}`}
                className={`bg-gray-800 rounded-xl p-4 shadow-lg border-2 transition-all ${
                  isExerciseCompleted 
                    ? "border-lime-400 bg-gray-800 shadow-lime-400/20" 
                    : "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Exercise Number/Status */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isExerciseCompleted 
                      ? "bg-lime-400 text-gray-900" 
                      : "bg-gray-500 text-gray-200"
                  }`}>
                    {isExerciseCompleted ? "✓" : index + 1}
                  </div>

                  {/* Exercise Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0 border border-gray-600">
                    <img
                      src={exercise.image}
                      alt={exercise.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/64x64/374151/9ca3af?text=Exercise";
                      }}
                    />
                  </div>

                  {/* Exercise Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-200 truncate">
                      {exercise.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">
                      {isYoga 
                        ? (exercise.description || "Hold and breathe deeply") 
                        : "30 seconds"
                      }
                    </p>
                    {isExerciseCompleted && (
                      <p className="text-xs text-lime-400 font-medium mt-1">
                        ✓ Completed
                      </p>
                    )}
                  </div>

                  {/* Difficulty Indicator (if available) */}
                  {exercise.difficulty && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exercise.difficulty === 'easy' ? 'bg-lime-500 text-gray-900' :
                      exercise.difficulty === 'medium' ? 'bg-yellow-500 text-gray-900' :
                      'bg-red-500 text-white'
                    }`}>
                      {exercise.difficulty}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-gray-800 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-lime-400">
          <h4 className="font-semibold text-lime-400 mb-3">Session Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-lime-400">{exercises.length}</div>
              <div className="text-xs text-gray-400">Exercises</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-lime-400">{estimatedTime.split(' ')[0]}</div>
              <div className="text-xs text-gray-400">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-lime-400">{progressPercentage}%</div>
              <div className="text-xs text-gray-400">Complete</div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-4">
          <h4 className="font-semibold text-lime-400 mb-3">Today's Benefits</h4>
          <div className="space-y-2">
            {isYoga ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">🧘‍♀️</span>
                  <span>Improved flexibility and balance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">🌸</span>
                  <span>Reduced stress and mental clarity</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">💪</span>
                  <span>Core strength and posture improvement</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">🤸‍♂️</span>
                  <span>Enhanced muscle flexibility</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">🩺</span>
                  <span>Better circulation and recovery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <span className="text-lime-400">⚡</span>
                  <span>Reduced muscle tension</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent">
        <button
          onClick={handleStartRoutine}
          className="w-full bg-lime-400 hover:bg-lime-300 text-gray-900 font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl shadow-lime-400/20 hover:shadow-lime-300/30 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <Play className="w-5 h-5" />
          <span>
            {isCompleted 
              ? "Redo Routine" 
              : progressPercentage > 0 
                ? "Continue Routine" 
              : "Start Routine"
            }
          </span>
        </button>
        
        {progressPercentage > 0 && !isCompleted && (
          <p className="text-center text-sm text-gray-400 mt-2">
            Resume from exercise {completedCount + 1}
          </p>
        )}
      </div>
    </div>
  );
}