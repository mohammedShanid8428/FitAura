import React from "react";
import { Link } from "react-router-dom"; // 🔁 Required for routing
import { emojisGif } from "../../assets/images";
import Header from "../../components/Header";

export default function Emojis() {
  const emojis = [
    {
      id: 1,
      image: emojisGif.emojis1,
      title: "Feeling Happy",
      description: "You seem energetic and in a great mood!",
      route: "/mood/happy",
    },
    {
      id: 2,
      image: emojisGif.emojis2,
      title: "Feeling Angry",
      description: "Something might have upset you. Take a deep breath.",
      route: "/mood/angry",
    },
    {
      id: 3,
      image: emojisGif.emojis3,
      title: "Feeling Sad",
      description: "It’s okay to feel down. You’re not alone.",
      route: "/mood/sad",
    },
  ];

  return (
    <>
    <Header/>
    <section className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white flex flex-col justify-center py-20">
      <h2 className="text-4xl font-bold text-center mb-12">What's Your Mood Today?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
        {emojis.map((mood) => (
          <Link
            to={mood.route}
            key={mood.id}
            className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={mood.image}
              alt={mood.title}
              className="w-52 h-52 object-contain mb-6"
            />
            <h3 className="text-2xl font-semibold mb-3">{mood.title}</h3>
            <p className="text-md text-gray-300 max-w-xs">{mood.description}</p>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
}
