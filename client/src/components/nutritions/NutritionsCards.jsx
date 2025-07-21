// FitAura Nutrition Page - React + Tailwind CSS UI

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Taps";
import { Card, CardContent } from "../ui/Card";
import { Plus, Bookmark, Eye } from "lucide-react";

const mealsData = [
  // S A D
  {
    title: "Dark Chocolate & Almonds",
    imageUrl: "https://images.unsplash.com/photo-1603052875814-3d4b3eb2c194",
    moodTags: ["Sad"],
    category: "Mood Booster",
    tags: ["#Serotonin", "#Magnesium", "#MoodLift"],
    benefit: "Helps boost serotonin levels and reduce sadness.",
  },
  {
    title: "Pumpkin Soup",
    imageUrl: "https://images.unsplash.com/photo-1588167056540-f6f037c0770b",
    moodTags: ["Sad"],
    category: "Comfort Food",
    tags: ["#VitaminA", "#Warm", "#Soothing"],
    benefit: "Warm, creamy comfort that lifts low mood.",
  },
  {
    title: "Whole Wheat Toast + Peanut Butter",
    imageUrl: "https://images.unsplash.com/photo-1585238342029-4a5f0926c8c4",
    moodTags: ["Sad"],
    category: "Feel-Good Carbs",
    tags: ["#ComplexCarbs", "#Protein", "#EasyMeal"],
    benefit: "Boosts tryptophan levels which aid happiness.",
  },
  {
    title: "Strawberry Oatmeal",
    imageUrl: "https://images.unsplash.com/photo-1576752279841-2e9b8ecf56a5",
    moodTags: ["Sad"],
    category: "Breakfast Pick-Me-Up",
    tags: ["#Fiber", "#Antioxidants", "#HeartHealthy"],
    benefit: "Fights oxidative stress and improves mood.",
  },
  {
    title: "Herbal Chamomile Tea",
    imageUrl: "https://images.unsplash.com/photo-1613145991414-6cd99a2b0f59",
    moodTags: ["Sad"],
    category: "Relax & Reflect",
    tags: ["#SleepAid", "#AntiAnxiety", "#Calm"],
    benefit: "Natural relaxant that reduces anxiety & sadness.",
  },
  {
    title: "Banana & Walnut Muffins",
    imageUrl: "https://images.unsplash.com/photo-1627040425926-203244a3a6f7",
    moodTags: ["Sad"],
    category: "Mood-Boost Snack",
    tags: ["#B6", "#Zinc", "#SerotoninSupport"],
    benefit: "Bananas promote serotonin; walnuts help brain health.",
  },

  // H A P P Y
  {
    title: "Rainbow Veggie Wrap",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-736c2f7a8395",
    moodTags: ["Happy"],
    category: "Fresh Meals",
    tags: ["#Vibrant", "#Crunchy", "#FiberRich"],
    benefit: "Colorful veggies support brain and gut health.",
  },
  {
    title: "Chia Pudding with Fruits",
    imageUrl: "https://images.unsplash.com/photo-1572449043416-55f4685c8c34",
    moodTags: ["Happy"],
    category: "Mood Maintainer",
    tags: ["#Omega3", "#Fiber", "#SweetButHealthy"],
    benefit: "Supports long-term emotional stability.",
  },
  {
    title: "Avocado Toast with Egg",
    imageUrl: "https://images.unsplash.com/photo-1604908812500-3c716b56b9b4",
    moodTags: ["Happy"],
    category: "Energizing Breakfast",
    tags: ["#HealthyFats", "#Choline", "#Energizing"],
    benefit: "Keeps your happiness fueled all morning.",
  },
  {
    title: "Berry Yogurt Bowl",
    imageUrl: "https://images.unsplash.com/photo-1572441710521-50c79f6be7b4",
    moodTags: ["Happy"],
    category: "Happy Gut",
    tags: ["#Probiotic", "#Antioxidants", "#Glowing"],
    benefit: "Good gut = good mood! Probiotics for the win.",
  },
  {
    title: "Watermelon Mint Salad",
    imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
    moodTags: ["Happy"],
    category: "Cool & Fresh",
    tags: ["#Hydration", "#Cooling", "#Mood"],
    benefit: "Hydration + freshness = natural joy booster.",
  },
  {
    title: "Dark Chocolate Granola",
    imageUrl: "https://images.unsplash.com/photo-1583912268183-3b8820e4f400",
    moodTags: ["Happy"],
    category: "Mood Treat",
    tags: ["#Sweet", "#BrainFuel", "#Crunchy"],
    benefit: "Chocolate triggers dopamine for positive mood.",
  },

  // A N X I O U S
  {
    title: "Green Smoothie (Spinach + Apple)",
    imageUrl: "https://images.unsplash.com/photo-1615485299451-bb1a1355cc8f",
    moodTags: ["Anxious"],
    category: "Anti-Anxiety",
    tags: ["#Magnesium", "#Iron", "#Fiber"],
    benefit: "Greens calm the nervous system naturally.",
  },
  {
    title: "Oats & Chia Bowl",
    imageUrl: "https://images.unsplash.com/photo-1610448942640-b04e34b0c31e",
    moodTags: ["Anxious"],
    category: "Morning Calm",
    tags: ["#ComplexCarbs", "#SlowEnergy", "#AntiStress"],
    benefit: "Slow release carbs keep mood steady.",
  },
  {
    title: "Turmeric Golden Milk",
    imageUrl: "https://images.unsplash.com/photo-1605451322756-65314e3cc808",
    moodTags: ["Anxious"],
    category: "Warm & Healing",
    tags: ["#AntiInflammatory", "#Soothing", "#SleepSupport"],
    benefit: "Reduces inflammation and calms anxiety.",
  },
  {
    title: "Baked Sweet Potato Wedges",
    imageUrl: "https://images.unsplash.com/photo-1605522289511-d81a1110f31c",
    moodTags: ["Anxious"],
    category: "Rooted Comfort",
    tags: ["#B6", "#ComplexCarbs", "#ComfortFood"],
    benefit: "Grounding and full of calming vitamins.",
  },
  {
    title: "Blueberry Almond Smoothie",
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    moodTags: ["Anxious"],
    category: "Brain Calm",
    tags: ["#Antioxidants", "#B12", "#MoodBoost"],
    benefit: "Fights oxidative stress and soothes nerves.",
  },
  {
    title: "Green Tea & Toast",
    imageUrl: "https://images.unsplash.com/photo-1613145991414-6cd99a2b0f59",
    moodTags: ["Anxious"],
    category: "Zen Snack",
    tags: ["#LTheanine", "#Focus", "#Balance"],
    benefit: "L-Theanine supports focused calm.",
  },

  // T I R E D
  {
    title: "Hard-Boiled Eggs + Wholegrain Toast",
    imageUrl: "https://images.unsplash.com/photo-1573821663919-2a85c7c23e51",
    moodTags: ["Tired"],
    category: "Quick Energy",
    tags: ["#Protein", "#Choline", "#SustainedEnergy"],
    benefit: "Simple and energy-reviving breakfast.",
  },
  {
    title: "Almond & Date Protein Bites",
    imageUrl: "https://images.unsplash.com/photo-1611771342267-fb9f71268ed2",
    moodTags: ["Tired"],
    category: "Snack Recharge",
    tags: ["#Iron", "#Energy", "#Portable"],
    benefit: "Natural sugars and protein give quick energy.",
  },
  {
    title: "Matcha Latte",
    imageUrl: "https://images.unsplash.com/photo-1603052875814-3d4b3eb2c194",
    moodTags: ["Tired"],
    category: "Energy Drink",
    tags: ["#Caffeine", "#LTheanine", "#CleanBoost"],
    benefit: "Gentle caffeine to fight fatigue without crash.",
  },
  {
    title: "Sweet Potato & Black Beans",
    imageUrl: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    moodTags: ["Tired"],
    category: "Meal Power",
    tags: ["#Iron", "#B12", "#ComplexCarbs"],
    benefit: "Iron-rich to fight low energy & mental fatigue.",
  },
  {
    title: "Greek Yogurt & Honey",
    imageUrl: "https://images.unsplash.com/photo-1615200471654-63de9b36f708",
    moodTags: ["Tired"],
    category: "Recovery Snack",
    tags: ["#Protein", "#Probiotic", "#DigestiveSupport"],
    benefit: "Energizes gut and restores strength.",
  },
  {
    title: "Apple with Peanut Butter",
    imageUrl: "https://images.unsplash.com/photo-1584275141198-b8b670845f30",
    moodTags: ["Tired"],
    category: "Simple Snack",
    tags: ["#Glucose", "#Protein", "#BalancedFuel"],
    benefit: "Great for brain energy and stamina.",
  },

  // R O U T I N E F I T N E S S
  {
    title: "Grilled Chicken & Brown Rice",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb35",
    moodTags: ["RoutineFitness"],
    category: "Fitness Fuel",
    tags: ["#LeanProtein", "#Muscle", "#Recovery"],
    benefit: "Perfect for pre- or post-workout meals.",
  },
  {
    title: "Tofu Stir Fry",
    imageUrl: "https://images.unsplash.com/photo-1598887142487-17fba159d245",
    moodTags: ["RoutineFitness"],
    category: "Plant Protein",
    tags: ["#Soy", "#VegGains", "#BalancedMeal"],
    benefit: "Helps support plant-based fitness goals.",
  },
  {
    title: "Egg White Omelette",
    imageUrl: "https://images.unsplash.com/photo-1605472151809-f8035e602d3e",
    moodTags: ["RoutineFitness"],
    category: "Muscle Breakfast",
    tags: ["#Protein", "#LowFat", "#FitnessStart"],
    benefit: "Light, clean protein source for lean gains.",
  },
  {
    title: "Protein Pancakes",
    imageUrl: "https://images.unsplash.com/photo-1585238342029-4a5f0926c8c4",
    moodTags: ["RoutineFitness"],
    category: "Post-Workout",
    tags: ["#Whey", "#Refuel", "#Recovery"],
    benefit: "Great for muscle recovery after workout.",
  },
  {
    title: "Quinoa Veg Bowl",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    moodTags: ["RoutineFitness"],
    category: "Nutrient Power",
    tags: ["#CompleteProtein", "#Micronutrients", "#Strength"],
    benefit: "Balanced bowl for clean gains.",
  },
  {
    title: "Cottage Cheese & Pineapple",
    imageUrl: "https://images.unsplash.com/photo-1606851091941-6d784bb9298f",
    moodTags: ["RoutineFitness"],
    category: "Evening Snack",
    tags: ["#Casein", "#RecoverySleep", "#HighProtein"],
    benefit: "Slow digesting protein for overnight repair.",
  },

  // W E I G H T L O S S
  {
    title: "Zucchini Noodles with Pesto",
    imageUrl: "https://images.unsplash.com/photo-1604908554168-f20d51c0cde1",
    moodTags: ["WeightLoss"],
    category: "Low-Carb Meal",
    tags: ["#Keto", "#LowCal", "#Fresh"],
    benefit: "Filling, low-calorie and full of flavor.",
  },
  {
    title: "Grilled Veggie Skewers",
    imageUrl: "https://images.unsplash.com/photo-1592928303344-28cb57ab1397",
    moodTags: ["WeightLoss"],
    category: "Healthy Grill",
    tags: ["#Fiber", "#LowFat", "#PlantBased"],
    benefit: "Low calorie and nutrient-dense.",
  },
  {
    title: "Cucumber Detox Water",
    imageUrl: "https://images.unsplash.com/photo-1615485299451-bb1a1355cc8f",
    moodTags: ["WeightLoss"],
    category: "Hydration Aid",
    tags: ["#FlushToxins", "#Fresh", "#ZeroCal"],
    benefit: "Hydration without calories; helps metabolism.",
  },
  {
    title: "Boiled Eggs + Veggies",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    moodTags: ["WeightLoss"],
    category: "Quick Fix",
    tags: ["#Protein", "#NoJunk", "#QuickPrep"],
    benefit: "High protein and quick for portion control.",
  },
  {
    title: "Lemon Chickpea Salad",
    imageUrl: "https://images.unsplash.com/photo-1622443705495-b92ad1edfa57",
    moodTags: ["WeightLoss"],
    category: "Fiber-Rich Meal",
    tags: ["#PlantProtein", "#Digestive", "#Satiety"],
    benefit: "Keeps you full longer while burning fat.",
  },
  {
    title: "Green Apple + Almonds",
    imageUrl: "https://images.unsplash.com/photo-1603112579537-1ac1b5aaefb5",
    moodTags: ["WeightLoss"],
    category: "Snack Time",
    tags: ["#LowCal", "#Crunchy", "#AntiSugar"],
    benefit: "Controls hunger and blood sugar naturally.",
  },

  // W E I G H T G A I N
  {
    title: "Ghee Rice + Lentils",
    imageUrl: "https://images.unsplash.com/photo-1625937569908-95bc6c54377e",
    moodTags: ["WeightGain"],
    category: "Calorie Dense",
    tags: ["#Balanced", "#Comfort", "#HighCarb"],
    benefit: "Great traditional high-calorie meal.",
  },
  {
    title: "Paneer Bhurji with Roti",
    imageUrl: "https://images.unsplash.com/photo-1632999062382-9a8eb8123285",
    moodTags: ["WeightGain"],
    category: "Protein & Fats",
    tags: ["#Calcium", "#Fat", "#MuscleMass"],
    benefit: "Supports weight and muscle building.",
  },
  {
    title: "Avocado Smoothie with Dates",
    imageUrl: "https://images.unsplash.com/photo-1584270354949-1fe217d6f9e9",
    moodTags: ["WeightGain"],
    category: "High Fat Drink",
    tags: ["#HealthyFats", "#Potassium", "#Energy"],
    benefit: "Nutrient-dense calories in a glass.",
  },
  {
    title: "Boiled Potatoes & Butter",
    imageUrl: "https://images.unsplash.com/photo-1599785209792-3b714bdf2f77",
    moodTags: ["WeightGain"],
    category: "Traditional Bulk",
    tags: ["#HighCal", "#Energy", "#Simple"],
    benefit: "Cheap and effective calorie source.",
  },
  {
    title: "Nuts Mix & Banana",
    imageUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443",
    moodTags: ["WeightGain"],
    category: "Quick Bulk",
    tags: ["#Snack", "#HealthyFats", "#BulkUp"],
    benefit: "Perfect for mini-meals on the go.",
  },
  {
    title: "Full Fat Milk + Dates",
    imageUrl: "https://images.unsplash.com/photo-1600566753151-78c5b50f0f58",
    moodTags: ["WeightGain"],
    category: "Weight Drink",
    tags: ["#Calories", "#Iron", "#Recovery"],
    benefit: "Easy to digest, calorie-rich post-meal drink., Easy to digest, calorie-rich post-meal drink., Easy to digest, calorie-rich post-meal drink.",
    
  }
];


