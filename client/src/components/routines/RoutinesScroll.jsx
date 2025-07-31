import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Flower,
  HeartPulse,
  Brain,
  StretchHorizontal,
  Apple,
  Flame,
  Smile,
} from "lucide-react";

export default function TagMarquee() {
  const tags = [
    { icon: <Dumbbell size={20} />, label: "Gym Power" },
    { icon: <Flower size={20} />, label: "Yoga Flow" },
    { icon: <HeartPulse size={20} />, label: "Cardio Blast" },
    { icon: <Brain size={20} />, label: "Meditation Calm" },
    { icon: <StretchHorizontal size={20} />, label: "Stretch Routine" },
    { icon: <Apple size={20} />, label: "Balanced Nutrition" },
    { icon: <Flame size={20} />, label: "HIIT Training" },
    { icon: <Smile size={20} />, label: "Mindfulness" },
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
              <span className="text-black">{item.icon}</span>
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
