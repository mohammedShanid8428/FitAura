import React from "react";
import RoutineDash from "../../components/dashboard/RoutineDash";
import NutritionDash from "../../components/dashboard/NutritionDash";
import HydrationDash from "../../components/dashboard/HydrationDash";
import MoodDash from "../../components/dashboard/MoodDash";
import Header from "../../components/common/Header";
import Footer from '../../components/common/Footer';
export default function Dashboard({ userName = "User" }) {
  const userId = localStorage.getItem("userId");

  return (
    <>
    <Header/>
    <div className="bg-black p-6 font-sans text-gray-400">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-lime-400">Welcome, {userName} 👋</h1>
          <p className="text-gray-400">Track your health & wellness today</p>
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${userName}&background=000000&color=lime`}
          alt="Profile"
          className="w-14 h-14 rounded-full border border-lime-400"
        />
      </div>

      {/* Section 1: Routine + Hydration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1f1f1f]  rounded-xl border border-gray-700 shadow">
          <RoutineDash userId={userId} />
        </div>
        <div className="bg-[#1f1f1f]  rounded-xl border border-gray-700 shadow">
          <HydrationDash userId={userId} />
        </div>
      </div>

      {/* Section 2: Nutrition + Mood */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1f1f1f]  rounded-xl border border-gray-700 shadow">
          <NutritionDash />
        </div>
        <div className="bg-[#1f1f1f] rounded-xl border border-gray-700 shadow">
          <MoodDash userId={userId} />
        </div>
      </div>
    </div>
 <Footer/>
    </>
  );
}
