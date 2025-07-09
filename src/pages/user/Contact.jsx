import React from "react";
import { images } from "../../assets/images";

export default function Contact(){
  return(
    <>
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
             We're here to help
          </h2>
          <form action="" className="space-y-6">
            <div>
              <label htmlFor="" className="block mb-1 text-md font-medium">Name</label>
              <input type="text" className="w-full bg-[#14#14#14] border border-[#2a2a2a] text-white rounded-md px-4 p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label htmlFor="" className="block mb-1 text-md font-medium">Email Address</label>
              <input type="email" className="w-full bg-[#14#14#14] border border-[#2a2a2a] text-white rounded-md px-4 p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label htmlFor="" className="block mb-1 text-md font-medium">Messsge</label>
              <textarea name="" className="w-full w-full bg-[#141414] border border-[#2a2a2a] text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400" id=""></textarea>
            </div>
            <button className="mt-4 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1b1b1b] p-6 rounded-2xl shadow-lg border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">FitAura</div>
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-300 text-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas dolorum architecto, numquam itaque alias dicta error quidem, iusto deleniti nulla tempora eum. Eum ea quae quia labore veritatis delectus. Rerum, necessitatibus? Alias architecto debitis sunt est vero distinctio, consectetur, nobis eius modi expedita ab odit numquam reprehenderit eligendi neque atque esse et voluptatum magnam minus ad? Nihil, modi officia? Rem aliquid voluptas voluptate atque, nobis ipsam cupiditate molestias facilis, odio corporis laudantium sunt temporibus dolorem consequatur, vero tenetur quisquam eveniet nam. Fuga, deserunt harum. A magnam non delectus vel quae veniam, sapiente,
             eveniet aliquid atque nesciunt adipisci quasi voluptatem.
          </p>
          <div className="mt-4">
            <img src={images.modal8} alt="" />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}