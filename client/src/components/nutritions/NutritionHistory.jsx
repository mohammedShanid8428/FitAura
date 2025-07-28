import React from "react";
import { Link } from "react-router-dom";
import { BarChartBig, UtensilsCrossed } from "lucide-react";
import { images } from "../../assets/images";

export default function NutritionHistory() {
  return (
    <section className="px-6 py-14 mb-12 rounded-2xl max-w-6xl mx-auto mb-20 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left: Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center tracking-wide gap-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-300 to-green-500">
            <BarChartBig className="w-8 h-8 text-green-400" />
            Your Nutrition History
          </h2>

          <p className="text-gray-200 mb-8 text-sm md:text-base leading-relaxed">
            Easily track, review, and manage your saved meals over time. Organize your weekly nutrition, remove outdated items, and build consistent, healthy eating habits effortlessly.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/nutrition/mealplanner">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-orange-500/50 transition transform hover:scale-105 flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5" />
                Go to Planner
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Visual Section */}
        <div className="w-80 h-60 relative group transition">
          <img
            src={images.modal23}
            alt="Nutrition History"
            className="w-full h-full rounded-xl shadow-lg object-cover transform group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 rounded-xl bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"></div>
        </div>

      </div>
    </section>
  );
}
