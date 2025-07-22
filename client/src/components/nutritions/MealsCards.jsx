import React, { useState, useEffect } from "react";
import { Bookmark, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addMealToPlanner, fetchAllMeals } from "../../services/allApis";

const tabs = ["All", "Breakfast", "Lunch", "Dinner"];

export default function MealsCards() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [allMeals, setAllMeals] = useState([]);

  const loadMeals = async () => {
    try {
      const res = await fetchAllMeals();
      console.log("Fetched Meals Data:", res.data);
      setAllMeals(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error("Failed to fetch meals.");
      console.error(error);
      setAllMeals([]);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const displayedMeals =
    selectedTab === "All"
      ? allMeals
      : allMeals.filter((meal) => meal.mealType === selectedTab);

  const handleSaveMeal = async (meal) => {
    try {
      await addMealToPlanner(meal);
      toast.success(`${meal.title} added to planner!`);
    } catch (error) {
      toast.error("Failed to add to planner.");
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen text-white py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-500 tracking-wider text-center mb-8">
        Meal Plans
      </h1>

      <div className="relative flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-2 rounded-full text-sm ${
                selectedTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-orange-400 hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Link to="/nutrition/mealplanner">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-full shadow">
            View Planner
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMeals.map((meal) => (
          <Card
            key={meal._id}
            className="overflow-hidden rounded-xl bg-white/10 backdrop-blur shadow hover:shadow-xl transition"
          >
            <img
              src={meal.imageUrl}
              alt={meal.title}
              className="h-44 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                {meal.title}
              </h3>
              <p className="text-sm text-gray-200 mb-3">{meal.benefit}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {meal.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveMeal(meal)}
                >
                  <Bookmark className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveMeal(meal)}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
