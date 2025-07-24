import React, { useState, useEffect } from "react";
import { Bookmark, Plus, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addMealToPlanner, fetchAllMeals } from "../../services/allApis";

const tabs = ["All", "Breakfast", "Lunch", "Dinner", "Snack"];

const fallbackImages = {
  Breakfast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY5NTAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5CcmVha2Zhc3Q8L3RleHQ+Cjwvc3ZnPg==',
  Lunch: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMzRBODUzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MdW5jaDwvdGV4dD4KPC9zdmc+',
  Dinner: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzAzN0ZGIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EaW5uZXI8L3RleHQ+Cjwvc3ZnPg==',
  Snack: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY2NkI5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TbmFjazwvdGV4dD4KPC9zdmc+',
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NZWFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
};

const getFallbackImage = (mealType) => {
  return fallbackImages[mealType] || fallbackImages.default;
};

export default function MealsCards() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const loadMeals = async (showRetryIndicator = false) => {
    try {
      if (showRetryIndicator) {
        setRetrying(true);
      } else {
        setLoading(true);
      }
      
      setNetworkError(false);
      
      console.log('🍽️ Fetching meals...');
      const res = await fetchAllMeals();
      
      let mealsData = [];
      if (res && res.data) {
        mealsData = Array.isArray(res.data) ? res.data : [];
      } else if (Array.isArray(res)) {
        mealsData = res;
      }
      
      console.log('✅ Meals loaded successfully:', mealsData.length);
      setAllMeals(mealsData);
      setLastFetchTime(new Date());
      
      if (mealsData.length === 0) {
        toast.info("No meals found. Please add some meals from the admin panel.");
      }
      
    } catch (error) {
      console.error('❌ Error loading meals:', error);
      setNetworkError(true);
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        toast.error("Network connection failed. Please check your internet connection.");
      } else if (error.code === 'ECONNREFUSED') {
        toast.error("Server is not responding. Please try again later.");
      } else if (error.response?.status === 404) {
        toast.error("Meals endpoint not found. Please check the server configuration.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again in a moment.");
      } else {
        toast.error("Failed to load meals. Please try again.");
      }
      
      setAllMeals([]);
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleRetry = () => {
    loadMeals(true);
  };

  const filteredMeals = selectedTab === "All" 
    ? allMeals 
    : allMeals.filter((meal) => meal.mealType === selectedTab);

  const handleSaveMeal = async (meal) => {
    try {
      await addMealToPlanner(meal);
      toast.success(`${meal.title} added to planner!`);
    } catch (error) {
      console.error('❌ Error adding to planner:', error);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network error. Please check your connection.");
      } else if (error.response?.status === 409) {
        toast.error("This meal is already in your planner.");
      } else {
        toast.error("Failed to add to planner. Please try again.");
      }
    }
  };

  const handleImageError = (e, mealType) => {
    console.log('🖼️ Image failed to load, using fallback for:', mealType);
    e.target.src = getFallbackImage(mealType);
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <section className="bg-gray-900 min-h-screen text-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-500 mb-2 tracking-wider">
            Meal Plans
          </h1>
          {lastFetchTime && (
            <p className="text-sm text-gray-400">
              Last updated: {lastFetchTime.toLocaleTimeString()}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-5 py-2 rounded-full text-sm transition font-semibold ${
                  selectedTab === tab
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-700 text-orange-400 hover:bg-gray-600"
                }`}
              >
                {tab}
                {tab !== "All" && (
                  <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                    {allMeals.filter(meal => meal.mealType === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              disabled={loading || retrying}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <Link to="/nutrition/mealplanner">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow transition">
                View Planner
              </button>
            </Link>
          </div>
        </div>

        {networkError && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 flex items-center gap-3">
            <WifiOff className="w-5 h-5 text-red-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-200">Connection Issue</h3>
              <p className="text-sm text-red-300">
                Unable to connect to the server. Please check your internet connection or try again later.
              </p>
            </div>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Loading delicious meals...</p>
          </div>
        ) : filteredMeals.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {selectedTab === "All" ? "No meals available" : `No ${selectedTab.toLowerCase()} meals found`}
              </h3>
              <p className="text-gray-400 mb-4">
                {networkError 
                  ? "Please check your connection and try again."
                  : "Meals will appear here once they're added by the admin."
                }
              </p>
              {selectedTab !== "All" && (
                <button
                  onClick={() => setSelectedTab("All")}
                  className="text-green-400 hover:text-green-300 text-sm underline"
                >
                  View all categories
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <p className="text-gray-400 text-sm">
                Showing {filteredMeals.length} {selectedTab === "All" ? "meals" : `${selectedTab.toLowerCase()} meals`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMeals.map((meal) => (
                <Card
                  key={meal._id}
                  className="overflow-hidden rounded-xl bg-white/10 backdrop-blur shadow hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={meal.imageUrl || getFallbackImage(meal.mealType)}
                      alt={meal.title}
                      className="h-44 w-full object-cover"
                      onError={(e) => handleImageError(e, meal.mealType)}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {meal.mealType}
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-green-400 line-clamp-2">
                      {meal.title}
                    </h3>

                    <p className="text-sm text-gray-300 line-clamp-2">
                      {meal.benefit || "Nutritious and delicious meal option"}
                    </p>

                    {meal.tags && meal.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {meal.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {meal.tags.length > 3 && (
                          <span className="text-xs text-gray-400 px-2 py-1">
                            +{meal.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSaveMeal(meal)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Bookmark className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleSaveMeal(meal)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="fixed bottom-4 right-4 z-50">
          {networkError ? (
            <div className="bg-red-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">Offline</span>
            </div>
          ) : (
            <div className="bg-green-500 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2 opacity-50">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">Online</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}