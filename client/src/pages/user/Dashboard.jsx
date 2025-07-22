import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import RoutineDash from "../../components/dashboard/RoutineDash";
import NutritionDash from "../../components/dashboard/NutritionDash";
import HydrationDash from "../../components/dashboard/HydrationDash";
import MoodDash from "../../components/dashboard/MoodDash";

export default function HealthDashboard({ userName = "User" }) {
  const moodRecovery = 65; // Example %
  const hydrationProgress = 78; // Example %
  const waterGoal = 3000; // ml per day

  const dummyData = [
    { name: "Mon", progress: 60 },
    { name: "Tue", progress: 80 },
    { name: "Wed", progress: 40 },
    { name: "Thu", progress: 70 },
    { name: "Fri", progress: 90 },
    { name: "Sat", progress: 60 },
    { name: "Sun", progress: 50 },
  ];

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>
          <p className="text-gray-600">Track your health & wellness today</p>
        </div>
        <img
          src="https://ui-avatars.com/api/?name=User"
          alt="Profile"
          className="w-14 h-14 rounded-full border"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
       <RoutineDash/>

       <NutritionDash/>

       <HydrationDash/>

       <MoodDash/>
        

        <section>
          <Card title="Fitness Goals">
            <Item label="Weight Loss" progress={40} />
            <Item label="Weight Gain" progress={10} />
            <Item label="Fitness" progress={55} />
          </Card>
        </section>

        <section>
          <Card title="Weekly Progress">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dummyData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="progress" fill="#22c55e" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </section>

      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Item({ label, progress }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <ProgressBar value={progress} />
    </div>
  );
}

function Meal({ label }) {
  return (
    <div className="mb-2 text-sm flex items-center justify-between">
      <span>{label}</span>
      <span className="bg-green-100 text-green-700 rounded-xl px-2 py-0.5 text-xs">
        Planned
      </span>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="bg-gray-200 rounded-full h-3 w-full">
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
