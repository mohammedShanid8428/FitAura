import React from "react";
import { Bookmark, Plus, Eye } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mealsData = {
  Breakfast: [
    {
      title: "Oatmeal with Berries",
      imageUrl: "https://images.unsplash.com/photo-1603048293482-34e0b74fd01b",
      tags: ["#Focus", "#Mood-Boost", "#Light"],
      benefit:
        "Oats provide energy, berries offer antioxidants, and this combo supports mood and focus all morning.",
    },
    {
      title: "Avocado Toast",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      tags: ["#Mood", "#HealthyFat", "#BrainFood"],
      benefit:
        "Healthy fats for brain health, fiber for digestion, and a savory way to start your day.",
    },
    {
      title: "Banana Smoothie",
      imageUrl: "https://images.unsplash.com/photo-1572441710521-50c79f6be7b4",
      tags: ["#Potassium", "#Energy", "#WeightGain"],
      benefit:
        "High in potassium and energy-boosting carbs, perfect for active mornings or post-exercise recovery.",
    },
    {
      title: "Boiled Eggs & Toast",
      imageUrl: "https://images.unsplash.com/photo-1606755962773-3b89babc9d90",
      tags: ["#Protein", "#Simple", "#Satiety"],
      benefit:
        "High-protein breakfast that keeps you full, easy to prepare, and fuels your body efficiently.",
    },
    {
      title: "Peanut Butter Banana Toast",
      imageUrl: "https://images.unsplash.com/photo-1584270354949-1f8765ea16c0",
      tags: ["#Energy", "#Protein", "#Tasty"],
      benefit:
        "Nut butter and banana combo delivers protein, potassium, and flavor for a perfect morning treat.",
    },
    {
      title: "Fruit & Yogurt Parfait",
      imageUrl: "https://images.unsplash.com/photo-1569058242287-9a99f36f5981",
      tags: ["#Probiotic", "#VitaminC", "#Fiber"],
      benefit:
        "A gut-friendly, antioxidant-rich breakfast packed with layers of flavor and nutrients.",
    },
    {
      title: "Chia Pudding",
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      tags: ["#Omega3", "#Fiber", "#LightMeal"],
      benefit:
        "Loaded with fiber and healthy fats, great for digestion and gentle on your stomach.",
    },
  ],

  Lunch: [
    {
      title: "Grilled Chicken & Quinoa",
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
      tags: ["#HighProtein", "#Muscle", "#Energy"],
      benefit:
        "Power-packed with lean protein and complex carbs to fuel your day and promote recovery.",
    },
    {
      title: "Veggie Buddha Bowl",
      imageUrl: "https://images.unsplash.com/photo-1572441710521-50c79f6be7b4",
      tags: ["#Fiber", "#Antioxidants", "#Colorful"],
      benefit:
        "A colorful mix of vegetables, grains, and beans for a balanced, nutritious lunch.",
    },
    {
      title: "Salmon & Brown Rice",
      imageUrl: "https://images.unsplash.com/photo-1617191518000-3df1b4b5e325",
      tags: ["#Omega3", "#HeartHealth", "#Protein"],
      benefit:
        "Rich in omega-3s, this combo supports heart health and provides essential nutrients.",
    },
    {
      title: "Paneer Wrap",
      imageUrl: "https://images.unsplash.com/photo-1631515243349-b6767376c095",
      tags: ["#Vegetarian", "#Protein", "#Indian"],
      benefit:
        "Paneer provides calcium and protein, wrapped in whole wheat for a filling vegetarian lunch.",
    },
    {
      title: "Tofu Stir Fry",
      imageUrl: "https://images.unsplash.com/photo-1598514983318-6ffabc7f63fd",
      tags: ["#Vegan", "#LowCal", "#PlantBased"],
      benefit:
        "High in plant protein and fiber, helps balance hormones and keeps energy steady.",
    },
    {
      title: "Chickpea Salad",
      imageUrl: "https://images.unsplash.com/photo-1585238342023-78cbbb4ebfd4",
      tags: ["#PlantProtein", "#Refreshing", "#Fiber"],
      benefit:
        "Chickpeas and veggies deliver protein and crunch for a refreshing midday boost.",
    },
    {
      title: "Lentil Soup",
      imageUrl: "https://images.unsplash.com/photo-1589308078054-832c35b76c89",
      tags: ["#ComfortFood", "#Protein", "#Vegan"],
      benefit:
        "Comforting and nutrient-dense, lentils support heart health and mood regulation.",
    },
  ],

  Dinner: [
    {
      title: "Greek Yogurt & Berries",
      imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31b",
      tags: ["#Probiotic", "#LowCal", "#WeightLoss"],
      benefit:
        "Probiotics for gut health and light nutrition make this ideal for nighttime digestion.",
    },
    {
      title: "Grilled Salmon & Veggies",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      tags: ["#Omega3", "#HeartHealth", "#Protein"],
      benefit:
        "Salmon’s healthy fats support brain and sleep function while veggies add volume and nutrients.",
    },
    {
      title: "Vegetable Pulao",
      imageUrl: "https://images.unsplash.com/photo-1609165885134-03a92c9f5b4c",
      tags: ["#DigestiveHealth", "#ComfortFood", "#PlantBased"],
      benefit:
        "A soothing, fiber-rich rice dish that keeps digestion smooth and sleep calm.",
    },
    {
      title: "Stuffed Bell Peppers",
      imageUrl: "https://images.unsplash.com/photo-1598514983883-e237f5e9c5c4",
      tags: ["#LowCarb", "#Fiber", "#Veggie"],
      benefit:
        "Low-carb and full of nutrients, ideal for dinner without feeling heavy.",
    },
    {
      title: "Mushroom Soup",
      imageUrl: "https://images.unsplash.com/photo-1589927986089-35812388d1b3",
      tags: ["#Immunity", "#Warm", "#LightMeal"],
      benefit:
        "Light, warming soup that helps calm nerves and aids restful sleep.",
    },
    {
      title: "Chicken Stew",
      imageUrl: "https://images.unsplash.com/photo-1608451643042-d622d0bd60b7",
      tags: ["#Protein", "#Comfort", "#Evening"],
      benefit:
        "Hearty and healing, supports muscle recovery and promotes evening relaxation.",
    },
    {
      title: "Mixed Vegetable Curry",
      imageUrl: "https://images.unsplash.com/photo-1593341646782-8a15dc4b2462",
      tags: ["#PlantBased", "#Fiber", "#Balanced"],
      benefit:
        "Nutrient-dense and easy to digest, perfect with rice or roti for a balanced dinner.",
    },
  ],
};
const allMeals = Object.values(mealsData).flat();
const tabs = ["All", "Breakfast", "Lunch", "Dinner"];

export default function MealsCards() {
  const [selectedTab, setSelectedTab] = useState("All");

  const displayedMeals =
    selectedTab === "All" ? allMeals : mealsData[selectedTab] || [];

  return (
    <section className="bg-gray-900 min-h-screen text-white py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-green-500 mb-8 tracking-wider">
        Meal Plans 
      </h1>

      {/* Simple Custom Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
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
              <p className="text-sm text-gray-200 mb-3">
                {meal.benefit}
              </p>
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
              <div className="flex justify-between text-white">
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}