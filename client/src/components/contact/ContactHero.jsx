import React from "react";
import { images } from "../../assets/images";

const ContactHero = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-slate-900">
      {/* Background Image */}
      <img
        src={images.modal9}  // Replace with your image path if different
        alt="Contact Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Text Content */}
      <div className="relative z-20 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-teal-400 mb-4 tracking-wide drop-shadow">
          CONTACT US
        </h2>
        <p className="text-white text-lg max-w-xl mx-auto font-light drop-shadow">
          Need an expert? You're more than welcome to leave your contact info. Our team will connect with you shortly.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
