import React from "react";
import { Link } from "react-router-dom";
const services = [
  {
    title: "Mindfulness & Meditation",
    description: "Elevate your mood with calming breathwork, mindful focus, and clarity-boosting practices that ease stress and uplift your spirit.",
    bg: "bg-orange-100"

  },
  {
   

    title: " Your Routine Tracker",
description: "Stay consistent and in control with smart routine tracking — monitor your progress, build better habits, and achieve your wellness goals day by day.",
bg: "bg-white"


  },
  {
    title: "Fuel Your Body Right",
    description: "Personalized meal plans and smart nutrition tips to nourish your body, boost energy, and support your wellness journey.",
    bg: "bg-green-100"

  },
  {
    title: "Yoga Into Flexibility",
    description: "Unwind your body and mind with guided yoga sessions that enhance flexibility, ease tension, and improve balance from within.",
    bg: "bg-white"

  },
  {
    title: "Mood & Journal Tracking",
    description: "Capture your daily emotions and habits to gain clarity, build awareness, and nurture a balanced mindset.",
    bg: "bg-orange-100"

  },
  {
    title: "Hydrate & Thrive",
    description: "Boost your energy and mood by staying consistently hydrated. Gentle reminders and hydration tips to keep your body and mind in sync.",
    bg: "bg-blue-100"

  }
];

export default function Services() {
  return (
    <section className=" py-14 px-4 mb-5">
      <div className="text-center mb-14">
        <p className="text-md uppercase tracking-wider text-gray-500 mb-4">Services</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
          Your Path to <br className="hidden md:block" /> Well-being
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto text-xl mt-6">
          Discover expert guidance for a healthier mind and balanced life.
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 w-max px-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`min-w-[280px] md:w-[420px] h-[350px] rounded-3xl px-10 py-10 shadow-md ${service.bg}`}
            >
              <h3 className="text-2xl md:text-3xl max-w-[240px]  font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 text-base md:text-lg">
                {service.description}
              </p>
              <Link to={'/auth/login'} >
                <button className="border border-gray-800 text-gray-800 py-2 px-6 font-medium rounded-full hover:bg-gray-300 transition">
                  Learn More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
