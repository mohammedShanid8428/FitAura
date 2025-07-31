import React, { useEffect, useState } from "react";
import { fetchPlannerMeals } from "../../services/allApis";
import {Utensils,Sun,Sandwich,Moon,Popcorn,Smile,Frown,Angry,MoonStar,Meh,Scale,PlusCircle,Dumbbell,Brain,Activity,Circle,Flame,Beef,
  Carrot,
  ScrollText,
  Plus,
  RefreshCw
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { moodThemes } from "../../components/lib/moodTheme";
 

export default function NutritionDash() {
  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood") || "default";
  const theme = moodThemes[mood] || moodThemes.default;
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showOverview, setShowOverview] = useState(false);


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

  // Group meals by type
  const groupedMeals = savedMeals.reduce((groups, meal) => {
    const mealTypes = Array.isArray(meal.mealType) ? meal.mealType : [meal.mealType || "general"];
    
    mealTypes.forEach(type => {
      const normalizedType = type?.toLowerCase() || "general";
      if (!groups[normalizedType]) groups[normalizedType] = [];
      if (!groups[normalizedType].some(m => m._id === meal._id)) {
        groups[normalizedType].push(meal);
      }
    });
    
    return groups;
  }, {});

  // Tab configuration with Lucide icons
  const tabs = [
    { id: "all", label: "All Meals", icon: <Utensils size={16} />, color: "lime" },
    { id: "breakfast", label: "Breakfast", icon: <Sun size={16} />, color: "yellow" },
    { id: "lunch", label: "Lunch", icon: <Sandwich size={16} />, color: "green" },
    { id: "dinner", label: "Dinner", icon: <Moon size={16} />, color: "orange" },
    { id: "snacks", label: "Snacks", icon: <Popcorn size={16} />, color: "purple" },
    { id: "happy", label: "Happy Mood", icon: <Smile size={16} />, color: "pink" },
    { id: "sad", label: "Sad Mood", icon: <Frown size={16} />, color: "blue" },
    { id: "angry", label: "Angry Mood", icon: <Angry size={16} />, color: "red" },
    { id: "tired", label: "Tired Mood", icon: <MoonStar size={16} />, color: "indigo" },
    { id: "anxious", label: "Anxious Mood", icon: <Meh size={16} />, color: "gray" },
    { id: "weight loss", label: "Weight Loss", icon: <Scale size={16} />, color: "cyan" },
    { id: "weight gain", label: "Weight Gain", icon: <PlusCircle size={16} />, color: "emerald" },
    { id: "muscle gain", label: "Muscle Gain", icon: <Dumbbell size={16} />, color: "amber" },
    { id: "mental health", label: "Mental Health", icon: <Brain size={16} />, color: "violet" },
    { id: "fitness", label: "Fitness", icon: <Activity size={16} />, color: "rose" },
    { id: "general", label: "Other Meals", icon: <Circle size={16} />, color: "slate" },
  ];

  const getVisibleTabs = () => {
    return tabs.filter(tab => 
      tab.id === "all" || (groupedMeals[tab.id] && groupedMeals[tab.id].length > 0)
    );
  };

  const getFilteredMeals = () => {
    if (activeTab === "all") return savedMeals;
    return groupedMeals[activeTab] || [];
  };

  const openMealDetail = (meal) => {
    setSelectedMeal(meal);
  };

  const closeMealDetail = () => {
    setSelectedMeal(null);
  };

  const openOverview = () => {
    setShowOverview(true);
  };

  const closeOverview = () => {
    setShowOverview(false);
  };

  const getTabColorClasses = (color, isActive) => {
    const colorMap = {
      lime: isActive ? "bg-lime-500 text-black" : "text-lime-400 hover:bg-lime-500/20",
      yellow: isActive ? "bg-yellow-500 text-black" : "text-yellow-400 hover:bg-yellow-500/20",
      green: isActive ? "bg-green-500 text-black" : "text-green-400 hover:bg-green-500/20",
      orange: isActive ? "bg-orange-500 text-black" : "text-orange-400 hover:bg-orange-500/20",
      purple: isActive ? "bg-purple-500 text-black" : "text-purple-400 hover:bg-purple-500/20",
      pink: isActive ? "bg-pink-500 text-black" : "text-pink-400 hover:bg-pink-500/20",
      blue: isActive ? "bg-blue-500 text-black" : "text-blue-400 hover:bg-blue-500/20",
      red: isActive ? "bg-red-500 text-black" : "text-red-400 hover:bg-red-500/20",
      cyan: isActive ? "bg-cyan-500 text-black" : "text-cyan-400 hover:bg-cyan-500/20",
      indigo: isActive ? "bg-indigo-500 text-black" : "text-indigo-400 hover:bg-indigo-500/20",
      gray: isActive ? "bg-gray-500 text-black" : "text-gray-400 hover:bg-gray-500/20",
      emerald: isActive ? "bg-emerald-500 text-black" : "text-emerald-400 hover:bg-emerald-500/20",
      amber: isActive ? "bg-amber-500 text-black" : "text-amber-400 hover:bg-amber-500/20",
      violet: isActive ? "bg-violet-500 text-black" : "text-violet-400 hover:bg-violet-500/20",
      rose: isActive ? "bg-rose-500 text-black" : "text-rose-400 hover:bg-rose-500/20",
      slate: isActive ? "bg-slate-500 text-black" : "text-slate-400 hover:bg-slate-500/20",
    };
    return colorMap[color] || (isActive ? "bg-lime-500 text-black" : "text-lime-400 hover:bg-lime-500/20");
  };

  // Calculate nutrition totals
  const calculateTotals = () => {
    return savedMeals.reduce((totals, meal) => {
      totals.calories += parseInt(meal.calories || meal.kcal || 0);
      totals.protein += parseInt(meal.protein || 0);
      totals.carbs += parseInt(meal.carbs || meal.carbohydrates || 0);
      totals.fats += parseInt(meal.fats || meal.fat || 0);
      return totals;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  if (loading) {
    return (
      <section className="p-4 flex justify-center">
        <div className=" border border-gray-700 rounded-2xl p-6 w-full max-w-6xl shadow-xl text-white">
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading your nutrition planner...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4 flex justify-center">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-6 w-full max-w-6xl shadow-xl text-white">
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={getSavedMeals}
              className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-2 rounded-lg font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const filteredMeals = getFilteredMeals();
  const totals = calculateTotals();

  return (
    <>
      <section className="p-4 flex justify-center">
        <div className=" border border-gray-700 rounded-2xl p-6 w-full max-w-6xl shadow-xl text-white">
          {/* Header with Overview Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className={`text-3xl font-bold tracking-wide ${theme.text} `}>
              <span className="flex items-center gap-2">
                <Utensils size={24} />
                Your Nutrition Dashboard
              </span>
            </h2>
            <button
              onClick={openOverview}
              className={`hover:from-lime-600 ${theme.bg} ${theme.text} bg-lime-500 text-gray-900 hover:to-green-600  px-4 py-2 rounded-lg font-medium transition flex items-center gap-2`} 
            >
              <ScrollText size={16} />
              Quick Overview
            </button>
          </div>

          {/* Modern Tab Navigation - Scrollable for mobile */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <div className="flex flex-nowrap gap-2 p-1 bg-gray-800/50 rounded-xl min-w-max">
              {getVisibleTabs().map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                    flex items-center gap-2 whitespace-nowrap
                    ${getTabColorClasses(tab.color, activeTab === tab.id)}
                  `}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.id !== "all" && groupedMeals[tab.id] && (
                    <span className="bg-black/30 px-1.5 py-0.5 rounded-full text-xs">
                      {groupedMeals[tab.id].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Meals Grid */}
          {filteredMeals.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center text-6xl mb-4">
                <Utensils size={48} />
              </div>
              <p className="text-gray-400 mb-2">
                {activeTab === "all" ? "No meals in your planner yet." : `No ${activeTab} meals found.`}
              </p>
              <p className="text-gray-500 text-sm">Add meals to see them here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[30rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {filteredMeals.map((meal, index) => (
                <div
                  key={meal._id || index}
                  onClick={() => openMealDetail(meal)}
                  className={`${theme.card} bg-gray-700 border border-gray-600 rounded-xl p-4 hover:border-lime-400/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-lime-500/10`}
                >
                  <div className="relative mb-3">
                    <img
                      src={meal.image || meal.imageUrl || "/api/placeholder/300/200"}
                      alt={meal.title || meal.name || "Meal"}
                      className="w-full h-32 sm:h-40 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/300/200";
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-lime-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Flame size={12} />
                      {meal.calories || meal.kcal || "N/A"} kcal
                    </div>
                  </div>

                  <h3 className={`font-semibold ${theme.text}  tracking-wide mb-2 text-md truncate`}>
                    {meal.title || meal.name || "Untitled Meal"}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
                    <div className="text-center bg-gray-700/50 rounded py-1">
                      <div className="flex justify-center text-orange-400">
                        <Carrot size={16} />
                      </div>
                      <div>{meal.carbs || meal.carbohydrates || "0"}g</div>
                    </div>
                    <div className="text-center bg-gray-700/50 rounded py-1">
                      <div className="flex justify-center text-red-400">
                        <Beef size={16} />
                      </div>
                      <div>{meal.protein || "0"}g</div>
                    </div>
                    <div className="text-center bg-gray-700/50 rounded py-1">
                      <div className="flex justify-center text-yellow-400">
                        <Carrot size={16} />
                      </div>
                      <div>{meal.fats || meal.fat || "0"}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Footer */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
              <span className="text-gray-400">
                Showing {filteredMeals.length} of {savedMeals.length} meals
              </span>
              <button
                onClick={getSavedMeals}
                className="text-lime-400 hover:text-lime-300 transition flex items-center gap-1"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Modal - Mini Nutrition Planner */}
      {showOverview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-600 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent flex items-center gap-2">
                <ScrollText size={24} />
                Nutrition Planner Overview
              </h3>
              <button
                onClick={closeOverview}
                className="text-gray-400 hover:text-white text-3xl transition"
              >
                ×
              </button>
            </div>

            {/* Nutrition Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-lime-500/20 to-green-500/20 border border-lime-500/30 rounded-xl p-4 text-center">
                <div className="flex justify-center text-2xl mb-2">
                  <Flame size={24} />
                </div>
                <div className="text-lime-400 font-bold text-lg">{totals.calories}</div>
                <div className="text-gray-400 text-sm">Total Calories</div>
              </div>
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-4 text-center">
                <div className="flex justify-center text-2xl mb-2">
                  <Beef size={24} />
                </div>
                <div className="text-red-400 font-bold text-lg">{totals.protein}g</div>
                <div className="text-gray-400 text-sm">Protein</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
                <div className="flex justify-center text-2xl mb-2">
                  <Carrot size={24} />
                </div>
                <div className="text-orange-400 font-bold text-lg">{totals.carbs}g</div>
                <div className="text-gray-400 text-sm">Carbs</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                <div className="flex justify-center text-2xl mb-2">
                  <Carrot size={24} />
                </div>
                <div className="text-yellow-400 font-bold text-lg">{totals.fats}g</div>
                <div className="text-gray-400 text-sm">Fats</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-lime-400 mb-4 flex items-center gap-2">
                <ScrollText size={20} />
                Meals by Category
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {tabs.filter(tab => tab.id !== "all").map((tab) => {
                  const categoryMeals = groupedMeals[tab.id] || [];
                  if (categoryMeals.length === 0) return null;

                  return (
                    <div key={tab.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {tab.icon}
                          <span className="font-medium text-white">{tab.label}</span>
                        </div>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                          {categoryMeals.length} meals
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {categoryMeals.slice(0, 3).map((meal, index) => (
                          <div key={meal._id || index} className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-2">
                            <img
                              src={meal.image || meal.imageUrl || "/api/placeholder/40/40"}
                              alt={meal.title || meal.name}
                              className="w-8 h-8 rounded object-cover"
                              onError={(e) => {
                                e.target.src = "/api/placeholder/40/40";
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">
                                {meal.title || meal.name || "Untitled"}
                              </div>
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                <Flame size={12} />
                                {meal.calories || meal.kcal || "N/A"} kcal
                              </div>
                            </div>
                          </div>
                        ))}
                        {categoryMeals.length > 3 && (
                          <div className="text-center text-xs text-gray-400 pt-2">
                            +{categoryMeals.length - 3} more meals
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={closeOverview}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition font-medium"
              >
                Close Overview
              </button>
              <button
                onClick={() => {
                  closeOverview();
                  setActiveTab("all");
                }}
                className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <Utensils size={16} />
                View All Meals
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-600 rounded-2xl p-6 w-full max-w-md shadow-2xl text-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-lime-400 truncate max-w-[80%]">
                {selectedMeal.title || selectedMeal.name || "Meal Details"}
              </h3>
              <button
                onClick={closeMealDetail}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <img
              src={selectedMeal.image || selectedMeal.imageUrl || "/api/placeholder/400/250"}
              alt={selectedMeal.title || selectedMeal.name}
              className="w-full h-48 rounded-xl object-cover mb-4"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/250";
              }}
            />

            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-lime-400 font-semibold mb-2 flex items-center gap-2">
                  <ScrollText size={16} />
                  Nutritional Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 flex items-center gap-1">
                      <Flame size={14} />
                      Calories:
                    </span>
                    <span className="text-white font-medium">
                      {selectedMeal.calories || selectedMeal.kcal || "N/A"} kcal
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 flex items-center gap-1">
                      <Beef size={14} />
                      Protein:
                    </span>
                    <span className="text-white font-medium">
                      {selectedMeal.protein || "N/A"}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 flex items-center gap-1">
                      <Carrot size={14} />
                      Carbs:
                    </span>
                    <span className="text-white font-medium">
                      {selectedMeal.carbs || selectedMeal.carbohydrates || "N/A"}g
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 flex items-center gap-1">
                      <Carrot size={14} />
                      Fats:
                    </span>
                    <span className="text-white font-medium">
                      {selectedMeal.fats || selectedMeal.fat || "N/A"}g
                    </span>
                  </div>
                </div>
              </div>

              {selectedMeal.description && (
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lime-400 font-semibold mb-2 flex items-center gap-2">
                    <ScrollText size={16} />
                    Description
                  </h4>
                  <p className="text-gray-300 text-sm">{selectedMeal.description}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeMealDetail}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Close
                </button>
                <button className="flex-1 bg-lime-500 hover:bg-lime-600 text-black py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Add to Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}