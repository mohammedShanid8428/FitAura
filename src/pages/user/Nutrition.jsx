import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { images, serviceImg } from "../../assets/images";
import Header from "../../components/Header";
import Cards from "../../components/nutritions/Cards"
import Grids from "../../components/nutritions/Grids"
import Saved from "../../components/nutritions/Saved";
import Service from "../../components/nutritions/Service";

const slides = [
  {
    id: 1,
    image: images.modal5,
    title: "HEALTH & NUTRITION INFORMATION.",
    subtitle: "BALANCED NUTRITION DIET",
    label: "NUTREE",
    description:
      "Nunc accumsan dui vel lobortis pulvinar. Duis convallis odio ut dignissim faucibus. Sed sit amet urna dictum.",
  },
  {
    id: 2,
    image: images.modal6,
    title: "BOOST YOUR ENERGY NATURALLY.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Fuel your body with real nutrients. Start your wellness journey today with clean eating tips.",
  },
];

export default function NutritionCarousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  //  useEffect(()=>{
  //   const interval=setInterval(()=>{
  //     setCurrent((prev)=>(prev===slides.length-1?0:prev+1));

  //   },5000);
  //   return()=>clearInterval(interval)
  //  },[])


  const { image, title, subtitle, label, description } = slides[current];


  return (
    <>
      <Header />
      <section className="relative w-full h-screen overflow-hidden">

        <img
          src={image}
          alt="Slide"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />


        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full px-6">
          <div className=" p-8  max-w-xl ">
            <div className="flex items-center mb-6">
              <span className="bg-lime-500 text-white text-xl font-semibold px-2 py-1 rounded mr-2">
                {label}
              </span>
              <span className="text-xl text-gray-800 font-medium tracking-wide">
                {subtitle}
              </span>
            </div>
            <h2 className="text-5xl font-bold py-3 text-gray-700 mb-4">{title}</h2>
            <p className="text-gray-800 pr-4 mb-8">{description}</p>
            <div className="flex gap-6 flex-wrap">
              <button className="bg-orange-500 text-gray-800 px-8 py-3 rounded shadow hover:bg-orange-600 text-md">
                MORE ABOUT
              </button>
              <button className="flex items-center border border-gray-300 px-6 py-2 rounded hover:bg-gray-200 text-sm">
                <Play className="w-4 h-4 mr-2" />
                PLAY SESSIONS
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow z-20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow z-20"
        >
          <ChevronRight />
        </button>
      </section>

      {/* <!-- Why Healthy Section --> */}
      <section class="max-w-6xl mx-auto p-6 border border-blue-500 rounded-md">
        <div class="flex flex-col md:flex-row items-start gap-6">

          {/* <!-- Left Column: Checklist --> */}
          <div class="flex-1">
            <h2 class="text-3xl font-bold mb-4">
              <span class="text-gray-300 absolute -z-10 text-6xl font-extrabold opacity-10">LIFESTYLE</span>
              <span class="relative z-10">Why healthy</span>
            </h2>
            <ul class="space-y-3 mt-4">
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Improved physical health
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Better mental health
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Increased longevity
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Weight management
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Improved self-confidence
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 text-xl">✔</span> Reduced stress
              </li>
            </ul>
          </div>

          {/* <!-- Right Column: Images Grid --> */}
          <div class="flex-1 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
              alt="Healthy Cooking"
              class="rounded-md object-cover w-full h-40"
            />
            <img
              src="https://images.unsplash.com/photo-1602785574400-93df2f3ea7a0"
              alt="Meditation"
              class="rounded-md object-cover w-full h-40"
            />
            <img
              src="https://images.unsplash.com/photo-1609942057027-3b0c06cf2476"
              alt="Weights and veggies"
              class="col-span-2 rounded-md object-cover w-full h-40"
            />
          </div>
        </div>
      </section>



      <section class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Have a <span class="text-red-600">HealthyBite</span> for
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
              <h3 class="text-xl font-semibold mb-2">Find a diet you love</h3>
              <p class="text-gray-600 text-sm">
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
              <h3 class="text-xl font-semibold mb-2">Start a simplified meal plan</h3>
              <p class="text-gray-600 text-sm">
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
              <h3 class="text-xl font-semibold mb-2">Track your way to success</h3>
              <p class="text-gray-600 text-sm">
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
              <h3 class="text-xl font-semibold mb-2">Start your own healthy journey</h3>
              <p class="text-gray-600 text-sm">
                To help you reach your goals and customize your health journey you can add your favorite meals, food items, recipes and exercises to your Favorites.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-green-50 py-10 px-6 rounded-xl shadow-lg max-w-6xl mx-auto mt-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">
            We offer <span class="text-green-600">Meal Plans</span> for every goal
          </h2>
          <p class="text-gray-500 mt-2 text-sm">Build healthy habits with personalized plans — and add meals to your journey.</p>
          <div class="w-24 h-1 bg-green-300 mx-auto mt-3 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* <!-- Daily Plan --> */}
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/apple-emoji.png" alt="Daily Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-gray-700">Daily Meal Plan</h3>
            <p class="text-sm text-gray-500 mt-1 mb-4">Stay consistent with meals added each day to support your routine.</p>
            <button class="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full transition">
              ➕ Add to Daily Plan
            </button>
          </div>

          {/* <!-- Weekly Plan --> */}
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/banana-emoji.png" alt="Weekly Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-gray-700">Weekly Plan</h3>
            <p class="text-sm text-gray-500 mt-1 mb-4">Pre-plan 7 days of nutritious meals to stay ahead and balanced.</p>
            <button class="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full transition">
              ➕ Add to Weekly Plan
            </button>
          </div>

          {/* <!-- Custom Plan --> */}
          <div class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <img src="https://img.icons8.com/emoji/48/avocado-emoji.png" alt="Custom Plan" class="mx-auto w-10 h-10 mb-3" />
            <h3 class="text-lg font-semibold text-gray-700">Custom Goal Plan</h3>
            <p class="text-sm text-gray-500 mt-1 mb-4">Target weight loss, muscle gain, or energy with a tailored plan.</p>
            <button class="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full transition">
              ➕ Add to Goal Plan
            </button>
          </div>
        </div>
      </section>

        <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 - Vegetables */}
          <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md">
            <div className="max-w-[55%]">
              <p className="text-sm text-yellow-600 font-semibold mb-1">Flat 20% Discount</p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Purely Fresh Vegetables</h3>
              <p className="text-sm text-gray-500 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">
                Shop Now →
              </button>
            </div>
            <img
              src="https://img.freepik.com/free-photo/shopping-basket-full-vegetables_123827-28255.jpg"
              alt="Vegetables"
              className="w-28 h-28 object-cover rounded-lg"
            />
          </div>

          {/* Card 2 - Fruits */}
          <div className="flex items-center justify-between bg-yellow-200 p-6 rounded-xl shadow-md">
            <div className="max-w-[55%]">
              <p className="text-sm text-yellow-700 font-semibold mb-1">Flat 25% Discount</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Fruits, Pure Quality</h3>
              <p className="text-sm text-gray-700 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="text-sm font-medium bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full">
                Shop Now →
              </button>
            </div>
            <img
              src="https://img.freepik.com/free-photo/colorful-fruits-white-background_144627-15946.jpg"
              alt="Fruits"
              className="w-28 h-28 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>

      <Service/>

      <section className="bg-emerald-50 px-6 py-12 rounded-xl max-w-6xl mx-auto shadow-md mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4">
              🗂️ Track Your Saved Meal Plans
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Easily review and organize your favorite meals. Assign them to days of the week, remove what no longer fits your goals, and build consistent nutrition habits — all in one place.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/saved-meals")} // or trigger modal
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full transition"
              >
                📅 View Saved Plans
              </button>
              <button
                onClick={() => navigate("/nutrition")}
                className="border border-emerald-600 text-emerald-600 px-5 py-2 rounded-full hover:bg-emerald-100 transition"
              >
                ➕ Add More Meals
              </button>
            </div>
          </div>

          {/* Visual Section */}
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/meal-planner-template-daily-weekly-nutrition_23-2148709654.jpg?w=826"
              alt="Saved Meal Plans"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>



    </>

  );
}