const moods = ["All", "Happy", "Sad", "Anxious", "Angry", "Tired"];

export default function NutritionsCards() {
  const { mood } = useParams();
  const [selectedMood, setSelectedMood] = useState("All");

  useEffect(() => {
    if (mood) {
      setSelectedMood(mood.charAt(0).toUpperCase() + mood.slice(1));
    } else {
      setSelectedMood("All");
    }
  }, [mood]);

  const filteredMeals =
    selectedMood === "All"
      ? mealsData
      : mealsData.filter((meal) => meal.moodTags.includes(selectedMood));

  return (
    <section className="bg-gray-800">
      <div className="p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-600">Nutrition Guide</h1>

      <Tabs defaultValue="All" className="w-full mb-6">
        <TabsList className="flex flex-wrap gap-4 justify-center">
          {moods.map((mood) => (
            <TabsTrigger
              key={mood}
              value={mood}
              onClick={() => setSelectedMood(mood)}
              className="capitalize text-orange-600 bg-gray-700 px-6 py-3 "
            >
              {mood}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredMeals || []).map((meal, idx) => (
          <Card key={idx} className="overflow-hidden shadow-md hover:shadow-lg transition">
            <img src={meal.imageUrl} alt={meal.title} className="h-48 w-full object-cover" />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-1">{meal.title}</h3>
              <p className="text-sm text-white 0 mb-2">{meal.benefit}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {meal.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
}
