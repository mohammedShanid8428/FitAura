import React from "react";
import { motion } from "framer-motion";

export default function TagMarquee() {
  const tags = [
    { icon: "/icons/gym.svg", label: "Gym Power" },
    { icon: "/icons/yoga.svg", label: "Yoga Flow" },
    { icon: "/icons/cardio.svg", label: "Cardio Blast" },
    { icon: "/icons/meditation.svg", label: "Meditation Calm" },
    { icon: "/icons/stretch.svg", label: "Stretch Routine" },
    { icon: "/icons/nutrition.svg", label: "Balanced Nutrition" },
    { icon: "/icons/workout.svg", label: "HIIT Training" },
    { icon: "/icons/mindfulness.svg", label: "Mindfulness" },
  ];

  return (
    <section className="bg-[#CCFF00] py-4 overflow-hidden">
      <div className="relative w-full">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {[...tags, ...tags].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-6 min-w-fit"
            >
              <img src={item.icon} alt={item.label} className="h-6" />
              <span className="font-semibold text-black text-lg whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
