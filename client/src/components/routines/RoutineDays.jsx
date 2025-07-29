import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle } from "lucide-react";

// Custom hook to get query params
const useQuery = () => new URLSearchParams(useLocation().search);

export default function RoutineDays({ title = "Routine Plan" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  // 1. Try to get from ?type=stretch or ?type=yoga
  let type = query.get("type");

  // 2. If not in query, derive from the pathname
  if (!type) {
    if (location.pathname.includes("/strech")) {
      type = "stretch";
    } else if (location.pathname.includes("/yoga")) {
      type = "yoga";
    } else {
      type = "yoga"; // fallback default
    }
  }

  const totalDays = 7;
  const completedDays = 6;
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
              className="absolute h-full bg-blue-500 rounded-full"
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
          const isCompleted = day <= completedDays;

          return (
            <div
              key={day}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
              onClick={() =>
                navigate(`/routine/day-preview?type=${type}&day=${day}`)
              }
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Day {day}
                </span>
                <CheckCircle
                  className={`w-5 h-5 ${
                    isCompleted ? "text-blue-500" : "text-gray-300"
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
