import React, { useState, useEffect } from "react";
import { images } from "../../assets/images";

const slides = [
  {
    id: 1,
    image: images.modal7,
    title: "FULL BODY WORKOUT SESSION",
    subtitle: "STRENGTH • FLEXIBILITY",
    label: "GYMBOOST",
    description:
      "Push your limits with dynamic full-body exercises designed to improve muscle tone, endurance, and flexibility. Ideal for all fitness levels.",
  },
  {
    id: 2,
    image: images.modal8,
    title: "MORNING YOGA & STRETCHING",
    subtitle: "RELAX • BREATHE • BALANCE",
    label: "ZENFLOW",
    description:
      "Start your day with calming yoga flows and essential stretches that awaken your body, improve posture, and enhance mental clarity.",
  },
];

export default function RoutinesHero() {
 const[current,setCurrent]=useState(0)

 useEffect(()=>{
  const interval=setInterval(()=>{
    setCurrent((prev)=>(prev===slides.length-1?0:prev+1));
  },2000)
  return ()=>clearInterval(interval)
 },[])

  const { image, title, subtitle, label, description } = slides[current];

  return (
    <section className="relative w-full h-screen">
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
          <h2 className="text-4xl md:text-4xl font-bold py-3 text-white mb-4 tracking-wider ">{title}</h2>
          <p className="text-white pr-4 mb-8">{description}</p>
          <div className="flex gap-6 flex-wrap">
            <button className="bg-orange-500 text-white px-8 py-3 rounded shadow hover:bg-orange-600 text-md">
              MORE ABOUT
            </button>
            <button className="flex items-center border border-white text-white px-6 py-2 rounded hover:bg-gray-200 hover:text-black text-md">
              VIEW SESSIONS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
