import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ProgramSection() {
  const programs = [
    {
      title: "Morning Boost",
      desc: "Wake early, stretch, hydrate, and set intentions.",
    },
    {
      title: "Mindful Midday",
      desc: "Take breaks, nourish, and re-align your focus.",
    },
    {
      title: "Evening Energy",
      desc: "Gentle movement, reflect on wins, connect with self.",
    },
    {
      title: "Night Recharge",
      desc: "Unplug, relax, breathe, and sleep deeply.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-white uppercase font-semibold tracking-wide mb-3">
          Life Routine
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-snug text-lime-400">
          Create Powerful Routines <br /> to Build Your Health & Mind
        </h2>
        <p className="text-gray-300 mb-10">
          The secret to long-term health lies in your <b>daily habits</b>. Our guided routines support your body and mind through all phases of the day — from waking up strong to winding down with clarity.
        </p>

        {/* Program Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {programs.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`border-2 border-lime-400 text-center px-4 py-6 cursor-pointer transition-all duration-300 
                ${
                  activeIndex === index
                    ? "bg-lime-400 text-black"
                    : "bg-[#1a1a1a] hover:bg-lime-400 hover:text-black"
                }
              `}
            >
              <CheckCircle
                className={`mx-auto mb-3 ${
                  activeIndex === index ? "text-black" : "text-lime-400"
                }`}
              />
              <p className="font-bold mb-2">{item.title}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
