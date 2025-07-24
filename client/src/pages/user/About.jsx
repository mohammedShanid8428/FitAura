import React from "react";
import { images } from '../../assets/images'
import { Users, HeartPulse,  } from "lucide-react";
import { Link } from "react-router-dom";
import Trainers from "../../components/about/Traniers";
import { Salad, Repeat, Smile, Globe } from "lucide-react"; 
import Header from "../../components/common/Header";
import Footer from '../../components/common/Footer';

// import { Button } from "../../components/ui/Button";

export default function About(){
  return(
    <>
  <Header/>
    <section className="bg-black">

    <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
  {/* Background Image */}
  <img
    src={images.modal10} // Replace with your wellness-themed image
    alt="Health and Wellness Background"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

  {/* Content */}
  <div className="relative z-20 px-4 sm:px-6 max-w-3xl mx-auto text-white">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
      Your Wellness Journey Starts Here <br /> with FitAura
    </h1>

    <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto mb-6">
      Empower your body and mind with guided routines, personalized nutrition, and daily mood tracking — all in one place.
    </p>

    <button className="inline-block bg-orange-600 text-black text-sm sm:text-base font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-300 transition">
      Start Your Journey
    </button>
  </div>
</section>
 <section className="bg-[#0f0f0f] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-gray-300 tracking-widest text-sm uppercase mb-4">
          Special Moments
        </h3>
        <h2 className="text-center text-green- text-4xl font-bold mb-12">About Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left Image */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src={images.modal5} // Replace with your image
              alt="Left Dish"
              className="object-cover h-[350px] w-full hover:scale-105 transition duration-300"
            />
          </div>

          {/* Center Content */}
          <div className="bg-[#1a1a1a] text-center px-6 py-10 rounded-2xl h-[350px] flex flex-col justify-center items-center shadow-xl">
  <p className="text-gray-200 uppercase tracking-wide text-sm mb-2">
    Wellness Reimagined
  </p>
  <h3 className="text-orange-600 text-2xl md:text-3xl font-bold mb-4 leading-tight">
    Traditional <br /> & Modern
  </h3>
  <p className="text-gray-200 text-sm max-w-xs">
    At FitAura, we blend timeless wellness practices with modern science — offering mood tracking,
    personalized routines, and nutrition plans to help you thrive physically and mentally.
    Your holistic health journey begins here.
  </p>
</div>

          {/* Right Image */}
           <div className="rounded-2xl overflow-hidden">
            <img
              src={images.modal5} // Replace with your image
              alt="Left Dish"
              className="object-cover h-[350px] w-full hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </section>
 <section className="py-16 px-4 sm:px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Section */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4">Our Mission</h2>
          <p className="text-gray-200 text-base sm:text-lg mb-4">
            At FitAura, we are focused on redefining digital wellness through structured,
            science-backed systems — helping you live a better life physically and emotionally.
          </p>
          <p className="text-gray-200 text-base sm:text-lg">
            Our features are crafted to align with your wellness goals through daily practice,
            smart tracking, and global access to health knowledge.
          </p>
        </div>

        {/* Right Cards Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* 1. Nutrition */}
          <div className="bg-gray-800 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
              <Salad className="text-orange-600" size={24} />
            </div>
            <h4 className="text-orange-600 font-semibold text-lg mb-2">Nutrition</h4>
            <p className="text-sm text-gray-200">
              Track and personalize your daily meals with guidance from experts.
            </p>
          </div>

          {/* 2. Routines */}
          <div className="bg-gray-800 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
              <Repeat className="text-orange-600" size={24} />
            </div>
            <h4 className="text-orange-600 font-semibold text-lg mb-2">Routines</h4>
            <p className="text-sm text-gray-200">
              Build sustainable habits through structured morning and evening wellness routines.
            </p>
          </div>

          {/* 3. Moods */}
          <div className="bg-gray-800 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
              <Smile className="text-orange-600" size={24} />
            </div>
            <h4 className="text-orange-600 font-semibold text-lg mb-2">Moods</h4>
            <p className="text-sm text-gray-200">
              Monitor emotional wellbeing and identify patterns to feel more in control.
            </p>
          </div>

          {/* 4. Global Wellness */}
          <div className="bg-gray-800 shadow-md rounded-2xl p-6 hover:shadow-xl transition">
            <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
              <Globe className="text-orange-600" size={24} />
            </div>
            <h4 className="text-orange-600 font-semibold text-lg mb-2">Global Wellness</h4>
            <p className="text-sm text-gray-200">
              Empowering lives across the world with accessible health tools and insights.
            </p>
          </div>
        </div>
      </div>
    </section>
   
    <section className="py-16 px-4 sm:px-6 bg-black text-white text-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-4">
        Our Value
      </h2>

      {/* Description */}
      <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
        At FitAura, we’re committed to values that uplift body and mind.
        These principles guide everything we build and deliver.
      </p>

      {/* 4 Cards Below Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition">
          <div className="bg-green-100 text-orange-600  w-fit mx-auto p-3 rounded-full mb-4">
            <Salad size={24} />
          </div>
          <h4 className="text-orange-600  font-semibold mb-2">Nutrition</h4>
          <p className="text-sm text-gray-300">
            Expert-guided meal plans to fuel your journey.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition">
          <div className="bg-green-100 text-orange-600  w-fit mx-auto p-3 rounded-full mb-4">
            <Repeat size={24} />
          </div>
          <h4 className="text-orange-600  font-semibold mb-2">Routine</h4>
          <p className="text-sm text-gray-300">
            Consistent practices to build discipline and energy.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition">
          <div className="bg-green-100 text-orange-600 w-fit mx-auto p-3 rounded-full mb-4">
            <Smile size={24} />
          </div>
          <h4 className="text-orange-600 font-semibold mb-2">Mood</h4>
          <p className="text-sm text-gray-300">
            Tools to uplift and stabilize your emotional wellness.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:shadow-xl transition">
          <div className="bg-green-100 text-orange-600  w-fit mx-auto p-3 rounded-full mb-4">
            <Globe size={24} />
          </div>
          <h4 className="text-orange-600  font-semibold mb-2">Global Wellness</h4>
          <p className="text-sm text-gray-300">
            Accessible wellness experiences for everyone, anywhere.
          </p>
        </div>
      </div>
    </section>

 <section
      className="relative bg-cover bg-center bg-no-repeat text-white mt-10"
      style={{ backgroundImage: `url(${images.modal8})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Ready to Begin Your Wellness Journey?
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Join FitAura and start building a better you — one step at a time.
        </p>
        <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
          Get Started
        </button>
      </div>
    </section>

<section className=" py-16 px-6 md:px-12">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-sm tracking-wide uppercase text-gray-200 mb-2">What We Offer</p>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          Supporting Your Wellness Journey
        </h1>
        <p className="text-gray-200 font-medium text-lg">
          Personalized guidance, daily routines, and mood-based wellness tips to improve your mental and physical well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Routines */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Daily Routines</h2>
          <p className="text-gray-200 mb-6">
            Easy-to-follow workouts and schedules to help you build a consistent, active lifestyle.
          </p>
          <Link to="/routines">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold">
              Explore
            </button>
          </Link>
        </div>

        {/* Nutrition */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Nutrition Tips</h2>
          <p className="text-gray-600 mb-6">
            Balanced diet suggestions and recipes to keep your body energized and mind focused.
          </p>
          <Link to="/nutrition">
            <button className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-full font-semibold">
              Learn More
            </button>
          </Link>
        </div>

        {/* Mood Tracker */}
        <div className="bg-gray-800 rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Mood Tracker</h2>
          <p className="text-gray-200 mb-6">
            Track how you feel each day and discover patterns that help improve your emotional health.
          </p>
          <Link to="/mood">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold">
              Check In
            </button>
          </Link>
        </div>
      </div>
    </section>

    <Trainers/>

   
    

    
    </section>
    <Footer/>
  
    </>
  )
}