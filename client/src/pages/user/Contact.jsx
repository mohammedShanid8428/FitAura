import React from "react";
import Testimonials from "../../components/contact/Testimonials";
import FAQ from "../../components/contact/Faq";
import Contact from "../../components/contact/ContactBox";
import ContactBox from "../../components/contact/ContactBox";
import ContactHero from "../../components/contact/ContactHero";

export default function Contacts() {
 

  return (
    <>
    <ContactHero/>
    <ContactBox/>
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

   
    </>
  );
}
