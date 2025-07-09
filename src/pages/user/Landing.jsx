import React from 'react';
import { images } from '../../assets/images'
import { Link } from "react-router-dom";
import Header from '../../components/landing/Header';
import Services from '../../components/landing/Services';

import {
  Linkedin,
  Facebook,
  Instagram,
  PhoneCall,
  Mail,
  MapPin
} from 'lucide-react';
import { useState } from "react";
import { Menu, X } from "lucide-react";


export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAuth, setActiveAuth] = useState("login");
  return (
    <div className=" bg-gray-50">
      <Header />

      <section className="bg-orange-100 min-h-[430px] py-16 sm:py-20 px-4 sm:px-6 md:px-10 rounded-[40px] max-w-5xl mx-auto my-10 md:my-12 relative overflow-hidden">
        <img
          src={images.hero1}
          alt="Decorative left element"
          className="absolute w-[220px] sm:w-[320px] md:w-[440px] md:bottom-[-90px]  md:left-[-90px] z-0"
        />
        <img
          src={images.hero2}
          alt="Decorative right element"
          className="absolute w-[220px] sm:w-[320px] md:w-[420px] bottom-[-90px] right-[-80px] z-0"
        />

        <div className="text-center relative z-10 px-2">
          <h2 className="text-2xl sm:text-2xl md:text-5xl font-bold text-gray-800 mb-5 leading-snug">
            Empower Your Health <br className="hidden md:block" /> and Wellness Journey
          </h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto text-sm sm:text-base md:text-lg">
            Discover personalized routines, expert guidance, and tools to help you stay physically active, mentally strong, and nutritionally balanced.
          </p>
          <button className="bg-gray-800 text-white text-sm sm:text-base py-3 px-6 sm:px-8 rounded-full hover:bg-gray-900 transition-all duration-200">
            Explore Now
          </button>
        </div>
      </section>

      {/* SECOND MODAL SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">How It Works</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl leading-snug font-bold text-gray-800 mb-6">
            Build Better Habits <br className="hidden sm:block" /> With Your <br /> Routine Trainer
          </h3>
          <p className="text-gray-700 mb-8 max-w-md text-base sm:text-lg">
            Get matched with a trainer who helps you stay consistent. Track your workouts, plan healthy meals, and maintain your wellness — all in one place.
          </p>
          <button className="bg-gray-800 text-white py-2.5 px-6 sm:px-8 rounded-full hover:bg-gray-900 transition text-sm sm:text-base">
            Find A Trainer
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-lg w-[450px] flex items-center justify-center">
            <img
              src={images.modal1} // Replace with new trainer illustration
              alt="Routine Trainer"
              className="w-52 sm:w-64 md:w-72 lg:w-80 h-[400px] rounded-[70px]"
            />
          </div>
        </div>
      </section>

      <Services/>

      <section className='bg-gray-50 py-16 px-6 md:px-12'>
        <div className='text-center mb-12 max-w-3xl mx-auto'>
          <p className='text-md tracking-wide uppercase text-gray-600 mb-2'>Explore & Learn</p>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Resources for <br className="" /> Your Well-being
          </h1>
          <p className='text-gray-700 font-semibold text-xl'>
            Explore expert insights, self-care guides,<br /> and tools to support your mental health.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          <div className='bg-white rounded-[50px] p-8 shadow-md text-center max-w-xs'>
            <h2 className='text-2xl  font-semibold text-gray-900  mb-4'>Article & <br /> Guides</h2>
            <p className='text-gray-600 mb-8 font-semibold'>
              Practical tips on stress management, mindfulness, and emotional resilience.
            </p>
            <button className='bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-2 rounded-full font-medium'>
              Explore
            </button>
          </div>
          <div className='bg-white rounded-[50px] p-8 shadow-md text-center max-w-xs'>
            <h2 className='text-2xl  font-semibold text-gray-900  mb-4'>Routines & <br /> Guides</h2>
            <p className='text-gray-600 mb-8 font-semibold'>
              Practical tips on stress management, mindfulness, and emotional resilience.
            </p>
            <button className='bg-teal-400 hover:bg-teal-500 text-white px-8 py-2 rounded-full font-medium'>
              Explore
            </button>
          </div>
          <div className='bg-white rounded-[50px] p-8 shadow-md text-center max-w-xs'>
            <h2 className='text-2xl  font-semibold text-gray-900  mb-4'>Nutrition & <br /> Guides</h2>
            <p className='text-gray-600 mb-8 font-semibold'>
              Practical tips on stress management, mindfulness, and emotional resilience.
            </p>
            <button className='bg-pink-400 hover:bg-pink-500 text-white px-8 py-2 rounded-full font-medium'>
              Explore
            </button>
          </div>
        </div>
      </section>

      <section className='bg-gray-50 rounded-[50px] p-6  md:px-14 flex flex-col  md:flex-row item-center justify-between max-w-6xl mx-auto relative overflow-hidden'>

        <div className='max-w-sm text-center md:text-left '>
          <p className='text-xs uppercase tracking-widest text-gray-600 mt-4 mb-4'>Community</p>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug'>
            You’re Not Alone <br className="" /> on This Journey
          </h2>
          <p className='text-gray-700 mb-10 font-semibold text-xl'>
            Connect with others, share experiences, and find encouragement in a safe, supportive space.
          </p>
          <button className='bg-green-900 hover:bg-green-800 text-white font-medium px-5 py-2 rounded-full transition mb-8'>
            Join The Community
          </button>
        </div>

        <div className='absolute w-[700px] bottom-0 right-0 md:bottom-[-90px] md:right-[-90px] z-0'>
          <img src={images.modal2} alt="" />
        </div>

      </section>

      <section className='bg-gray-50  mt-3 py-20 px-6 md:px-12 max-w-6xl mx-auto relative'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-1'>
          <div className=' text-center md:text-left'>
            <p className='text-md uppercase tracking-widest text-gray-600 mb-6'>Need Help?</p>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
              Frequently <br className="" /> Asked <span class="underline underline-offset-4 decoration-green-700">Questions</span>
            </h2>
            <p className='text-gray-700 mb-8'>
              Find answers to common questions about our services, therapy, and mental well-being.
            </p>
            <div className='bg-orange-100 px-6 py-[120px] mt-[250px] rounded-3xl  w-full max-w-md mx-auto md:mx-0'></div>
            <img src={images.modal3} alt="FAQ Illustration" className='absolute w-[500px] bottom-[1px] left-[3no0px]' />
          </div>
          <div className='flex flex-col gap-4 mt-[250px]'>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>How do I book a therapy session?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>Are online sessions available?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>What’s the difference between therapy and coaching?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>Do I need a subscription to access services?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>Can I switch therapists if I don’t feel the right connection?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>
            <div className='bg-white rounded-xl p-4 flex items-center justify-between shadow-sm'>
              <p className='text-gray-800 font-medium'>Is my information and session history kept confidential?</p>
              <span className='text-2xl text-gray-500 font-bold'>+</span>
            </div>



          </div>
        </div>
      </section>

      <section className='bg-white py-20 px-4'>
        <div className="text-white mb-14 text-center">
          <p className='text-md uppercase tracking-widest text-gray-500 mb-3'>Get in touch</p>
          <h2 className='text-3xl md:text-4xl font-bold text-green-900 mb-3'>
            We’re Here to <br className="md:hidde" /> Support You
          </h2>
          <p className='text-gray-600 max-w-xl text-xl mx-auto'>
            Whether you have questions, need help getting started, or want to learn more — reach out anytime.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto shadow grid md:grid-cols-2 gap-10">
          <div className="">
            <h3 className='text-2xl font-semibold text-green-900 mb-8' >Contact details</h3>
            <p className='mb-3'>
              <span className='font-bold text-gray-800'>Email: </span>
              <span className='text-gray-700'>support@FitAure,com</span>
            </p>
            <p className='mb-3'>
              <span className='font-bold text-gray-800'>Phone: </span>
              <span className='text-gray-700'>+91 98435840395</span>
            </p>
            <p className='mb-3'>
              <span className='font-bold text-gray-800'>Address: </span>
              <span className='text-gray-700'>134 Wellness Way ,calm city, CA 534958t2</span>
            </p>

            <div className='flex items-center gap-4 text-green-900 mt-8'>
              <Linkedin className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-green-700 cursor-pointer" />
              <PhoneCall className="w-5 h-5 hover:text-green-700 cursor-pointer" />
            </div>
            <p className='text-md text-gray-500 mt-20'>We typically respond within 12 hours.</p>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-green-900 mb-8'>Send Us a Message</h3>
            <div className="bg-orange-50 p-10 rounded-[40px] shadow-inner">
              <form action="" className='space--y'>
                <div className='mb-3'>
                  <label htmlFor="" className='block text-sm text-gray-800 mb-1'>Email</label>
                  <input type="email" placeholder='Email' className='w-full border-b border-gray-400 bg-transparent focus:outline-none py-2' />
                </div>
                <div className='mb-8'>
                  <label htmlFor="" className='block text-sm text-gray-800 mb-1'>Message</label>
                  <textarea name="" placeholder='Message' className='w-full border-b border-gray-400 bg-transparent focus:outline-none py-2' id=""></textarea>
                </div>
                <button className='bg-green-900 text-white w-full py-2 rounded-full hover:bg-green-800 transition'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className='bg-gray-100 px-4 py-10'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-[40px] p-8 shadow-sm'>
            <h2 className='text-2xl font-bold mb-6 text-green-900'>FitAura</h2>
            <div className='grid grid-cols-3 gap-4 text-bold text-md text-green-900'>
              <div className='space-y-2'>
                <p>About</p>
                <p>Services</p>
                <p>Therapists</p>
                <p>Resources</p>
                <p>Contact</p>
              </div>
              <div className='space-y-2'>
                <p>Instagram</p>
                <p>Facebook</p>
                <p>YOutube</p>
                <p>Linkedin</p>
              </div>
              <div className='space-y-2'>
                <p>Terms of Use</p>
                <p>Privacy Policy</p>
              </div>
            </div>
            <p className='text-md text-gray-400 mt-8'>© [2035] Solus. All Rights Reserved.</p>
          </div>

          <div className='bg-blue-900 rounded-[40px] p-14 text-white flex flex-col justify-between relative overflow-hidden'>
            <img src={images.modal4} className="absolute top-[-90px] right-[-120px] w-[450px] " alt="" />
            <div className='relative z-10'>
              <h3 className='text-3xl font-bold leading-snug mb-6'>
                Find <br />
                Support, <br />
                Guidance, <br />
                and Balance.
              </h3>
              <button className='bg-white text-green-900 w-full mt-8 py-3 rounded-full text-md font-medium hover:bg-gray-200'>
                Find Support Now
              </button>
            </div>
          </div>
        </div>
      </footer>





    </div>
  );
}
