import React, { useState } from "react";
import { images } from '../../assets/images'
const faqs = [
  {
    question: "How can I start a personalized wellness routine?",
    answer: "You can begin by signing up, completing a short assessment, and choosing goals related to fitness, nutrition, or mindfulness."
  },
  {
    question: "Do you offer online coaching for nutrition and fitness?",
    answer: "Yes, we offer virtual one-on-one coaching sessions for both fitness and nutrition, accessible via our dashboard."
  },
  {
    question: "Can I track my mood and daily habits with this service?",
    answer: "Absolutely. Our platform includes built-in mood tracking and habit logging features to monitor your progress over time."
  },
  {
    question: "Is there a plan that combines yoga, mental health, and sleep guidance?",
    answer: "Yes, our wellness bundle combines guided yoga, mindfulness sessions, and sleep improvement programs."
  },
  {
    question: "How often should I update my wellness goals?",
    answer: "We recommend reviewing and adjusting your goals every 2–4 weeks based on your progress and feedback from your coach."
  },
  {
    question: "Will my personal health data remain private and secure?",
    answer: "Yes. Your data is encrypted and stored securely. We never share personal information without your consent."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" mt-3 py-20 px-6 md:px-12 max-w-6xl mx-auto relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left side */}
        <div className="text-center md:text-left">
          <p className="text-md uppercase tracking-widest text-gray-200 mb-6">Need Help?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-6 tracking-wide">
            Frequently <br /> Asked <span className="underline underline-offset-4 decoration-orange-700 ">Questions</span>
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-xs">
            Find answers to common questions about routines, nutrition, mindfulness, and your wellness journey.
          </p>
          <div className="bg-orange-100 px-6 py-[150px] mt-[180px] rounded-3xl w-[400px] max-w-md mx-auto md:mx-0"></div>
          <img
            src={images.modal3}
            alt="FAQ Illustration"
            className="absolute w-[450px] bottom-[5px] left-[14px]"
          />
        </div>

        {/* Right side: Accordion */}
        <div className="flex flex-col gap-5 w-full md:max-w-md mt-[180px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-400 text-gray-200 rounded-xl p-4 shadow-sm cursor-pointer transition"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">{faq.question}</p>
                <span className="text-2xl text-black font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 text-gray-900 mt-2 text-sm ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="mt-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
