import React from "react";

const meals = [
  {
    type: "Breakfast",
    difficulty: "Easy",
    title: "Avocado Toast with Poached Egg",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    kcal: 320,
    carbs: "33g",
    protein: "14g",
    fats: "10g",
  },
  {
    type: "Lunch",
    difficulty: "Medium",
    title: "Grilled Shrimp Tacos with Mango Salsa",
    image: "https://images.pexels.com/photos/1397513/pexels-photo-1397513.jpeg",
    kcal: 480,
    carbs: "45g",
    protein: "21g",
    fats: "16g",
  },
  {
    type: "Dinner",
    difficulty: "Medium",
    title: "Baked Chicken Breast with Quinoa and Kale",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    kcal: 460,
    carbs: "38g",
    protein: "40g",
    fats: "9g",
  },
];

export default function NutritionDash() {
  return (
    <section className="p-4 flex justify-center">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-6 w-full max-w-4xl shadow-xl text-white">
        <h2 className="text-xl font-bold text-lime-400 mb-5 tracking-tight">
          🍽️ Nutrition Overview (Today)
        </h2>

        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-4 transition duration-300"
            >
              {/* Meal Image */}
              <img
                src={meal.image}
                alt={meal.title}
                className="w-20 h-16 rounded-lg object-cover border border-gray-600"
              />

              {/* Meal Info */}
              <div className="flex-1">
                <div className="flex gap-2 text-xs mb-1">
                  <span className="bg-lime-500/20 text-lime-400 font-medium px-2 py-0.5 rounded-full">
                    {meal.type}
                  </span>
                  <span className="bg-gray-700 text-gray-300 font-medium px-2 py-0.5 rounded-full">
                    {meal.difficulty}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white">
                  {meal.title}
                </h3>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
                  <span>🔥 {meal.kcal} kcal</span>
                  <span>🍞 {meal.carbs}</span>
                  <span>💪 {meal.protein}</span>
                  <span>🥑 {meal.fats}</span>
                </div>
              </div>

              {/* Add Button */}
              <button className="bg-lime-500 hover:bg-lime-600 text-black text-xs px-4 py-2 rounded-md font-medium transition shadow-md">
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
