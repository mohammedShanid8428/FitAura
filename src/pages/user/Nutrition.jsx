import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { images, serviceImg } from "../../assets/images";
import Header from "../../components/Header";
import Cards from "../../components/nutritions/Cards"
import Grids from "../../components/nutritions/Grids"
import Saved from "../../components/nutritions/Saved";
import Service from "../../components/nutritions/Service";
import Explore from "../../components/nutritions/Explore"
import NutritionPlans from "../../components/nutritions/Explore";
import NutritionHero from "../../components/nutritions/NutritionHero";


export default function NutritionCarousel() {
  return (
    <>
      <Header />
      
      <section>
        <NutritionHero/>
      <section className="max-w-6xl mx-auto p-6 border rounded-3xl mt-10 text-green-400 border-green-400 bg-[#0f0f0f]">
        <div className="flex flex-col md:flex-row items-start gap-8 mx-10">


          <div className="flex-1 relative">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-300 absolute -z-10 text-6xl font-extrabold opacity-10">
                LIFESTYLE
              </span>
              <span className="relative z-10 text-green-400">Why healthy</span>
            </h2>
            <ul className="space-y-4 mt-4 text-white text-base">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 text-xl">✔</span> Improved physical health
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 text-xl">✔</span> Better mental health
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 text-xl">✔</span> Increased longevity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 text-xl">✔</span> Weight management
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 text-xl">✔</span> Improved self-confidence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 text-xl">✔</span> Reduced stress
              </li>
            </ul>
          </div>


          <div className="flex-1 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
              alt="Healthy Cooking"
              className="rounded-md object-cover w-full h-40"
            />
            <img
              src={images.modal12}
              alt="Meditation"
              className="rounded-md object-cover w-full h-40"
            />
            <img
              src={images.modal7}
              alt="Weights and veggies"
              className="col-span-2 rounded-md object-cover w-full h-40"
            />
          </div>

        </div>
      </section>




      <section class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl md:text-4xl text-green-600 font-bold text-center mb-12 tracking-wider">
          Have a <span class="text-orange-600">HealthyBite</span> for
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* <!-- Card 1 --> */}
          <div class="flex items-start gap-5">
            <img
              src="https://img.freepik.com/free-photo/salad-with-fresh-vegetables-wooden-bowl_1220-5186.jpg?w=740"
              alt="Find a diet you love"
              class="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 class="text-xl font-semibold mb-2 text-green-400">Find a diet you love</h3>
              <p class="text-gray-200 text-sm">
                Find a nutritious Diet that fits your lifestyle and food preferences. Take charge of your daily habits with one of the many ongoing Diets including Clean Eating and High Protein.
              </p>
            </div>
          </div>

          {/* <!-- Card 2 --> */}
          <div class="flex items-start gap-5">
            <img
              src="https://img.freepik.com/free-photo/colorful-fruit-salad-with-fresh-fruits_144627-49055.jpg?w=740"
              alt="Start a simplified meal plan"
              class="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 class="text-xl font-semibold mb-2 text-green-400">Start a simplified meal plan</h3>
              <p class="text-gray-200 text-sm">
                Follow a 7-21 day Meal Plan and get four pre-planned recipes a day. Depending on your health goals, there are many Meal Plans to choose from including Keto Burn and Vegan for a week.
              </p>
            </div>
          </div>

          {/* <!-- Card 3 --> */}
          <div class="flex items-start gap-5">
            <img
              src="https://img.freepik.com/free-photo/fresh-juices-smoothies-from-assorted-fruits-vegetables_93675-133082.jpg?w=740"
              alt="Track your way to success"
              class="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 class="text-xl font-semibold mb-2 text-green-400">Track your way to success</h3>
              <p class="text-gray-200 text-sm">
                Track your activities and what you eat with the help of our food-, exercise- and water trackers to maintain a balanced everyday life.
              </p>
            </div>
          </div>

          {/* <!-- Card 4 --> */}
          <div class="flex items-start gap-5">
            <img
              src="https://img.freepik.com/free-photo/healthy-lifestyle-diet-fitness_144627-36737.jpg?w=740"
              alt="Start your own healthy journey"
              class="w-20 h-20 object-cover rounded-full"
            />
            <div>
              <h3 class="text-xl font-semibold mb-2 text-green-400">Start your own healthy journey</h3>
              <p class="text-gray-200 text-sm">
                To help you reach your goals and customize your health journey you can add your favorite meals, food items, recipes and exercises to your Favorites.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-10 px-6  max-w-6xl mx-auto mt-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-green-600 tracking-wider">
            We offer <span class="text-orange-500">Meal Plans</span> for every goal
          </h2>
          <p class="text-gray-200 mt-2 text-md ">Build healthy habits with personalized plans — and add meals to your journey.</p>
          <div class="w-24 h-1 bg-green-300 mx-auto mt-3 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div class="bg-gray-800  p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/apple-emoji.png" alt="Daily Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-green-600">Daily Meal Plan</h3>
            <p class="text-sm text-gray-200 mt-1 mb-4">Stay consistent with meals added each day to support your routine.</p>
            <button class="text-sm font-medium text-white bg-orange-600 hover:bg-orange-600 px-4 py-1 rounded-full transition">
              ➕ Add to Daily Plan
            </button>
          </div>

          {/* <!-- Weekly Plan --> */}
          <div class="bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/banana-emoji.png" alt="Weekly Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-green-600">Weekly Plan</h3>
            <p class="text-sm text-gray-200 mt-1 mb-4">Pre-plan 7 days of nutritious meals to stay ahead and balanced.</p>
            <button class="text-sm font-medium text-white bg-orange-600 hover:bg-orange-800 px-4 py-1 rounded-full transition">
              ➕ Add to Weekly Plan
            </button>
          </div>

          {/* <!-- Custom Plan --> */}
          <div class="bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/avocado-emoji.png" alt="Custom Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-green-600">Custom Goal Plan</h3>
            <p class="text-sm text-gray-200 mt-1 mb-4">Target weight loss, muscle gain, or energy with a tailored plan.</p>
            <button class="text-sm font-medium text-white bg-orange-600 hover:bg-orange-600 px-4 py-1 rounded-full transition">
              ➕ Add to Goal Plan
            </button>
          </div>
        </div>
      </section>

      <Explore />
      <Service />
      <section className="px-6 py-14 rounded-2xl max-w-6xl mx-auto mb-20 bg-gradient-to-r from-[#0f0f0f] to-[#1c1c1c] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-300 to-green-500">
              🗂️ Track Your Saved Meal Plans
            </h2>

            <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              Easily review and organize your favorite meals. Assign them to days of the week, remove what no longer fits your goals, and build consistent nutrition habits — all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/saved-meals")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-orange-500/50 transition transform hover:scale-105"
              >
                📅 View Saved Plans
              </button>
              <button
                onClick={() => navigate("/nutrition")}
                className="border border-orange-500 text-orange-500 font-semibold px-6 py-2 rounded-full hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
              >
                ➕ Add More Meals
              </button>
            </div>
          </div>

          {/* Visual Section */}
          <div className="w-80 h-60 relative group transition">
            <img
              src="https://img.freepik.com/free-vector/meal-planner-template-daily-weekly-nutrition_23-2148709654.jpg?w=826"
              alt="Saved Meal Plans"
              className="w-full h-full rounded-xl shadow-lg object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"></div>
          </div>
        </div>
      </section>


    </section >



    </>

  );
}
