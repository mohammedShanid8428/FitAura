import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play,CheckCircle } from "lucide-react";
import { exerciseImg, images } from "../../assets/images"; // make sure this path is valid
import Header from "../../components/Header";
import Plan from "../../components/routines/Plan";
import Templete from "../../components/routines/Templete";
import Service from "../../components/routines/Service";
import Strech from "../../components/routines/Strech";
import Yoga from "../../components/routines/Yoga";
import Hydration from "../../components/routines/Hydration";

import Life from "../../components/routines/Life"
import RoutinesHero from "../../components/routines/RoutinesHero";

export default function Routines() {


  return (
    <>
      
      <Header/>
      <section>
        <RoutinesHero/>
      </section>
 
      <section className="bg-[#CCFF00] py-6 px-4">
  <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center space-y-4 md:space-y-0">
    {/* Brand 1 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/robinhood.svg" alt="Robinhood" className="h-6" />
      <span className="font-semibold text-black">Robinhood</span>
    </div>

    {/* Brand 2 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/samsara.svg" alt="Samsara" className="h-6" />
      <span className="font-semibold text-black">Samsara</span>
    </div>

    {/* Brand 3 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/firstbase.svg" alt="Firstbase" className="h-6" />
      <span className="font-semibold text-black">Firstbase</span>
    </div>

    {/* Brand 4 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/fithes.svg" alt="Fithes" className="h-6" />
      <span className="font-semibold text-black">Fithes</span>
    </div>
  </div>
</section>

      <Templete/>

      <Service/>
    
    
    <section className="bg-black py-16 px-6 text-center">
      <h4 className="text-blue-500 uppercase text-sm mb-2">What’s Inside</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        💧 Hydration & Mineral Composition
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
        {/* Left Composition Info */}
        <div className="text-left space-y-5 text-gray-700 text-sm">
          <div>
            <h3 className="font-bold text-blue-700">Calcium+</h3>
            <p>5–13 mg/dm³ — Supports bone health & muscle function.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Magnesium</h3>
            <p>3–5 mg/dm³ — Boosts energy & regulates blood pressure.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Sodium</h3>
            <p>20–25 mg/dm³ — Maintains fluid balance and nerve signals.</p>
          </div>
        </div>

        {/* Center Glass Image */}
        <div className="w-48 md:w-56">
          <img
            src={images.modal15}
            alt="Water glass"
            className="w-full object-contain"
          />
        </div>

        {/* Right Composition Info */}
        <div className="text-left space-y-5 text-gray-700 text-sm">
          <div>
            <h3 className="font-bold text-blue-700">Chlorine</h3>
            <p>&lt; 0.2 mg/dm³ — Keeps water safe & disinfected.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Sourness (pH)</h3>
            <p>6.5–7.5 — Balanced pH for better hydration & digestion.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Mineralization</h3>
            <p>100–150 mg/l — Improves taste & replenishes minerals.</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <a
          href="/hydration"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🚰 Explore Hydration Routine
        </a>
      </div>
    </section>
     
    <Life/>


     
    </>
  );
}
