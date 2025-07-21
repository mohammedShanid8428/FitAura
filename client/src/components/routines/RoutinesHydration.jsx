import React from "react";
import { images } from "../../assets/images";

export default function RoutinesHydration() {
  return (
    <section className="py-16 px-6 text-center">
      <h4 className="text-blue-300 uppercase text-sm mb-3  ">
        What’s Inside
      </h4>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-blue-400 tracking-wider">
        💧 Hydration & Mineral Composition
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">


        <div className="bg-[#1c1c1c] p-6 rounded-2xl shadow-xl space-y-5 text-left text-gray-300 text-md w-full md:w-1/3">
          <div>
            <h3 className="font-semibold text-blue-400">Calcium+</h3>
            <p className="text-gray-300">5–13 mg/dm³ — Supports bone health & muscle function.</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Magnesium</h3>
            <p>3–5 mg/dm³ — Boosts energy & regulates blood pressure.</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Sodium</h3>
            <p>20–25 mg/dm³ — Maintains fluid balance and nerve signals.</p>
          </div>
        </div>

        <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-b from-[#202020] to-[#1a1a1a] p-4 rounded-full shadow-inner flex items-center justify-center">
          <img
            src={images.modal15}
            alt="Water glass"
            className="w-full h-full rounded-full object-contain"
          />
        </div>

        
        <div className="bg-[#1c1c1c] p-6 rounded-2xl shadow-xl space-y-5 text-left text-gray-300 text-md w-full md:w-1/3">
          <div>
            <h3 className="font-semibold text-blue-400">Chlorine</h3>
            <p>&lt; 0.2 mg/dm³ — Keeps water safe & disinfected.</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Sourness (pH)</h3>
            <p>6.5–7.5 — Balanced pH for better hydration & digestion.</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-400">Mineralization</h3>
            <p>100–150 mg/l — Improves taste & replenishes minerals.</p>
          </div>
        </div>
      </div>

    
      <div className="mt-12">
        <a
          href="/hydration"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition transform duration-300 inline-block"
        >
          🚰 Explore Hydration Routine
        </a>
      </div>
    </section>
  );
}
