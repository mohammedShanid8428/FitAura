import React from "react";

const mealPlans = [
  {
    title: "Daily Meal Plan",
    description:
      "Stay consistent with meals added each day to support your routine.",
    image: "https://img.icons8.com/emoji/48/apple-emoji.png",
    button: "➕ Add to Daily Plan",
  },
  {
    title: "Weekly Plan",
    description:
      "Pre-plan 7 days of nutritious meals to stay ahead and balanced.",
    image: "https://img.icons8.com/emoji/48/banana-emoji.png",
    button: "➕ Add to Weekly Plan",
  },
  {
    title: "Custom Goal Plan",
    description:
      "Target weight loss, muscle gain, or energy with a tailored plan.",
    image: "https://img.icons8.com/emoji/48/avocado-emoji.png",
    button: "➕ Add to Goal Plan",
  },
];

export default function MealPlansSection() {
  return (
    <section className="py-10 px-6 max-w-6xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 tracking-wider">
          We offer <span className="text-orange-500">Meal Plans</span> for every goal
        </h2>
        <p className="text-gray-200 mt-2 text-md">
          Build healthy habits with personalized plans — and add meals to your journey.
        </p>
        <div className="w-24 h-1 bg-green-300 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {mealPlans.map((item, index) => (
          <div
            key={index}
            className="bg-gray-600 p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="mx-auto w-10 h-10 mb-3"
            />
            <h3 className="text-lg font-semibold text-green-600">{item.title}</h3>
            <p className="text-sm text-gray-200 mt-1 mb-4">{item.description}</p>
            <button className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-full transition">
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
