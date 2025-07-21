import React, { useState } from "react";
import { mealsData } from "./mealsData";


const mealTypes = ["Breakfast", "Lunch", "Dinner"];
const moods = ["Happy", "Sad", "Anxious", "Tired", "Angry", "Fitness", "Weight Loss", "Weight Gain"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Planner() {
  const [selectedPlan, setSelectedPlan] = useState("Weekly");
  const [selectedMealType, setSelectedMealType] = useState("Breakfast");
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto flex">

        {/* Sidebar */}
        <aside className="w-44 bg-white shadow rounded-xl p-4 mr-6 h-fit sticky top-10">
          <h2 className="text-lg font-semibold text-green-600 mb-4 text-center">Plan Type</h2>
          {["Daily", "Weekly", "Custom"].map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`block w-full text-left px-4 py-2 mb-3 rounded-lg font-semibold text-sm transition ${
                selectedPlan === plan
                  ? "bg-green-500 text-white shadow"
                  : "bg-gray-50 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {plan} Plan
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex-1">

          {/* Header */}
          <h1 className="text-3xl font-bold text-green-600 mb-2 text-center">
            {selectedPlan} Meal Planner
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Select meals and moods to customize your {selectedPlan.toLowerCase()} plan.
          </p>

          {/* Meal Type Tabs */}
          <div className="flex justify-center gap-3 mb-4 flex-wrap">
            {mealTypes.map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMealType(meal)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedMealType === meal
                    ? "bg-green-500 text-white"
                    : "bg-white border border-green-400 text-green-500"
                }`}
              >
                {meal}
              </button>
            ))}
          </div>

          {/* Mood Filters */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedMood === mood
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {mood}
              </button>
            ))}
            <button
              onClick={() => setSelectedMood(null)}
              className="px-3 py-1 rounded-full bg-red-400 text-white text-sm font-medium"
            >
              Clear Mood
            </button>
          </div>

          {/* Weekly/Daily Planner */}
          <div className="space-y-10">
            {daysOfWeek.map((day) => {
              const mealsArray = mealsData[selectedMealType];
              const randomMeal = mealsArray[Math.floor(Math.random() * mealsArray.length)];

              return (
                <div key={day} className="bg-white rounded-xl shadow p-4">
                  <h2 className="text-xl font-bold text-green-500 mb-4">{day}</h2>

                  <div className="flex flex-wrap justify-center">
                    <div className="w-full sm:w-[300px] bg-gray-50 rounded-lg shadow hover:shadow-md transition">
                      <img
                        src={randomMeal.imageUrl}
                        alt={randomMeal.title}
                        className="h-40 w-full object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-green-600 mb-1">
                          {selectedMealType}: {randomMeal.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {selectedMood ? `${selectedMood} Boost Meal` : randomMeal.benefit}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {randomMeal.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}


