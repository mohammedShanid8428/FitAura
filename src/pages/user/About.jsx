import React from "react";
import { images } from '../../assets/images'
import { Mail, Phone, MapPin } from "lucide-react";

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

    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Reach out to us today</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Whether you need support or want to learn more, we're here to assist you
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <Mail className="w-8 h-8 mb-4 text-white"/>
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <p className="text-md text-gray-400">FitAura@gmail.com</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <Phone className="w-8 h-8 mb-4 text-white"/>
            <h3 className="text-lg font-semibold mb-1">Phone</h3>
            <p className="text-md text-gray-400">+91 09754584588</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition">
            <MapPin className="w-8 h-8 mb-4 text-white"/>
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p className="text-md text-gray-400">Kozhikode,kerala,india</p>
          </div>
        </div>
      </div>
    </section>

    
    </>
  )
}