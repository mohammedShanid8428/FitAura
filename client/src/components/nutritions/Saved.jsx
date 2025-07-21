import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Trash, CalendarDays } from "lucide-react";

const initialSavedMeals = [
  {
    title: "Oatmeal with Berries",
    imageUrl: "https://images.unsplash.com/photo-1603048293482-34e0b74fd01b",
    day: "Monday",
    tags: ["#Focus", "#Mood-Boost"],
  },
  {
    title: "Grilled Chicken Bowl",
    imageUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb35",
    day: "Wednesday",
    tags: ["#Fitness", "#Protein"],
  },
  {
    title: "Greek Yogurt & Honey",
    imageUrl: "https://images.unsplash.com/photo-1615200471654-63de9b36f708",
    day: "Friday",
    tags: ["#Digestive", "#LowCal"],
  },
];

const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export default function Saved() {
  const [savedMeals, setSavedMeals] = useState(initialSavedMeals);

  const updateMealDay = (idx, newDay) => {
    const updated = [...savedMeals];
    updated[idx].day = newDay;
    setSavedMeals(updated);
  };

  const removeMeal = (idx) => {
    setSavedMeals(savedMeals.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🥗 My Saved Nutrition Plan
      </h2>

      {savedMeals.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any meals yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedMeals.map((meal, idx) => (
            <Card
              key={idx}
              className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img
                src={meal.imageUrl}
                alt={meal.title}
                className="h-44 w-full object-cover"
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{meal.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMeal(idx)}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                </div>

                <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-500" />
                  Assigned to:{" "}
                  <select
                    value={meal.day}
                    onChange={(e) => updateMealDay(idx, e.target.value)}
                    className="ml-2 border rounded px-2 py-1 text-sm"
                  >
                    {weekDays.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {meal.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
