import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4 md:px-16 text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Left Side: Description + Social Icons */}
        <div>
          <h3 className="text-3xl font-semibold text-teal-700 mb-4">
            Discover Balance with FitAura.
          </h3>
          <p className="text-md text-gray-600 leading-relaxed mb-6">
            Your partner in building mindful routines, nutritious habits, and emotional well-being. 
            Explore personalized plans to fuel your body, mind, and soul—because wellness should be simple and joyful.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-2xl">
            <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

     
        <div className="flex flex-wrap justify-around">
          <div className="space-y-3 text-md font-medium text-gray-700">
            <p className="hover:text-black cursor-pointer">Get in Touch</p>
            <p className="hover:text-black cursor-pointer">About FitAura</p>
            <p className="hover:text-black cursor-pointer">FAQ</p>
            <p className="hover:text-black cursor-pointer">Privacy</p>
            <p className="hover:text-black cursor-pointer">Terms of Service</p>
          </div>
          <div className="space-y-3 text-md font-medium text-gray-700">
            <p className="hover:text-black cursor-pointer">Nutrition Guides</p>
            <p className="hover:text-black cursor-pointer">Mood Tracker</p>
            <p className="hover:text-black cursor-pointer">Daily Routines</p>
            <p className="hover:text-black cursor-pointer">Wellness Resources</p>
            <p className="hover:text-black cursor-pointer">Contact Support</p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-400 text-center mt-10">
        © 2025 FitAura. All rights reserved.
      </p>
    </footer>
  );
}
