import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useProgress } from "../../context/ Context"; // Import from your context

// Custom hook to get query params
const useQuery = () => new URLSearchParams(useLocation().search);

export default function RoutineDays({ title = "Routine Plan" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  
  // Get progress context
  const { progress, isDayCompleted } = useProgress();

  // Determine the routine type from URL
  let type = query.get("type");
  if (!type) {
    if (location.pathname.includes("/strech")) {
      type = "stretch";
    } else if (location.pathname.includes("/yoga")) {
      type = "yoga";
    } else {
      type = "yoga"; // fallback default
    }
  }

  // Get progress data from context
  const typeProgress = progress[type] || { completedDays: [], days: {} };
  const completedDays = typeProgress.completedDays.length || 0;

  const totalDays = 7;
  const percentage = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg shadow-lime-400/10 overflow-hidden p-4 border border-gray-700">
      {/* Header */}
      <div className="relative mb-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-300 hover:text-lime-400 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-lg tracking-wider font-semibold text-lime-400">{title}</h2>
            <p className="text-sm text-gray-400">
              {totalDays - completedDays} days left
            </p>
          </div>
          <div className="w-9" />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="relative h-3 bg-gray-600 rounded-full">
            <div
              className="absolute h-full bg-lime-400 rounded-full transition-all duration-500 shadow-lg shadow-lime-400/30"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-400 mt-2">
            {percentage}% Complete
          </p>
        </div>
      </div>

      {/* Week Info */}
      <div className="flex justify-between items-center text-sm text-gray-300 mb-4 px-1">
        <span className="font-medium text-lime-400">📍 WEEK 1</span>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
          {completedDays}/{totalDays} completed
        </span>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {[...Array(totalDays)].map((_, index) => {
          const day = index + 1;
          const isCompleted = isDayCompleted(type, day);
          const dayProgress = progress[type]?.days[day];
          const dayProgressPercent = dayProgress ? dayProgress.todayProgress : 0;

          return (
            <div
              key={day}
              className={`px-4 py-4 rounded-2xl border-2 transition-all cursor-pointer transform hover:scale-[1.02] ${
                isCompleted 
                  ? "border-lime-400 bg-gray-700 shadow-lg shadow-lime-400/20 hover:bg-gray-600" 
                  : dayProgress 
                    ? "border-gray-500 bg-gray-700 hover:border-gray-400 hover:bg-gray-600"
                    : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
              }`}
              onClick={() =>
                navigate(`/routine/day-preview?type=${type}&day=${day}`)
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${
                      isCompleted ? "text-lime-400" : "text-gray-200"
                    }`}>
                      Day {day}
                    </span>
                    {isCompleted && (
                      <span className="text-xs bg-lime-400 text-gray-900 px-2 py-0.5 rounded-full font-medium">
                        Complete
                      </span>
                    )}
                  </div>
                  {dayProgress && (
                    <div className="text-xs text-gray-400 mt-1">
                      {dayProgress.completed.length}/{dayProgress.totalExercises} exercises • {dayProgressPercent}%
                    </div>
                  )}
                  {dayProgress && dayProgressPercent > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-lime-400 shadow-lg shadow-lime-400/30' : 'bg-gray-400'
                          }`}
                          style={{ width: `${dayProgressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <CheckCircle
                  className={`w-6 h-6 ml-4 transition-colors ${
                    isCompleted 
                      ? "text-lime-400" 
                      : dayProgress && dayProgressPercent > 0
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 bg-gray-700 rounded-xl p-4 border border-gray-600">
        <div className="text-center">
          <h3 className="text-lime-400 font-semibold mb-2">Progress Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-lime-400">{completedDays}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-300">{totalDays - completedDays}</div>
              <div className="text-xs text-gray-400">Remaining</div>
            </div>
            <div>
              <div className="text-xl font-bold text-lime-400">{percentage}%</div>
              <div className="text-xs text-gray-400">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}