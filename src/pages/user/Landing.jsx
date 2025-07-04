import React from 'react';

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
      <section className="bg-orange-100 py-14 px-4 rounded-3xl max-w-5xl mx-auto my-10 relative overflow-hidden">
        {/* Illustration background left/right */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3898/3898106.png"
          alt="Decorations"
          className="absolute w-20 top-4 left-4 md:left-8"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/6858/6858142.png"
          alt="Decorations"
          className="absolute w-20 bottom-4 right-4 md:right-8"
        />
        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Support for Your Mental Well-being
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Connect with licensed therapists, counselors, and wellness coaches to support your journey.
          </p>
          <button className="bg-green-800 text-white py-2 px-6 rounded hover:bg-green-900 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* SECOND MODAL SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Text */}
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">How it works</p>
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            We Help You Prioritize Your Mental Health
          </h3>
          <p className="text-gray-700 mb-4">
            Browse therapists, book a session, and start your healing journey with trusted professionals.
          </p>
          <button className="bg-green-800 text-white py-2 px-5 rounded hover:bg-green-900 transition text-sm">
            Find A Therapist
          </button>
        </div>

        {/* Right Image Box */}
        <div className="flex justify-center">
          <div className="bg-green-900 p-6 rounded-xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4764/4764634.png"
              alt="Mental Health"
              className="w-40"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
