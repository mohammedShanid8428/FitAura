import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Testimonials from "../../components/landing/Testimonial";
import FAQ from "../../components/landing/Faq";

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
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FitAura</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Let's stay connected. Whether you have a question, feedback, or need guidance, we're here for you.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <Mail className="mx-auto text-orange-500 mb-4" size={32} />
          <h3 className="text-lg font-semibold mb-1">Email Us</h3>
          <p>support@fitaura.com</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <Phone className="mx-auto text-orange-500 mb-4" size={32} />
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <MapPin className="mx-auto text-orange-500 mb-4" size={32} />
          <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
          <p>Bangalore, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Send us a message</h2>
        <form className="grid gap-6">
          <input type="text" placeholder="Your Name" className="border p-3 rounded" required />
          <input type="email" placeholder="Your Email" className="border p-3 rounded" required />
          <select className="border p-3 rounded">
            <option>General Inquiry</option>
            <option>Technical Issue</option>
            <option>Nutrition Help</option>
            <option>Routine Guidance</option>
          </select>
          <textarea rows="5" placeholder="Your Message" className="border p-3 rounded" required />
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded">
            Submit
          </button>
        </form>
      </div>

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

     

     <Testimonials/>

     <FAQ/>
    </section>
  );
}
