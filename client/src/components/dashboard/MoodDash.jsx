import React from "react";
import { emojisGif } from "../../assets/images";
import { useNavigate } from "react-router-dom";

export default function Emojis() {
  const navigate = useNavigate();
  const emojis = [
    { id: 1, mood: "happy", image: emojisGif.emojis1, title: "Feeling Happy", description: "You seem energetic and in a great mood!" },
    { id: 2, mood: "angry", image: emojisGif.emojis2, title: "Feeling Angry", description: "Something might have upset you." },
    { id: 3, mood: "sad", image: emojisGif.emojis3, title: "Feeling Sad", description: "It’s okay to feel down. You’re not alone." },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white flex flex-col justify-center py-20">
      <h2 className="text-4xl font-bold text-center mb-12">What's Your Mood Today?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
        {emojis.map((moodItem) => (
          <div
            key={moodItem.id}
            className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate(`/dashboard?mood=${moodItem.mood}`)}
          >
            <img src={moodItem.image} alt={moodItem.title} className="w-52 h-52 object-contain mb-6" />
            <h3 className="text-2xl font-semibold mb-3">{moodItem.title}</h3>
            <p className="text-md text-gray-300 max-w-xs">{moodItem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
