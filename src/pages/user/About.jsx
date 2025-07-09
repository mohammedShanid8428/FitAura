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
    
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="bg-gray-900 rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse shadow-lg">
          <img src={images.modal11} alt="" className="w-full h-[400px] md:w-1/2 object-cover" />
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">FitAura</h2>
            <p className="text-gray-300 mb-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur quisquam quam harum ex obcaecati illo magni aliquam veniam ullam quasi! Ex modi eius quisquam libero ipsam alias minima ipsa dicta expedita totam saepe sequi voluptates pariatur aperiam explicabo, quas recusandae architecto
            atque aliquid reiciendis perspiciatis exercitationem! Praesentium quia consequatur laborum?</p>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg text-md w-fit">
              Learn more
            </button>
          </div>
        </div>
        <div className="bg-gray-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg">
          <img src={images.modal12} alt="" className="w-full h-[400px] md:w-1/2 object-cover" />
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">Our target</h2>
            <p className="text-gray-300 mb-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur quisquam quam harum ex obcaecati illo magni aliquam veniam ullam quasi! Ex modi eius quisquam libero ipsam alias minima ipsa dicta expedita totam saepe sequi voluptates pariatur aperiam explicabo, quas recusandae architecto
            atque aliquid reiciendis perspiciatis exercitationem! Praesentium quia consequatur laborum?</p>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg text-md w-fit">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Meets our experts</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
           Discover the passionate team of innovators, strategists, and customer success
      professionals working tirelessly to help you achieve your goals.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6">
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
          <img src={images.modal8} className="w-full h-[320px] object-cover" alt="" />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Michael Carter </h3>
            <p className="text-gray-400 text-md mb-4">Routines trainer</p>
          </div>
        </div>
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
          <img src={images.modal6} className="w-full h-[320px] object-cover" alt="" />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Ryan Davis</h3>
            <p className="text-gray-400 text-md mb-4">Nutrition trainer</p>
          </div>
        </div>
        <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
          <img src={images.modal7} className="w-full h-[320px] object-cover" alt="" />
          <div className="p-6">
            <h3 className="text-xl font-semibold">Jessica Walker</h3>
            <p className="text-gray-400 text-md mb-4">Mood trainer</p>
          </div>
        </div>
      </div>
    </section>

    
    </>
  )
}