import React, { useState, useEffect } from "react";
import { CheckCircle, Bell, Droplet, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const hydrationGoals = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
];

const WaterWave = ({ progress }) => {
  return (
    <div className="relative w-24 h-24 overflow-hidden rounded-full bg-gray-800 border-2 border-gray-700">
      <motion.div
        className="absolute bottom-0 w-full bg-blue-600"
        initial={{ height: "0%" }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 1, type: "spring" }}
        style={{ 
          background: "linear-gradient(to top, #2563eb, #3b82f6)",
          borderTopLeftRadius: "50%",
          borderTopRightRadius: "50%"
        }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-4 bg-blue-400 opacity-30"
          animate={{ 
            y: [0, -5, 0],
            scaleX: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-blue-100 z-10">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default function HydrationPlan() {
  const [completed, setCompleted] = useState([]);
  const [reminder, setReminder] = useState(false);
  const [hydrationGoal, setHydrationGoal] = useState(8);
  const [activeTab, setActiveTab] = useState("tracker");

  useEffect(() => {
    if (reminder) {
      const interval = setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        if ([8, 10, 12, 14, 16, 18, 20].includes(currentHour)) {
          if (Notification.permission === "granted") {
            new Notification("💧 Hydration Reminder", {
              body: "Time to drink some water! Stay hydrated!",
              icon: "/water-drop.png"
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification("💧 Hydration Reminder", {
                  body: "Time to drink some water! Stay hydrated!",
                  icon: "/water-drop.png"
                });
              }
            });
          }
        }
      }, 1000 * 60 * 30);
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

  const progress = (completed.length / hydrationGoal) * 100;

  return (
   <section className="bg-gray-800 py-16 px-4 min-h-screen">
     <section className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl p-8 rounded-2xl mt-10 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
          💧 Hydration Tracker
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("tracker")}
            className={`px-4 py-2 rounded-lg ${activeTab === "tracker" ? "bg-gray-700 text-blue-300" : "text-gray-400"}`}
          >
            Tracker
          </button>
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-4 py-2 rounded-lg ${activeTab === "visual" ? "bg-gray-700 text-blue-300" : "text-gray-400"}`}
          >
            Visual
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "tracker" ? (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <WaterWave progress={progress} />
              
              <div className="text-center md:text-left">
                <p className="text-gray-400 mb-2">Daily Goal: {hydrationGoal} glasses</p>
                <p className="font-semibold text-2xl mb-4 text-blue-100">
                  Completed: {completed.length} / {hydrationGoal}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {hydrationGoals.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleComplete(time)}
                  className={`flex flex-col items-center justify-center border-2 rounded-xl p-4 transition-all ${
                    completed.includes(time)
                      ? "bg-gradient-to-br from-gray-800 to-gray-700 border-blue-500 text-blue-300 shadow-md"
                      : "bg-gray-800 hover:bg-gray-700 border-gray-600 shadow-sm text-gray-300"
                  }`}
                >
                  <motion.span 
                    animate={{ 
                      y: completed.includes(time) ? [0, -5, 0] : 0,
                      scale: completed.includes(time) ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl"
                  >
                    💧
                  </motion.span>
                  <span className="text-sm mt-2 font-medium">{time}</span>
                  {completed.includes(time) && (
                    <CheckCircle className="w-5 h-5 mt-1 text-blue-400 animate-pulse" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="visual"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-64 h-64 mb-8">
              {/* Water bottle visualization */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-32 h-56 border-4 border-blue-500 rounded-b-3xl rounded-t-lg bg-gray-800 overflow-hidden">
                  <motion.div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400"
                    initial={{ height: "0%" }}
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 1.5, type: "spring" }}
                  >
                    <motion.div
                      className="w-full h-4 bg-blue-300 opacity-30"
                      animate={{ 
                        y: [0, -8, 0],
                        scaleX: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Water drops animation */}
              {completed.length > 0 && (
                <AnimatePresence>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: [-20, -100],
                        x: Math.random() * 40 - 20
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity
                      }}
                      className="absolute top-0 text-blue-400"
                      style={{ left: "50%" }}
                    >
                      <Droplet size={24} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-300 mb-2">
                {progress < 50 
                  ? "Keep going! 💪" 
                  : progress < 80 
                    ? "You're halfway there! 🌊" 
                    : "Almost there! 🎊"}
              </h3>
              <p className="text-gray-400 mb-4">
                {completed.length} of {hydrationGoal} glasses completed
              </p>
              
              <div className="flex justify-center gap-4">
                {hydrationGoals.slice(0, 3).map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleComplete(time)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completed.includes(time)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {time.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-700">
        <label className="flex items-center gap-2 text-sm text-gray-400 mb-4 sm:mb-0">
          <input
            type="checkbox"
            checked={reminder}
            onChange={() => setReminder(!reminder)}
            className="w-5 h-5 rounded accent-blue-500"
          />
          ⏰ Enable Hydration Reminders
        </label>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all shadow-blue-500/20"
            onClick={() => {
              localStorage.setItem('hydrationProgress', JSON.stringify(completed));
            }}
          >
            <Bell className="w-5 h-5" /> 
            <span>Save Progress</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-800 border border-gray-600 text-blue-300 px-6 py-3 rounded-xl hover:bg-gray-700 transition-all"
            onClick={() => {
              const newGoal = hydrationGoal === 8 ? 10 : hydrationGoal === 10 ? 12 : 8;
              setHydrationGoal(newGoal);
              setCompleted([]);
            }}
          >
            <Waves className="w-5 h-5" />
            <span>Change Goal</span>
          </motion.button>
        </div>
      </div>
    </section>
   </section>
  );
}