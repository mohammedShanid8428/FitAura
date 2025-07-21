import React from "react";
import { images } from "../../assets/images";

export default function RoutinesChoose() {
  const benefits = [
    {
      title: "Qualified Trainers",
      desc: "Train with Certified Experts. Gain Direct Results through Expert-Led Guidance.",
    },
    {
      title: "Flexible Time",
      desc: "Access our facilities Anytime. Get Results, Anytime, at your Convenience.",
    },
    {
      title: "Personal Trainers",
      desc: "1-on-1 Guidance from Experts. Your Goals, Our Commitment.",
    },
    {
      title: "24/7 Open",
      desc: "Access Anytime with Confidence. Anytime, Anywhere, Achieve Your Fitness Goals.",
    },
  ];

  return (
    <section className="text-white py-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-lime-400 tracking-wider">
          Why Should You Choose Us
        </h2>
        <p className="text-gray-300">
          FitAura is your personalized health and wellness companion, offering structured workout routines, yoga sessions, guided meditations, and balanced nutrition plans
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">

        
        <div className="flex flex-col gap-6">
          <div className="w-56 bg-[#1c1c1c] border border-lime-500 rounded-lg p-4 text-center shadow-lg">
            <h4 className="font-semibold mb-2">{benefits[0].title}</h4>
            <p className="text-sm text-gray-300">{benefits[0].desc}</p>
          </div>
          <div className="w-56 bg-[#1c1c1c] border border-lime-500 rounded-lg p-4 text-center shadow-lg">
            <h4 className="font-semibold mb-2">{benefits[2].title}</h4>
            <p className="text-sm text-gray-300">{benefits[2].desc}</p>
          </div>
        </div>

    
        <div className="flex justify-center">
          <img
            src={images.modal10}
            alt="Trainer"
            className="w-72 md:w-96 object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="w-56 bg-[#1c1c1c] border border-lime-500 rounded-lg p-4 text-center shadow-lg">
            <h4 className="font-semibold mb-2">{benefits[1].title}</h4>
            <p className="text-sm text-gray-300">{benefits[1].desc}</p>
          </div>
          <div className="w-56 bg-[#1c1c1c] border border-lime-500 rounded-lg p-4 text-center shadow-lg">
            <h4 className="font-semibold mb-2">{benefits[3].title}</h4>
            <p className="text-sm text-gray-300">{benefits[3].desc}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
