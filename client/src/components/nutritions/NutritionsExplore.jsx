import React from "react";
import { serviceImg } from "../../assets/images";

const nutritionPlans = [
  {
    id: 1,
    discount: "Flat 20% Discount",
    title: "Purely Fresh Vegetables",
    desc: "Enjoy farm-fresh vegetables delivered straight to your door for a healthier lifestyle.",
    image: serviceImg.service7,
    bgColor: "bg-green-50",
    link: "https://www.swiggy.com/instamart/search?custom_back=true&query=Vegetables",   // Example Link
  },
  {
    id: 2,
    discount: "Flat 25% Discount",
    title: "Fresh Fruits, Pure Quality",
    desc: "Get the freshest seasonal fruits, packed with nutrients and unbeatable taste.",
    image: serviceImg.service9,
    bgColor: "bg-orange-200",
    link: "https://www.swiggy.com/instamart/search?custom_back=true&query=Fruits",   // Example Link
  },
];

export default function NutritionsExplore() {
  return (
    <section className="py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <p className="uppercase text-sm text-gray-200 mb-1">Nutrition Plans</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-green-600 tracking-wider">
            Fresh Food for <span className="text-orange-600">Healthy Life</span><br />
            Nutrition Plans
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

                {/* Shop Now as a Link */}
                <a
                  href={item.link}
                  className="inline-block bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition"
                >
                  Shop Now →
                </a>
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
