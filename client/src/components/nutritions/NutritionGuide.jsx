import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, Plus, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import toast from "react-hot-toast";
import { addMealToPlanner, fetchAllMeals } from "../../services/allApis";

const fallbackImages = {
  happy: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkZEQjAwIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iYmxhY2siIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IYXBweSBNZWFsPC90ZXh0Pgo8L3N2Zz4=',
  sad: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNjM2NkY3Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TYWQgTWVhbDwvdGV4dD4KPC9zdmc+',
  angry: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRkY0ODQ0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BbmdyeSBNZWFsPC90ZXh0Pgo8L3N2Zz4=',
  anxiety: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjU5RTBCIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BbnhpZXR5IE1lYWw8L3RleHQ+Cjwvc3ZnPg==',
  tired: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjOTMzM0VBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UaXJlZCBNZWFsPC90ZXh0Pgo8L3N2Zz4=',
  "weight loss": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMTBCOTgxIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5XZWlnaHQgTG9zczwvdGV4dD4KPC9zdmc+',
  "weight gain": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5XZWlnaHQgR2FpbjwvdGV4dD4KPC9zdmc+',
  fitness: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMDU5RkY5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GaXRuZXNzIE1lYWw8L3RleHQ+Cjwvc3ZnPg==',
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNkI3Mjg0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NZWFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
};

const categoryTitles = {
  happy: "😊 Happy Mood Meals",
  sad: "😢 Sad Mood Meals", 
  angry: "😠 Angry Mood Meals",
  anxiety: "😰 Anxiety Relief Meals",
  tired: "😴 Energy Boosting Meals",
  "weight loss": "⚖️ Weight Loss Meals",
  "weight gain": "💪 Weight Gain Meals", 
  fitness: "🏃 Fitness Support Meals"
};

const categoryDescriptions = {
  happy: "Nutritious meals to maintain your positive energy and mood",
  sad: "Comfort foods that can help boost your spirits naturally",
  angry: "Calming meals with nutrients that help reduce stress and tension",
  anxiety: "Soothing foods rich in magnesium and omega-3s to ease anxiety",
  tired: "Energy-rich meals packed with vitamins and minerals to combat fatigue",
  "weight loss": "Low-calorie, high-nutrition meals to support healthy weight loss",
  "weight gain": "Nutrient-dense, calorie-rich meals for healthy weight gain",
  fitness: "Protein-rich meals to fuel your workouts and recovery"
};

const getFallbackImage = (category) => {
  return fallbackImages[category.toLowerCase()] || fallbackImages.default;
};

export default function NutritionGuidePage() {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    loadCategoryMeals();
  }, [category]);

  const loadCategoryMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetchAllMeals();
      let mealsData = [];
      
      if (res && res.data) {
        mealsData = Array.isArray(res.data) ? res.data : [];
      } else if (Array.isArray(res)) {
        mealsData = res;
      }

      const categoryMeals = mealsData.filter(meal => {
        if (!meal.mealType) return false;
        
        const mealTypes = Array.isArray(meal.mealType) ? meal.mealType : [meal.mealType];
        return mealTypes.some(type => 
          type.toLowerCase() === category.toLowerCase() ||
          type.toLowerCase() === category.toLowerCase().replace(' ', ' ')
        );
      });

      setMeals(categoryMeals);
      
      if (categoryMeals.length === 0) {
        toast.info(`No meals found for ${category}. Please check back later.`);
      }
      
    } catch (error) {
      console.error('Error loading category meals:', error);
      setError('Failed to load meals. Please try again.');
      toast.error('Failed to load meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeal = async (meal) => {
    try {
      const mealData = {
        title: meal.title,
        imageUrl: meal.imageUrl || getFallbackImage(category),
        tags: meal.tags || [],
        benefit: meal.benefit || categoryDescriptions[category.toLowerCase()],
        mealType: meal.mealType || [category.toLowerCase()]
      };

      await addMealToPlanner(mealData);
      toast.success(`${meal.title} added to planner!`);
    } catch (error) {
      console.error('Error adding to planner:', error);
      
      if (error.code === 'ERR_NETWORK') {
        toast.error("Network error. Please check your connection.");
      } else if (error.response?.status === 409) {
        toast.error("This meal is already in your planner.");
      } else {
        toast.error("Failed to add to planner. Please try again.");
      }
    }
  };

  const handleRetry = () => {
    loadCategoryMeals();
  };

  const categoryTitle = categoryTitles[category.toLowerCase()] || `${category.charAt(0).toUpperCase() + category.slice(1)} Meals`;
  const categoryDescription = categoryDescriptions[category.toLowerCase()] || `Specialized meals for ${category}`;

  return (
    <section className="bg-gray-900 min-h-screen text-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/nutrition" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-4 tracking-wider">
            {categoryTitle}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {categoryDescription}
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-400">
            <p className="text-sm">
              {loading ? 'Loading...' : `Found ${meals.length} meals for ${category}`}
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            
            <Link to="/nutrition/mealplanner">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow transition">
                View Planner
              </button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-200 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden rounded-xl bg-gray-800 animate-pulse">
                <div className="bg-gray-700 h-44 w-full"></div>
                <CardContent className="p-4 space-y-3">
                  <div className="h-6 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-700 rounded flex-1"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : meals.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No meals found for {category}
              </h3>
              <p className="text-gray-400 mb-4">
                We're working on adding more meals for this category. Please check back later.
              </p>
              <Link to="/nutrition" className="text-green-400 hover:text-green-300 text-sm underline">
                Explore other categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <Card
                key={meal._id}
                className="overflow-hidden rounded-xl bg-white/10 backdrop-blur shadow hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={loadedImages[meal._id] || meal.imageUrl || getFallbackImage(category)}
                    alt={meal.title}
                    className="h-44 w-full object-cover"
                    onLoad={() => setLoadedImages(prev => ({
                      ...prev,
                      [meal._id]: meal.imageUrl
                    }))}
                    onError={(e) => {
                      e.target.src = getFallbackImage(category);
                      setLoadedImages(prev => ({
                        ...prev,
                        [meal._id]: getFallbackImage(category)
                      }));
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-green-400 line-clamp-2">
                    {meal.title}
                  </h3>

                  <p className="text-sm text-gray-300 line-clamp-2">
                    {meal.benefit || categoryDescription}
                  </p>

                  {meal.tags && meal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {meal.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-200 text-green-900 px-2 py-1 rounded-full"
                        >
                          {tag}
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
        )}
      </div>
    </section>
  );
}