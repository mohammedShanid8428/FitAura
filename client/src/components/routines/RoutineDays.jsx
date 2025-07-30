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
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4">
      {/* Header */}
      <div className="relative mb-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            <ChevronLeft />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
            <p className="text-xs text-gray-400">
              {totalDays - completedDays} days left
            </p>
          </div>
          <div className="w-5" />
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {percentage}%
          </p>
        </div>
      </div>

      {/* Week Info */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-2 px-1">
        <span className="font-medium">📍 WEEK 1</span>
        <span className="text-xs text-gray-400">
          {completedDays}/{totalDays}
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
              className={`px-4 py-3 rounded-xl border transition cursor-pointer ${
                isCompleted 
                  ? "border-green-300 bg-green-50 hover:bg-green-100" 
                  : dayProgress 
                    ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() =>
                navigate(`/routine/day-preview?type=${type}&day=${day}`)
              }
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-700">
                    Day {day}
                  </span>
                  {dayProgress && (
                    <div className="text-xs text-gray-500 mt-1">
                      {dayProgress.completed.length}/{dayProgress.totalExercises} exercises • {dayProgressPercent}%
                    </div>
                  )}
                  {dayProgress && dayProgressPercent > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${dayProgressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <CheckCircle
                  className={`w-5 h-5 ml-3 ${
                    isCompleted 
                      ? "text-green-500" 
                      : dayProgress && dayProgressPercent > 0
                        ? "text-blue-500"
                        : "text-gray-300"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}