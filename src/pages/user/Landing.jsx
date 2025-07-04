import React from 'react';
import { images } from '../../assets/images'

export default function Landing() {
  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <header className="bg-gray-100 px-6 py-5">
        <div className='max-w-7xl max-auto flex items-center justify-between relative px-12'>
          <div className='flex space-x-12 text-md font-medium text-gray-900'>
            <a href="#">Dashboard</a>
            <a href="#">Mood</a>
            <a href="#">About</a>
          </div>
          <div className='text-2xl font-bold text-green-800'>
          FitAura
          </div>

          <div className='flex space-x-12 text-md font-medium text-gray-900'>
            <a href="#">Routines</a>
            <a href="#">Nutritions</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-orange-100 min-h-[430px] py-24 px-4 rounded-[50px] max-w-5xl  mx-auto my-12 h-100 relative overflow-hidden ">
       
        <img src={images.hero1} 
          alt="Decorations"
          className="absolute w-[420px] bottom-[-80px] left-[-85px] z-0"
        />
        <img src={images.hero2}
          alt="Decorations"
          className="absolute w-[420px] bottom-[-80px] right-[-80px] z-0"
        />
        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-5xl  font-bold text-green-900 mb-6">
            Support for Your <br className='hidden md:block' /> Mental Well-being
          </h2>
          <p className="text-gray-700 mb-8 max-w-md mx-auto text-xl">
            Connect with licensed therapists, counselors, and wellness coaches to support your journey.
          </p>
          <button className="bg-green-800 text-white py-2 px-10 rounded-3xl hover:bg-green-900 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* SECOND MODAL SECTION */}
      <section className="max-w-6xl mx-auto px-10 py-18 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <p className="text-md uppercase tracking-wide text-gray-500 mb-4">How it works</p>
          <h3 className="text-3xl md:text-5xl leading-snug font-bold text-green-900 mb-6">
            We Help You <br /> Prioritize Your <br />  Health And Wellness
          </h3>
          <p className="text-gray-700 mb-8 max-w-sm text-xl">
            Browse therapists,Lorem, ipsum.lore2 book a session, and start your healing journey with trusted professionals.
          </p>
          <button className="bg-green-800 text-white py-3 px-8 rounded-full hover:bg-green-900 transition text-md">
            Find A Trainer
          </button>
        </div>

        {/* Right Image Box */}
        <div className="flex justify-center">
          <div className="bg-green-900 md:p-10 px-4 ms-12 rounded-3xl shadow-lg">
            <img
              src={images.modal1}
              alt="Mental Health"
              className="w-100 md:w-58"
            />
          </div>
        </div>
      </section>

      <section className='bg-gray-100 py-14 px-4 mb-20'>
        <div className='text-center mb-14'>
          <p className='text-md uppercase tracking-wider text-gray-500 mb-4'>Service</p>
          <h1 className='text-3xl md:text-5xl font-bold text-green-900 mb-2'>
            Your Path to <br  className=''/>Well-being
          </h1>
          <p className='text-gray-600 max-w-sm mx-auto text-xl mt-6'>
            Discover expert guidance for a healtheir mind and balanced life.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8  max-w-5xl mx-auto '>
          <div className='bg-orange-100 rounded-3xl px-8 py-14 shadow-md'>
            <h3 className='text-3xl md:text-4xl max-w-sm font-semibold text-green-900 mb-4'>Mindfulness & Meditation</h3>
            <p className='text-gray-700 max-w-xs mb-6 text-xl'>
              Guided Routine and Nutrition sessions and stress management and techniques
            </p>
            <button className='border  border-green-800 py-2 px-8 font-semibold rounded-full hover:bg-green-100 transition'>
              Learn More
            </button>
          </div>

          <div className='bg-white rounded-3xl px-8 py-14 shadow-md'>
            <h3 className='text-3xl md:text-4xl max-w-xs font-semibold text-green-900 mb-4'>One-on-One ROutine</h3>
            <p className='text-gray-700 max-w-xs mb-6 text-xl'>
              Virtual and in-person Routines and nutrition sessions with licensed professionals.
            </p>
            <button className='border border-green-800 text-green-800 py-2 px-8 font-semibold rounded-full hover:bg-green-100 transition'>
              Learn More
            </button>
          </div>
        </div>
      </section>
      

      

      
    </div>
  );
}
