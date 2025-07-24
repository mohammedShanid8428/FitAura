import React, { useEffect, useState } from "react";
import Saved from "./Saved";
import { fetchPlannerMeals, deleteMealFromPlanner } from "../../services/allApis";

export default function SavedMealsPage() {
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSavedMeals();
  }, []);

  const getSavedMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPlannerMeals();

      let meals = [];
      if (Array.isArray(response)) {
        meals = response;
      } else if (response && Array.isArray(response.data)) {
        meals = response.data;
      } else {
        console.warn("Unexpected API response structure:", response);
        meals = [];
      }

      setSavedMeals(meals);
    } catch (error) {
      console.error("Error fetching saved meals:", error);
      setError("Failed to fetch saved meals. Please try again.");
      setSavedMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMeal = async (id) => {
    if (window.confirm("Are you sure you want to remove this meal from your planner?")) {
      try {
        await deleteMealFromPlanner(id);
        const updated = savedMeals.filter((meal) => meal._id !== id);
        setSavedMeals(updated);
        alert("Meal removed successfully!");
      } catch (error) {
        console.error("Error removing meal:", error);
        alert("Failed to remove meal. Please try again.");
      }
    }
  };

  const groupedSavedMeals = savedMeals.reduce((groups, meal) => {
    const mealType = meal.mealType?.toLowerCase() || "general";
    if (!groups[mealType]) groups[mealType] = [];
    groups[mealType].push(meal);
    return groups;
  }, {});

  const mealTypeOrder = ["breakfast", "lunch", "dinner", "snack", "general"];
  const mealTypeNames = {
    breakfast: "🍳 Breakfast",
    lunch: "🥗 Lunch",
    dinner: "🍽️ Dinner",
    snack: "🍿 Snacks",
    general: "🍴 Other Meals",
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">💾 Saved Meals</h2>
        <p>Loading saved meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">💾 Saved Meals</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={getSavedMeals}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="bg-gray-800">
      <div className="p-6 md:p-10 bg-gray-800 min-h-screen">
        <h2 className="text-3xl md:text-4xl text-orange-600 font-bold text-center tracking-wider mb-8">💾 Saved Meals</h2>

        <div className="mb-6 text-center">
          <p className="text-gray-100">
            You have {savedMeals.length} meals saved in your planner
          </p>
        </div>

        {savedMeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No saved meals yet.</p>
            <p className="text-gray-100">
              Go to the Nutrition Planner to add meals to your collection!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {mealTypeOrder.map((mealType) => {
              const mealsInCategory = groupedSavedMeals[mealType];
              if (!mealsInCategory || mealsInCategory.length === 0) return null;

              return (
                <div key={mealType} className="bg-gray-400 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                    <span>{mealTypeNames[mealType]}</span>
                    <span className="text-sm font-normal text-gray-500">
                      ({mealsInCategory.length} meals)
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <div className="flex gap-4 min-w-full">
                      {mealsInCategory.map((meal) => (
                        <div key={meal._id} className="min-w-[350px]">
                          <Saved meal={meal} onDelete={handleDeleteMeal} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
