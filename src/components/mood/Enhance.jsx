import React from "react";
import { emojisGif } from "../../assets/images"; // 🧠 Your emoji GIFs

const moodBasedServices = {
  happy: {
    emoji: emojisGif.happy,
    intro: "Support your positive mood with wellness strategies that reinforce happiness.",
    services: [
      {
        title: "Mindfulness & Meditation",
        description: "Boost joy with breathing techniques and presence practices.",
        image: "/images/therapy4.jpg",
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
    emoji: emojisGif.sad,
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
    emoji: emojisGif.angry,
    intro: "Channel anger constructively through calming therapies and mindful release.",
    services: [
      {
        title: "Anger Management",
        description: "Techniques to cool down and respond calmly.",
        image: "/images/therapy2.jpg",
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

  if (!moodInfo) return <p className="text-red-500">No services found for this mood.</p>;

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <button className="px-4 py-1 bg-gray-100 text-sm text-gray-600 rounded-full w-max">
            🧠 Enhance Your Mood
          </button>
          <h2 className="text-4xl font-bold text-gray-900">Support for Feeling {mood}</h2>
          <p className="text-gray-600 max-w-lg">{moodInfo.intro}</p>

          <div className="mt-6">
            <img
              src={moodInfo.emoji}
              alt={mood}
              className="w-20 h-20 mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {moodInfo.services.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
