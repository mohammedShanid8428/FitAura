import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";

export default function RoutinesHistory() {
  return (
    <section className="px-6 py-14 rounded-2xl max-w-6xl mx-auto  shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-green-300 to-lime-500">
            📅 Your Routine History
          </h2>

          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
            Track, manage, and review your past workouts, yoga sessions, and stretching plans. Maintain consistency, revisit routines, and build sustainable healthy habits for a stronger body and mind.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/routines/service">
              <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-lime-500/50 transition transform hover:scale-105">
                🏋️ View My Routines
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="w-80 h-60 relative group transition">
          <img
            src={images.modal8}
            alt="Routine History"
            className="w-full h-full rounded-xl shadow-lg object-cover transform group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 rounded-xl bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"></div>
        </div>

      </div>
    </section>
  );
}
