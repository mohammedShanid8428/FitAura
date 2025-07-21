import React, { useState, useEffect } from "react";
import { fetchPlannerMeals, deleteMealFromPlanner } from "../../services/allApis";

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

export default function Planner() {
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const data = await fetchPlannerMeals();
      setSavedMeals(data);
    } catch (err) {
      console.error("Failed to load meals.");
    }
  };

  const handleDeleteMeal = async (mealId) => {
    await deleteMealFromPlanner(mealId);
    loadMeals();
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
          My Meal Planner
        </h1>

        {mealTypes.map((type) => (
          <div key={type} className="mb-10">
            <h2 className="text-xl font-bold text-green-500 mb-3">{type}</h2>
            <div className="flex overflow-x-auto gap-4 pb-2">
              {savedMeals.filter((meal) => meal.mealType === type).length === 0 && (
                <p className="text-gray-400 italic">No {type} meals planned.</p>
              )}
              {savedMeals
                .filter((meal) => meal.mealType === type)
                .map((meal) => (
                  <div
                    key={meal._id}
                    className="min-w-[200px] bg-white rounded-lg shadow"
                  >
                    <img
                      src={meal.imageUrl}
                      alt={meal.title}
                      className="h-32 w-full object-cover rounded-t-lg"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-green-600">{meal.title}</h3>
                      <button
                        onClick={() => handleDeleteMeal(meal._id)}
                        className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
