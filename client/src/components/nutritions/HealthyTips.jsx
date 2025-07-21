import React from "react";
import { serviceImg } from "../../assets/images";

const healthyPoints = [
  "Improved physical health",
  "Better mental health",
  "Increased longevity",
  "Weight management",
  "Improved self-confidence",
  "Reduced stress",
];

export default function HealthyTips() {
  return (
   <section className="max-w-6xl mx-auto px-6 py-16  mt-10 text-green-400  ">
        <div className="flex flex-col md:flex-row items-start gap-8 mx-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 tracking-wider">
              Why healthy
            </h2>
          <ul className="space-y-5 mt-6 text-white text-lg">
            {healthyPoints.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-orange-500 text-xl">✔</span>
                {item}
              </li>
            ))}
          </ul>
          </div>


          <div className="flex-1 grid grid-cols-2 gap-4">
            <img
              src={serviceImg.service1}
              alt="Healthy Cooking"
              className="rounded-md object-cover w-full h-40"
            />
            <img
              src={serviceImg.service2}
              alt="Meditation"
              className="rounded-md object-cover w-full h-40"
            />
            <img
              src={serviceImg.service3}
              alt="Weights and veggies"
              className="col-span-2 rounded-md object-cover w-full h-40"
            />
          </div>

        </div>
      </section>
  );
}
