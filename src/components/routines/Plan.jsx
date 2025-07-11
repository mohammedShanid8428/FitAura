import React, { useState, useEffect } from "react";
import { Sun, Coffee, Dumbbell, Briefcase, Moon, Clock, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function RoutineTimeline() {
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  const [reminderSettings, setReminderSettings] = useState(() => {
    return JSON.parse(localStorage.getItem("fitaura-reminders")) || {};
  });

  const [customTasks, setCustomTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    block: "Morning",
    title: "",
    time: "",
  });

  const timelineData = [
    ...customTasks,
    { time: "06:30", title: "Wake Up", icon: <Sun size={18} />, color: "bg-yellow-200" },
    { time: "07:00", title: "Drink Water", icon: <Coffee size={18} />, color: "bg-blue-100" },
    { time: "07:30", title: "Workout", icon: <Dumbbell size={18} />, color: "bg-pink-100" },
    { time: "09:00", title: "Focus Work", icon: <Briefcase size={18} />, color: "bg-purple-100" },
    { time: "13:00", title: "Lunch Break", icon: <Coffee size={18} />, color: "bg-green-100" },
    { time: "18:00", title: "Evening Stretch", icon: <Dumbbell size={18} />, color: "bg-orange-100" },
    { time: "21:30", title: "Sleep Prep", icon: <Moon size={18} />, color: "bg-gray-200" },
  ];

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5);
      timelineData.forEach((item) => {
        if (reminderSettings[item.title]?.enabled && item.time === current) {
          if (alarmEnabled) new Audio("/alarm.mp3").play();
          alert(`Reminder: ${item.title}`);
        }
      });
    };
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [alarmEnabled, reminderSettings]);

  const toggleReminder = (title) => {
    const updated = {
      ...reminderSettings,
      [title]: {
        enabled: !reminderSettings[title]?.enabled,
      },
    };
    setReminderSettings(updated);
    localStorage.setItem("fitaura-reminders", JSON.stringify(updated));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.time) return;
    setCustomTasks((prev) => [
      {
        time: newTask.time,
        title: newTask.title,
        icon: <Clock size={18} />,
        color: "bg-sky-100",
      },
      ...prev,
    ]);
    setNewTask({ block: "Morning", title: "", time: "" });
  };

  return (
    <section className="mt-12 px-6 py-10 bg-white shadow-xl rounded-xl max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        ⏰ Visual Routine Timeline
      </h2>

      {/* Task Add Input Panel */}
      <div className="bg-gray-50 p-4 rounded-xl shadow flex flex-wrap md:flex-nowrap items-center gap-4 mb-8">
        <select
          value={newTask.block}
          onChange={(e) => setNewTask({ ...newTask, block: e.target.value })}
          className="border px-3 py-2 rounded-md"
        >
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </select>
        <input
          type="text"
          placeholder="e.g. Morning Walk"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={handleAddTask}
          className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md flex items-center gap-1"
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Toggle Alarm */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setAlarmEnabled(!alarmEnabled)}
          className={`px-4 py-2 rounded-md text-sm font-medium shadow transition ${
            alarmEnabled
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {alarmEnabled ? "🔔 Alarm On" : "🔕 Alarm Off"}
        </button>
      </div>

      {/* Timeline Cards */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-[700px]">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`relative flex-shrink-0 w-64 p-4 rounded-xl shadow-md border ${item.color}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="text-sm font-semibold text-gray-600">
                    {item.time}
                  </span>
                </div>
                <button
                  onClick={() => toggleReminder(item.title)}
                  className={`text-xs rounded-full px-2 py-1 ${
                    reminderSettings[item.title]?.enabled
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {reminderSettings[item.title]?.enabled ? "Reminder On" : "Set Reminder"}
                </button>
              </div>
              <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
