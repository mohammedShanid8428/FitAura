import React from "react";
import { images } from '../../assets/images'
import { Users, HeartPulse,  } from "lucide-react";
import { Link } from "react-router-dom";
import Trainers from "../../components/about/Traniers";
import Header from "../../components/Header";
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
<section className="py-16 px-4 sm:px-8 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="flex justify-center md:justify-end">
          <img
            src={images.modal10}
            alt="Health Wellness"
            className="rounded-3xl w-64 md:w-80 h-auto object-cover shadow-lg hover:scale-105 transition"
          />
        </div>


        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-lime-400 to-green-500 text-transparent bg-clip-text">
            About Us
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            FitAura was born from the belief that wellness should be simple and holistic.
            Our team includes fitness coaches, nutritionists, and mental health mentors — all
            committed to helping you thrive inside and out.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-xs">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 transition">
              <Users size={26} className="text-lime-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">8+</p>
              <p className="text-xs text-gray-400">Health Experts</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 transition">
              <HeartPulse size={26} className="text-green-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">10K</p>
              <p className="text-xs text-gray-400">Active Users</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center hover:scale-105 transition">
              <Star size={26} className="text-yellow-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">4.9</p>
              <p className="text-xs text-gray-400">App Rating</p>
            </div>
          </div>
        </div>

      </div>
    </section>
<section className="bg-yellow-400 py-16 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* Left: Text */}
    <div>
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Our Mission</h2>
      <p className="text-black text-base sm:text-lg mb-4">
        We are on a mission to redefine wellness. Beyond tracking steps or meals,
        we aim to create personalized, empowering journeys that align with your mind, body, and goals.
      </p>
      <p className="text-black text-base sm:text-lg">
        Whether you're managing stress, building better habits, or striving for a healthier routine,
        our mission is to support your growth with guidance, care, and science-backed tools.
      </p>
    </div>

    {/* Right: Image */}
    <div className="flex justify-center md:justify-start">
      <img
        src={images.modal9} // Replace with your image path
        alt="Our Mission"
        className="rounded-[30px] w-72 h-auto object-cover"
      />
    </div>

  </div>
</section>

<section className="bg-[#fdf9f8] text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left image and intro */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Values</h2>
          <p className="text-gray-600 text-base max-w-md mb-6">
            We take pride in tailoring each itinerary to ensuring that every moment of your adventure.
          </p>
          <img
            src={images.modal9}
            alt="Our Values"
            className="mx-auto md:mx-0 w-60 h-auto object-contain"
          />
        </div>

        {/* Right content */}
        <div className="flex-1 space-y-8">
          <div>
            <h4 className="text-lg font-bold mb-1">01 Commitment to Excellence</h4>
            <p className="text-gray-600">
              Our passion for exploration drives us to seek out the most captivating destinations and curate experiences that leave a lasting impact.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">02 Passion for Exploration</h4>
            <p className="text-gray-600">
              We go above and beyond to ensure that every aspect of your journey exceeds expectations.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">03 Responsible Travel</h4>
            <p className="text-gray-600">
              We are committed to minimizing our environmental footprint and preserving the beauty of the destinations we visit.
            </p>
          </div>

          {/* Horizontal Line */}
          <hr className="border-gray-300 mt-6" />
        </div>
      </div>
    </section>
<section className="bg-gradient-to-br from-white via-gray-50 to-orange-50 py-16 px-6 md:px-12">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-sm tracking-wide uppercase text-gray-500 mb-2">What We Offer</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Supporting Your Wellness Journey
        </h1>
        <p className="text-gray-600 font-medium text-lg">
          Personalized guidance, daily routines, and mood-based wellness tips to improve your mental and physical well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Routines */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Routines</h2>
          <p className="text-gray-600 mb-6">
            Easy-to-follow workouts and schedules to help you build a consistent, active lifestyle.
          </p>
          <Link to="/routines">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold">
              Explore
            </button>
          </Link>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nutrition Tips</h2>
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
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mood Tracker</h2>
          <p className="text-gray-600 mb-6">
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

    <div className="bg-purple-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
        <p className="mb-6 text-lg">Join FitAura and start building a better you — one step at a time.</p>
        <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">Get Started</button>
      </div>
    

    
    </section>
    </>
  )
}