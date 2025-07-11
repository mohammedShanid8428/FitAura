import React from "react";
import { Bookmark, Plus, Eye } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

// Sample data (you can replace or import from external file)
const mealsData = [
  {
    title: "Oatmeal with Berries",
    imageUrl: "https://images.unsplash.com/photo-1603048293482-34e0b74fd01b",
    tags: ["#Focus", "#Mood-Boost", "#Light"],
    benefit: "Rich in antioxidants & supports serotonin levels",
  },
  {
    title: "Grilled Chicken & Quinoa",
    imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2",
    tags: ["#HighProtein", "#Muscle", "#Energy"],
    benefit: "Perfect for fitness routines and post-workout meals.",
  },
  {
    title: "Banana Peanut Smoothie",
    imageUrl: "https://images.unsplash.com/photo-1572441710521-50c79f6be7b4",
    tags: ["#WeightGain", "#Energy", "#Potassium"],
    benefit: "Helps build energy and muscle mass naturally.",
  },
  {
    title: "Avocado Toast",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    tags: ["#Mood", "#HealthyFat", "#BrainFood"],
    benefit: "Boosts brain power and stabilizes mood.",
  },
  {
    title: "Lentil Soup",
    imageUrl: "https://images.unsplash.com/photo-1589308078054-832c35b76c89",
    tags: ["#Sad", "#PlantProtein", "#WarmComfort"],
    benefit: "Great for calming and emotional balance.",
  },
  {
    title: "Greek Yogurt & Berries",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31b",
    tags: ["#WeightLoss", "#Probiotic", "#LowCal"],
    benefit: "Supports gut health and aids weight management.",
  },
];

export default function Grids() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meal Suggestions</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealsData.map((meal, idx) => (
          <Card
            key={idx}
            className="overflow-hidden rounded-xl shadow hover:shadow-lg transition duration-200"
          >
            <img
              src={meal.imageUrl}
              alt={meal.title}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-1">{meal.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{meal.benefit}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {meal.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-1" /> Save
                </Button>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
