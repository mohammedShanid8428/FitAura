import React from "react";

const meals = [
  {
    type: "Breakfast",
    difficulty: "Easy",
    title: "Avocado Toast with Poached Egg",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    kcal: 320,
    carbs: "33g",
    protein: "14g",
    fats: "10g",
  },
  {
    type: "Lunch",
    difficulty: "Medium",
    title: "Grilled Shrimp Tacos with Mango Salsa",
    image:
      "https://images.pexels.com/photos/1397513/pexels-photo-1397513.jpeg",
    kcal: 480,
    carbs: "45g",
    protein: "21g",
    fats: "16g",
  },
  {
    type: "Dinner",
    difficulty: "Medium",
    title: "Baked Chicken Breast with Quinoa and Kale",
    image:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    kcal: 460,
    carbs: "38g",
    protein: "40g",
    fats: "9g",
  },
];

export default function NutritionDash() {
  return (
    <section className="p-4 flex justify-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm w-full max-w-4xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Nutrition (Today)
        </h2>

        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-gray-50 rounded-xl px-3 py-4"
            >
              {/* Image */}
              <img
                src={meal.image}
                alt={meal.title}
                className="w-20 h-16 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1">
                {/* Tags */}
                <div className="flex items-center gap-2 text-xs mb-0.5">
                  <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                    {meal.type}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                    {meal.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                  {meal.title}
                </h3>

                {/* Nutrients */}
                <div className="flex gap-3 text-xs text-gray-600 mt-0.5">
                  <span>🔥 {meal.kcal} kcal</span>
                  <span>🍞 {meal.carbs}</span>
                  <span>💪 {meal.protein}</span>
                  <span>🥑 {meal.fats}</span>
                </div>
              </div>

              {/* Add Button */}
              <button className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-green-600 transition">
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
