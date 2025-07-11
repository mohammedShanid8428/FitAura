import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play,CheckCircle } from "lucide-react";
import { exerciseImg, images } from "../../assets/images"; // make sure this path is valid
import Header from "../../components/Header";
import Plan from "../../components/routines/Plan";
import Templete from "../../components/routines/Templete";
import Service from "../../components/routines/Service";
import Strech from "../../components/routines/Strech";
import Yoga from "../../components/routines/Yoga";
import Hydration from "../../components/routines/Hydration";

const slides = [
  {
    id: 1,
    image: images.modal7,
    title: "ONLINE ROUTINE WORKOUT PLAN.",
    subtitle: "BALANCED NUTRITION DIET",
    label: "NUTREE",
    description:
      "Nunc accumsan dui vel lobortis pulvinar. Duis convallis odio ut dignissim faucibus. Sed sit amet urna dictum.",
  },
  {
    id: 2,
    image: images.modal8,
    title: "DAILY FITNESS FOR EVERYONE.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Fuel your body with real nutrients. Start your wellness journey today with clean eating tips.",
  },
];



export default function Routines() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const { image, title, subtitle, label, description } = slides[current];

  return (
    <>
      {/* Carousel Section */}
      <Header/>
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src={image}
          alt="Slide"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center h-full px-6">
          <div className="p-8 max-w-xl">
            <div className="flex items-center mb-6">
              <span className="bg-lime-500 text-white text-xl font-semibold px-2 py-1 rounded mr-2">
                {label}
              </span>
              <span className="text-xl text-white font-medium tracking-wide">
                {subtitle}
              </span>
            </div>
            <h2 className="text-5xl font-bold py-3 text-white mb-4">{title}</h2>
            <p className="text-white pr-4 mb-8">{description}</p>
            <div className="flex gap-6 flex-wrap">
              <button className="bg-orange-500 text-white px-8 py-3 rounded shadow hover:bg-orange-600 text-md">
                MORE ABOUT
              </button>
              <button className="flex items-center border border-white text-white px-6 py-2 rounded hover:bg-gray-200 hover:text-black text-sm">
                <Play className="w-4 h-4 mr-2" />
                PLAY SESSIONS
              </button>
            </div>
          </div>
        </div>

        {/* Arrows */}
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

        <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Text Content */}
        <div>
          <p className="uppercase text-sm text-gray-400 mb-2">Who we are</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            Building fitness is building your<br />
            body and confidence
          </h2>
          <p className="text-gray-300 mb-8">
            Aperiam magna rutrum risus platea non at per maximus. Quis rutrum aliquet sapien auctor nullas volutpat eu iaculis nisl. Tristique hendrerit est diam metus egestas scelerisque vulputate.
          </p>

          {/* List Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-lg">✓</span>
              <div>
                <h4 className="font-semibold">Personal Trainer</h4>
                <p className="text-sm text-gray-400">Vivamus facilisi potenti blandit sit eros nisi consectetur.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-lg">✓</span>
              <div>
                <h4 className="font-semibold">Cardio Programs</h4>
                <p className="text-sm text-gray-400">Vivamus facilisi potenti blandit sit eros nisi consectetur.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-lg">✓</span>
              <div>
                <h4 className="font-semibold">Quality Equipments</h4>
                <p className="text-sm text-gray-400">Vivamus facilisi potenti blandit sit eros nisi consectetur.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-orange-500 text-lg">✓</span>
              <div>
                <h4 className="font-semibold">Healthy Nutrition</h4>
                <p className="text-sm text-gray-400">Vivamus facilisi potenti blandit sit eros nisi consectetur.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Images */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src="/assets/muscle-main.jpg" // 📌 Replace with actual image
            alt="Muscle"
            className="rounded-lg object-cover w-full h-full max-h-[400px]"
          />
          <img
            src="/assets/muscle-overlay.jpg" // 📌 Replace with actual image
            alt="Overlay"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 w-48 rounded-md border-4 border-black shadow-lg"
          />
          {/* Optional Orange Decoration */}
          <div className="absolute bottom-4 right-4 w-6 h-3 bg-orange-500"></div>
        </div>
      </div>
    </section>
    

      {/* <Plan/> */}

      <Templete/>

      <Service/>
 
    <section className="bg-[#f6fbff] py-16 px-6 text-center">
      <h4 className="text-blue-500 uppercase text-sm mb-2">What’s Inside</h4>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        💧 Hydration & Mineral Composition
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
        {/* Left Composition Info */}
        <div className="text-left space-y-5 text-gray-700 text-sm">
          <div>
            <h3 className="font-bold text-blue-700">Calcium+</h3>
            <p>5–13 mg/dm³ — Supports bone health & muscle function.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Magnesium</h3>
            <p>3–5 mg/dm³ — Boosts energy & regulates blood pressure.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Sodium</h3>
            <p>20–25 mg/dm³ — Maintains fluid balance and nerve signals.</p>
          </div>
        </div>

        {/* Center Glass Image */}
        <div className="w-48 md:w-56">
          <img
            src="/assets/glass-water.png"
            alt="Water glass"
            className="w-full object-contain"
          />
        </div>

        {/* Right Composition Info */}
        <div className="text-left space-y-5 text-gray-700 text-sm">
          <div>
            <h3 className="font-bold text-blue-700">Chlorine</h3>
            <p>&lt; 0.2 mg/dm³ — Keeps water safe & disinfected.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Sourness (pH)</h3>
            <p>6.5–7.5 — Balanced pH for better hydration & digestion.</p>
          </div>
          <div>
            <h3 className="font-bold text-blue-700">Mineralization</h3>
            <p>100–150 mg/l — Improves taste & replenishes minerals.</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-10">
        <a
          href="/hydration"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🚰 Explore Hydration Routine
        </a>
      </div>
    </section>
     (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="md:w-1/2">
          <p className="text-red-500 uppercase font-semibold tracking-wide mb-3">
            Life Routine
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-snug">
            Create Powerful Routines <br /> to Build Your Health & Mind
          </h2>
          <p className="text-gray-300 mb-6">
            The secret to long-term health lies in your **daily habits**. Our guided routines support your body and mind through all phases of the day — from waking up strong to winding down with clarity.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Morning Boost</p>
                <p className="text-gray-400">Wake early, stretch, hydrate, and set intentions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Mindful Midday</p>
                <p className="text-gray-400">Take breaks, nourish, and re-align your focus.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Evening Energy</p>
                <p className="text-gray-400">Gentle movement, reflect on wins, connect with self.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">Night Recharge</p>
                <p className="text-gray-400">Unplug, relax, breathe, and sleep deeply.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 relative">
          <img
            src="/assets/daily-routine-model.png"
            alt="Routine Visualization"
            className="w-full rounded-lg shadow-xl"
          />
          {/* Optional decorative red strip */}
          <div className="absolute top-0 right-0 w-4 h-full bg-red-500 rounded-r-lg hidden md:block"></div>
        </div>
      </div>
    </section>

     
    </>
  );
}
