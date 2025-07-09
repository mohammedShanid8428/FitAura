import React from "react";
import { images } from '../../assets/images'

export default function About(){
  return(
    <>
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5">About FitAura</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Discover the story behind our journey, the principles that guide us, and how we’re dedicated to
          empowering your health to grow and thrive.
        </p>
        <div className="flex justify-center overflow-hidden relative rounded-[40px] shadow-lg">
          <img src={images.modal10} alt="" className="w-full h-auto object-cover"/>
        </div>
      </div>
    </section>
    </>
  )
}