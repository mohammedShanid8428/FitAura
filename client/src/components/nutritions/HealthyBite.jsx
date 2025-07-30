import React from "react";
import { serviceImg } from "../../assets/images";

const healthyTips = [
  {
    title: "Find a diet you love",
    description:
      "Find a nutritious diet that fits your lifestyle and food preferences. Take charge of your daily habits with options like Clean Eating and High Protein.",
    image:serviceImg.service2,
  },
  {
    title: "Start a simplified meal plan",
    description:
      "Follow a 7-21 day meal plan with four pre-planned recipes daily. Choose from plans like Keto Burn and Vegan for a week, based on your goals.",
    image:serviceImg.service3,
  },
  {
    title: "Track your way to success",
    description:
      "Track your meals, water intake, and activities using our built-in food, exercise, and hydration trackers to stay balanced every day.",
    image:serviceImg.service7,
  },
  {
    title: "Start your own healthy journey",
    description:
      "Customize your health path by adding your favorite meals, recipes, and exercises to your personal favorites list.",
    image:serviceImg.service8,
  },
];

export default function HealthyBiteS() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl text-green-600 font-bold text-center mb-12 tracking-wider">
        Have a <span className="text-orange-600">HealthyBite</span> for
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {healthyTips.map((item, index) => (
          <div key={index} className="flex items-start gap-5">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 className="text-xl tracking-wide font-semibold mb-2 text-green-400">
                {item.title}
              </h3>
              <p className="text-gray-200 text-sm text-justify">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
