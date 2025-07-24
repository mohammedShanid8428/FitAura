import React from "react";
import RoutineDash from "../../components/dashboard/RoutineDash";
// Import other dashboards if needed

export default function HealthDashboard({ userName = "User" }) {
  const userId = localStorage.getItem("userId"); // ✅ Your login must set this

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>
          <p className="text-gray-600">Track your health & wellness today</p>
        </div>
        <img
          src={`https://ui-avatars.com/api/?name=${userName}`}
          alt="Profile"
          className="w-14 h-14 rounded-full border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RoutineDash userId={userId} />
        {/* <NutritionDash userId={userId} /> */}
        {/* <HydrationDash userId={userId} /> */}
        {/* <MoodDash userId={userId} /> */}
      </div>
    </div>
  );
}
