import React from "react";
import { images } from "../../assets/images";

const nutritionPlans = [
  {
    id: 1,
    discount: "Flat 20% Discount",
    title: "Purely Fresh Vegetables",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: images.modal13, // Replace with your actual image
    bgColor: "bg-green-50",
  },
  {
    id: 2,
    discount: "Flat 25% Discount",
    title: "Fresh Fruits, Pure Quality",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: , 
    bgColor: "bg-orange-200",
  },
];

export default function NutritionsExplore() {
  return (
    <section className="py-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="uppercase text-sm text-gray-400 mb-1">Nutrition Plans</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-green-600">
            Fresh Food for Healthy Life <br/> Nutrition Plans
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
          {nutritionPlans.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-4 p-5 rounded-lg shadow-md py-10 ${item.bgColor}`}
            >
              <div>
                <p className="text-md text-orange-700 font-semibold mb-1">
                  {item.discount}
                </p>
                <h4 className="font-bold text-lg mb-2 text-black">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition">
                  Shop Now →
                </button>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
