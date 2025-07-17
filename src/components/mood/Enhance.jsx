import React from "react";
import { ArrowUpRight } from "lucide-react";
import { emojisGif, images } from "../../assets/images"; // ✅ Adjust import paths accordingly

const moodBasedServices = {
  happy: {
    emojisGif: emojisGif.emojis1,
    intro: "Support your positive mood with wellness strategies that reinforce happiness.",
    services: [
      {
        title: "Mindfulness & Meditation",
        description: "Boost joy with breathing techniques and presence practices.",
        image: images.modal7,
      },
      {
        title: "Gratitude Coaching",
        description: "Cultivate gratitude to extend happiness throughout your day.",
        image: "/images/therapy1.jpg",
      },
      {
        title: "Creative Expression",
        description: "Engage in art, music, or journaling to amplify your positive energy.",
        image: "/images/therapy5.jpg",
      },
      {
        title: "Positive Psychology",
        description: "Explore scientifically-backed strategies to maintain lasting happiness.",
        image: "/images/therapy6.jpg",
      },
    ],
  },

  sad: {
    emojisGif: emojisGif.emojis2,
    intro: "Gentle, uplifting care to help you process sadness and regain hope.",
    services: [
      {
        title: "Talk Therapy",
        description: "Share your thoughts in a safe space and feel heard.",
        image: "/images/therapy2.jpg",
      },
      {
        title: "Mood Journaling",
        description: "Track emotions and find patterns that affect your sadness.",
        image: "/images/therapy3.jpg",
      },
      {
        title: "Nature-Based Healing",
        description: "Engage with nature to promote calm and emotional healing.",
        image: "/images/therapy7.jpg",
      },
      {
        title: "Compassion Training",
        description: "Build self-kindness and emotional resilience in tough times.",
        image: "/images/therapy8.jpg",
      },
    ],
  },

  angry: {
    emojisGif: emojisGif.emojis3,
    intro: "Channel anger constructively through calming therapies and mindful release.",
    services: [
      {
        title: "Anger Management",
        description: "Techniques to cool down and respond calmly.",
        image: images.modal7
      },
      {
        title: "Deep Breathing Sessions",
        description: "Physiological reset through controlled breathwork.",
        image: "/images/therapy1.jpg",
      },
      {
        title: "Conflict Resolution Coaching",
        description: "Improve communication and reduce emotional reactivity.",
        image: "/images/therapy9.jpg",
      },
      {
        title: "Physical Release Techniques",
        description: "Try movement or stretching to let go of built-up tension.",
        image: "/images/therapy10.jpg",
      },
    ],
  },
};

export default function Enhance({ mood = "happy" }) {
  const moodInfo = moodBasedServices[mood];

  return (
    <section className=" px-6 py-12 overflow-hidden">
      {/* Optional mood intro */}
      <div className="mb-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-indigo-600 font-bold mb-2 flex justify-center items-center gap-2">
          <img src={moodInfo.emojisGif} alt="Mood Emoji" className="w-6 h-6" />
          Support  For Your {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
        </h2>
        <p className="text-gray-600">{moodInfo.intro}</p>
      </div>

      {/* Horizontal Cards */}
      <div className="flex gap-6 snap-x snap-mandatory pb-4  ">
        {moodInfo.services.map((item, index) => (
          <div
            key={index}
            className="relative min-w-[280px] sm:min-w-[320px] max-w-sm h-[400px] bg-cover bg-center rounded-2xl shadow-md snap-start flex-shrink-0 overflow-hidden"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            {/* Top-right icon */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow">
              <ArrowUpRight className="w-4 h-4 text-gray-800" />
            </div>

            {/* Text Content */}
            <div className="absolute bottom-0 w-full px-5 py-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm leading-tight">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
