import React from "react";
import { CheckCircle } from "lucide-react";

export default function Templete() {
  const benefits = [
    {
      title: "Improved Focus",
      desc: "Structured routines help reduce distractions and improve productivity.",
    },
    {
      title: "Better Sleep Quality",
      desc: "Maintaining consistent habits supports healthy sleep cycles.",
    },
    {
      title: "Reduced Stress",
      desc: "Daily rituals create predictability and mental clarity.",
    },
    {
      title: "Boosted Confidence",
      desc: "Routine success builds self-trust and long-term discipline.",
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <p className="text-red-500 uppercase tracking-wider mb-2">Why Routine</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Routines Shape a Better, Healthier You
          </h2>
          <p className="text-gray-300 mb-8">
            Routines aren’t just schedules—they’re foundations for physical, mental, and emotional success. Here’s how they transform your life:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 text-red-500">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="/assets/discipline-routine.jpg"
            alt="Routine Discipline"
            className="w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
