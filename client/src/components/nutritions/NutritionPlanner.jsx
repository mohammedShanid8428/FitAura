import React, { useState, useEffect } from "react";
import { fetchPlannerMeals, deleteMealFromPlanner } from "../../services/allApis";

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

export default function Planner() {
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const res = await fetchPlannerMeals();
      setSavedMeals(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load meals.", err);
      setSavedMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await deleteMealFromPlanner(mealId);
      setSavedMeals((prev) => prev.filter((meal) => meal._id !== mealId));
    } catch (err) {
      console.error("Failed to delete meal.", err);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-8 text-center">
          My Meal Planner
        </h1>

        {loading && (
          <p className="text-center text-gray-500 mb-10">
            Loading your meals...
          </p>
        )}

        {!loading && savedMeals.length === 0 && (
          <p className="text-center text-gray-400 italic">
            No meals saved to planner yet.
          </p>
        )}

        {!loading &&
          mealTypes.map((type) => {
            const filteredMeals = savedMeals.filter(
              (meal) => meal.mealType === type
            );

            return (
              <div key={type} className="mb-10">
                <h2 className="text-lg sm:text-xl font-bold text-green-500 mb-3">
                  {type}
                </h2>

                <div className="flex overflow-x-auto gap-4 pb-2">
                  {filteredMeals.length === 0 ? (
                    <p className="text-gray-400 italic whitespace-nowrap">
                      No {type} meals planned.
                    </p>
                  ) : (
                    filteredMeals.map((meal) => (
                      <div
                        key={meal._id}
                        className="min-w-[160px] sm:min-w-[200px] bg-white rounded-lg shadow hover:shadow-md transition"
                      >
                        <img
                          src={meal.imageUrl}
                          alt={meal.title}
                          className="h-28 sm:h-32 w-full object-cover rounded-t-lg"
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-green-600 text-sm sm:text-base">
                            {meal.title}
                          </h3>
                          <button
                            onClick={() => handleDeleteMeal(meal._id)}
                            className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
