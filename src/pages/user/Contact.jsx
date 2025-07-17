import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Testimonials from "../../components/contact/Testimonials";
import FAQ from "../../components/contact/Faq";
import Header from "../../components/Header";
import { images } from "../../assets/images";

export default function Contact() {
  const faqs = [
    {
      question: "How can I schedule a consultation?",
      answer: "You can fill out the contact form or use the WhatsApp button below.",
    },
    {
      question: "Are all services online?",
      answer: "Yes, we provide both live virtual sessions and recorded resources.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We follow best practices in data security and privacy.",
    },
  ];

  return (
    <>
      <Header />
      <section className="bg-slate-900">

        <section className="text-gray-800">
          {/* Hero Image Background */}
          <div className="relative h-[60vh] flex items-center justify-center">
            <img
              src={images.modal9} // Replace with your image path
              alt="City Skyline"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10" />

            <div className="relative z-20 text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-teal-500 mb-4">CONTACT US</h2>
              <p className="text-white text-lg max-w-xl mx-auto">
                Need an expert? You are more than welcome to leave your contact info and we will be in touch shortly.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
  <div className="grid md:grid-cols-2 gap-10 items-stretch">
    
    {/* Left Contact Info Card */}
    <div className="bg-black rounded-2xl text-white p-8 shadow-lg h-full flex flex-col justify-between">
      <div>
        <span className="bg-teal-400 text-black font-semibold px-4 py-1 rounded-full text-sm mb-4 inline-block">
          Contact Us
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-teal-400">
          Need More Information? <br /> Get in Touch
        </h2>
        <p className="text-gray-200 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
          lorem id libero posuere iaculis.
        </p>

        <div className="space-y-4 text-sm text-white">
          <div className="flex items-center gap-3">
            <Phone className="text-teal-400" size={20} />
            <p>+91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-teal-400" size={20} />
            <p>hello@fitaura.com</p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-teal-400 mt-1" size={20} />
            <p>Office: Bangalore, India</p>
          </div>
        </div>
      </div>

      <button className="mt-8 bg-teal-500 text-black font-semibold px-6 py-2 rounded-full hover:bg-teal-600 transition">
        Back to Home
      </button>
    </div>

    {/* Right Form */}
    <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Send Message</h3>
      <p className="text-gray-600 mb-6 text-sm">
        Fill out the form below to send us a message and we’ll get back to you as soon as possible.
      </p>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 p-3 rounded-md w-full"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 p-3 rounded-md w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
          required
        />

        {/* Section Selection Dropdown */}
        <select
          className="border border-gray-300 p-3 rounded-md w-full md:col-span-2 text-gray-600"
          required
        >
          <option value="">Select a section</option>
          <option value="nutrition">Nutrition</option>
          <option value="routine">Routine</option>
          <option value="moods">Moods</option>
          <option value="health">Health & Wellness</option>
          <option value="other">Other</option>
        </select>

        <textarea
          rows="5"
          placeholder="Your Message"
          className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
          required
        />

        <button
          type="submit"
          className="bg-teal-500 text-black font-semibold py-3 rounded-md md:col-span-2 hover:bg-teal-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>
       
        {/* WhatsApp + Chatbot */}
        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium"
          >
            Chat on WhatsApp
          </a>
          <button
            onClick={() => alert("Chatbot coming soon!")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium"
          >
            Talk to our Chatbot
          </button>
        </div>



        <Testimonials />

        <FAQ />

      </section>
    </>
  );
}
