import React from "react";
import { ArrowUpRight, Images } from "lucide-react";
import { emojisGif, images } from "../../assets/images";


const moodBasedServices = {
  happy: {
    colorClass: "text-yellow-400",
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
        image: images.modal13,
      },
      {
        title: "Creative Expression",
        description: "Engage in art, music, or journaling to amplify your positive energy.",
        image: images.modal7,
      },
      {
        title: "Positive Psychology",
        description: "Explore scientifically-backed strategies to maintain lasting happiness.",
        image: images.modal21,
      },
    ],
  },

  sad: {
    colorClass: "text-blue-400",
    emojisGif: emojisGif.emojis2,
    intro: "Gentle, uplifting care to help you process sadness and regain hope.",
    services: [
      {
        title: "Talk Therapy",
        description: "Share your thoughts in a safe space and feel heard.",
        image: images.modal7,
      },
      {
        title: "Mood Journaling",
        description: "Track emotions and find patterns that affect your sadness.",
        image: images.modal13,
      },
      {
        title: "Nature-Based Healing",
        description: "Engage with nature to promote calm and emotional healing.",
        image: images.modal21,
      },
      {
        title: "Compassion Training",
        description: "Build self-kindness and emotional resilience in tough times.",
        image: images.modal7,
      },
    ],
  },

  angry: {
    colorClass: "text-red-400",
    emojisGif: emojisGif.emojis3,
    intro: "Channel anger constructively through calming therapies and mindful release.",
    services: [
      {
        title: "Anger Management",
        description: "Techniques to cool down and respond calmly.",
        image: images.modal7,
      },
      {
        title: "Deep Breathing Sessions",
        description: "Physiological reset through controlled breathwork.",
        image: images.modal13,
      },
      {
        title: "Conflict Resolution Coaching",
        description: "Improve communication and reduce emotional reactivity.",
        image: images.modal21,
      },
      {
        title: "Physical Release Techniques",
        description: "Try movement or stretching to let go of built-up tension.",
        image: images.modal7,
      },
    ],
  },
};

export default function Enhance({ mood = "happy" }) {
  const moodInfo = moodBasedServices[mood];

  return (
    <section className="px-6 py-12 overflow-hidden">
      {/* Mood Intro */}
      <div className="mb-6 max-w-3xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-2 flex justify-center items-center gap-2 ${moodInfo.colorClass}`}>
          <img src={moodInfo.emojisGif} alt="Mood Emoji" className="w-7 h-7" />
          Support For Your {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood
        </h2>
        <p className="text-gray-200">{moodInfo.intro}</p>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-4 pb-4 px-4 overflow-x-auto">
        {moodInfo.services.map((item, index) => (
          <div
            key={index}
            className="relative min-w-[260px] sm:min-w-[300px] max-w-md h-[400px] bg-cover bg-center rounded-2xl shadow-md  overflow-hidden"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow">
              <ArrowUpRight className="w-4 h-4 text-gray-800" />
            </div>

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
