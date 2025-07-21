import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Section } from "lucide-react";

const testimonials = [
  {
    name: "Anna R.",
    age: 32,
    text: "Thanks to the personalized nutrition plan, I've learned how to fuel my body for better energy and focus.",
    bg: "bg-orange-100",
  },
  {
    name: "Mark S.",
    age: 41,
    text: "My daily wellness routine has helped me feel more grounded and emotionally balanced than ever before.",
    bg: "bg-teal-100 text-black",
  },
  {
    name: "Leena T.",
    age: 28,
    text: "Incorporating mood tracking into my day has been a game-changer for understanding my emotional patterns.",
    bg: "bg-lime-100 text-black",
  },
  {
    name: "James K.",
    age: 36,
    text: "Their sleep coaching routine helped me fix my sleep cycle and feel rested every morning.",
    bg: "bg-orange-100",
  },
  {
    name: "Sara M.",
    age: 29,
    text: "The fitness and mental wellness integration brought clarity and strength into my daily life.",
    bg: "bg-teal-100 text-black",
  },
  {
    name: "David L.",
    age: 45,
    text: "This wellness platform helped me build consistent habits for nutrition, mood, and daily routines.",
    bg: "bg-lime-100 text-black",
  },
];


export default function Testimonials() {
  const[start,setStart]=useState(0);
  const visible=testimonials.slice(start,start+2);

  const handlePrev=()=>{
    if(start>0) setStart(start -1);
  };
  const handleNext=()=>{
    if(start<testimonials.length-2) setStart(start+1);
  };

  return(
    <section className="py-16 px-4 max-w-6xl mx-auto mb-10">
      <div className="grid md:grid-cols-3 gap-8 items-start">
       <div>
         <p className="uppercase text-sm tracking-wide text-gray-200 mb-8 ">Testimonials</p>
         <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-teal-400 mb-6">
          What Our Clients Are Saying
         </h2>
         <p className="text-gray-200 mb-10 text-lg max-w-xs">
            Real stories from users who transformed their health through routines, nutrition, and mood tracking.
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={handlePrev} className="bg-gray-300 p-2 rounded-full hover:bg-gray-400">
              <ArrowLeft size={22} />
            </button>
            <button onClick={handleNext} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900">
              <ArrowRight size={22} />
            </button>
          </div>
       </div>

       {visible.map((item,index)=>(
        <div className={`rounded-3xl p-8 w-[350px] h-[300px] md:p-8 shadow flex flex-col justify-center ${item.bg}`}>
          <p className="text-xl leading-relaxed mb-6">"{item.text}"</p>
          <p className="font-semibold text-md">— {item.name}, {item.age}</p>
        </div>
       ))}
      </div>
    </section>
  )
}
