import React, { useState } from "react";
import { Bookmark, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addMealToPlanner } from "../../services/allApis";
import { mealsData } from "./mealsData";


const allMeals = Object.values(mealsData).flat();
const tabs = ["All", "Breakfast", "Lunch", "Dinner"];

export default function MealsCards() {
  const [selectedTab, setSelectedTab] = useState("All");

  const displayedMeals =
    selectedTab === "All" ? allMeals : mealsData[selectedTab] || [];

  const handleSaveMeal = async (meal) => {
    try {
      await addMealToPlanner({
        title: meal.title,
        imageUrl: meal.imageUrl,
        tags: meal.tags,
        benefit: meal.benefit,
        mealType: meal.mealType, // Use the actual meal type
      });
      toast.success(`${meal.title} added to ${meal.mealType} planner!`);
    } catch (error) {
      toast.error("Failed to save meal.");
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen text-white py-10 px-6">

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-500 tracking-wider text-center mb-8">
        Meal Plans
      </h1>

      {/* Tabs */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-2 rounded-full ${
                selectedTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-orange-400 hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* View Planner Button */}
        <div className="absolute right-0">
          <Link to="/nutrition/mealplanner">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-full shadow">
              View Planner
            </button>
          </Link>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMeals.map((meal, idx) => (
          <Card
            key={idx}
            className="overflow-hidden rounded-xl bg-white/10 backdrop-blur shadow hover:shadow-xl transition"
          >
            <img
              src={meal.imageUrl}
              alt={meal.title}
              className="h-44 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold text-green-400 mb-1">
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
              <div className="flex justify-center gap-4">
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