import React from "react";
import { motion } from "framer-motion";
import {
  Apple,
  Leaf,
  Salad,
  Carrot,
  Soup,
  Wheat,
  Drumstick,
  Smile,
} from "lucide-react";

export default function NutritionScroll() {
  const tags = [
    { icon: <Apple size={20} />, label: "Fresh Fruits" },
    { icon: <Leaf size={20} />, label: "Plant-Based" },
    { icon: <Salad size={20} />, label: "Green Salads" },
    { icon: <Carrot size={20} />, label: "Root Veggies" },
    { icon: <Soup size={20} />, label: "Healthy Soups" },
    { icon: <Wheat size={20} />, label: "Whole Grains" },
    { icon: <Drumstick size={20} />, label: "Lean Proteins" },
    { icon: <Smile size={20} />, label: "Eat & Glow" },
  ];

  return (
    <section className="bg-orange-500 py-4 overflow-hidden">
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
              <span className="text-white">{item.icon}</span>
              <span className="font-semibold text-white text-lg whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
