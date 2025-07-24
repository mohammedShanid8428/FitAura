import React, { useState, useEffect } from "react";
import { fetchAllMeals, fetchPlannerMeals, addMealToPlanner, deleteMealFromPlanner } from "../../services/allApis";
import toast from "react-hot-toast";
import MealsCard from "../../components/nutritions/MealsCards";

export default function NutritionPlanner() {
  const [allMeals, setAllMeals] = useState([]);
  const [plannerMeals, setPlannerMeals] = useState([]);
  const [isPlannerMode, setIsPlannerMode] = useState(false);

  useEffect(() => {
    loadAllMeals();
    loadPlannerMeals();
  }, []);

  const loadAllMeals = async () => {
    try {
      const res = await fetchAllMeals();
      setAllMeals(res.data || []);
    } catch (err) {
      toast.error("Failed to load meals");
    }
  };

  const loadPlannerMeals = async () => {
    try {
      const res = await fetchPlannerMeals();
      setPlannerMeals(res.data || []);
    } catch (err) {
      toast.error("Failed to load planner meals");
    }
  };

  const handleAddToPlanner = async (meal) => {
    try {
      const res = await addMealToPlanner(meal);
      toast.success("Meal added to planner");
      setPlannerMeals((prev) => [res.data, ...prev]);
    } catch (err) {
      toast.error("Failed to add meal");
    }
  };

  const handleDeleteFromPlanner = async (id) => {
    try {
      await deleteMealFromPlanner(id);
      toast.success("Meal removed from planner");
      setPlannerMeals((prev) => prev.filter((meal) => meal._id !== id));
    } catch (err) {
      toast.error("Failed to delete meal");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {isPlannerMode ? "Your Planned Meals" : "All Meals"}
        </h2>
        <button
          onClick={() => setIsPlannerMode(!isPlannerMode)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isPlannerMode ? "View All Meals" : "View My Planner"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(isPlannerMode ? plannerMeals : allMeals).map((meal) => (
          <MealsCard
            key={meal._id}
            meal={meal}
            isPlannerMode={isPlannerMode}
            onAdd={() => handleAddToPlanner(meal)}
            onDelete={() => handleDeleteFromPlanner(meal._id)}
          />
        ))}
      </div>
    </div>
  );
}
