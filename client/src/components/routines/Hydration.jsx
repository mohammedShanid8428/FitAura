import React, { useState, useEffect } from "react";
import { CheckCircle, Bell } from "lucide-react";

const hydrationGoals = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
];

export default function Hydration() {
  const [completed, setCompleted] = useState([]);
  const [reminder, setReminder] = useState(false);
  const [hydrationGoal, setHydrationGoal] = useState(8);

  useEffect(() => {
    if (reminder) {
      const interval = setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        if ([8, 10, 12, 14, 16, 18, 20].includes(currentHour)) {
          alert("💧 Time to hydrate!");
        }
      }, 1000 * 60 * 30); // check every 30 mins
      return () => clearInterval(interval);
    }
  }, [reminder]);

  const toggleComplete = (time) => {
    setCompleted((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time]
    );
  };

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-lg p-8 rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        💧 Hydration Tracker
      </h2>

      <div className="text-center mb-6">
        <p className="text-gray-600">Daily Goal: {hydrationGoal} glasses</p>
        <p className="font-semibold text-xl">
          Completed: {completed.length} / {hydrationGoal}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {hydrationGoals.map((time) => (
          <button
            key={time}
            onClick={() => toggleComplete(time)}
            className={`flex flex-col items-center justify-center border rounded-lg p-4 transition ${
              completed.includes(time)
                ? "bg-blue-100 border-blue-400 text-blue-700"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">💧</span>
            <span className="text-sm mt-2">{time}</span>
            {completed.includes(time) && <CheckCircle className="w-4 h-4 mt-1 text-blue-600" />}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={reminder}
            onChange={() => setReminder(!reminder)}
            className="accent-blue-600"
          />
          ⏰ Enable Hydration Reminders
        </label>

        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => alert("💾 Progress Saved Locally!")}
        >
          <Bell className="w-4 h-4" /> Save Progress
        </button>
      </div>
    </section>
  );
}
