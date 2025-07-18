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

import Life from "../../components/routines/Life"

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
      <section className="relative w-full h-screen ">
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
      <section className="bg-[#CCFF00] py-6 px-4">
  <div className="max-w-7xl mx-auto flex flex-wrap justify-around items-center space-y-4 md:space-y-0">
    {/* Brand 1 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/robinhood.svg" alt="Robinhood" className="h-6" />
      <span className="font-semibold text-black">Robinhood</span>
    </div>

    {/* Brand 2 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/samsara.svg" alt="Samsara" className="h-6" />
      <span className="font-semibold text-black">Samsara</span>
    </div>

    {/* Brand 3 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/firstbase.svg" alt="Firstbase" className="h-6" />
      <span className="font-semibold text-black">Firstbase</span>
    </div>

    {/* Brand 4 */}
    <div className="flex items-center space-x-2">
      <img src="/icons/fithes.svg" alt="Fithes" className="h-6" />
      <span className="font-semibold text-black">Fithes</span>
    </div>
  </div>
</section>


       
    

      {/* <Plan/> */}

      <Templete/>

      <Service/>
    
    
    <section className="bg-black py-16 px-6 text-center">
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
            src={images.modal15}
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
     
    <Life/>


     
    </>
  );
}
