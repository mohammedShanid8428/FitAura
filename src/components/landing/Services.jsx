import React from "react";

const services = [
  {
    title: "Mindfulness & Meditation",
    description: "Guided breathing, focus techniques, and mental clarity routines to reduce stress.",
    bg: "bg-orange-100"
  },
  {
    title: "One-on-One Routine ",
    description: "Personalized plans from certified trainers for your daily wellness goals.",
    bg: "bg-white"
  },
  {
    title: "Nutrition Guidance",
    description: "Healthy meal planning and nutritional advice tailored to your body’s needs.",
    bg: "bg-green-100"
  },
  {
    title: "Yoga & Flexibility",
    description: "Improve posture, reduce tension, and increase flexibility with guided yoga routines.",
    bg: "bg-white"
  },
  {
    title: "Mood & Journal Tracking",
    description: "Track daily emotions and habits to reflect and reset your mindset.",
    bg: "bg-orange-100"
  },
  {
    title: "Sleep Coaching",
    description: "Get expert tips and night routines to improve your sleep quality and duration.",
    bg: "bg-green-100"
  }
];

export default function Services() {
  return (
    <section className=" py-14 px-4 mb-20">
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
              className={`min-w-[280px] md:w-[420px] h-[350px] rounded-3xl px-10 py-20 shadow-md ${service.bg}`}
            >
              <h3 className="text-2xl md:text-3xl max-w-[240px]  font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-6 text-base md:text-lg">
                {service.description}
              </p>
              <button className="border border-gray-300 text-gray-800 py-2 px-6 font-medium rounded-full hover:bg-gray-300 transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
