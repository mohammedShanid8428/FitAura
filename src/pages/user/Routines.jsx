import React from 'react'

import { useState ,useEffect} from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { images, serviceImg } from "../../assets/images";

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
    title: "DAILY FITENESS FOR EVERYONE.",
    subtitle: "FRESH VEGGIES FOR A HEALTHY LIFE",
    label: "VITABOOST",
    description:
      "Fuel your body with real nutrients. Start your wellness journey today with clean eating tips.",
  },
];

export default function Routines() {
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
            <button className="flex items-center border border-white text-white px-6 py-2 rounded hover:bg-gray-200 text-sm">
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
   </>
  )
}

