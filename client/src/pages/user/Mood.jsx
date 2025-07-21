import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { emojisGif } from "../../assets/images";
import Header from "../../components/common/Header";

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

  const titleDelay = emojis.length * 0.5 + 1;

  return (
    <>

      <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col justify-center py-20 px-4">

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-yellow-500 tracking-wide drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: titleDelay,
            duration: 1,
            ease: "easeOut",
          }}
        >
          What's Your Mood Today?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-center text-lg text-blue-300 max-w-xl mx-auto mb-12 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: titleDelay + 0.5,
            duration: 1,
            ease: "easeOut",
          }}
        >
          Choose your mood and explore what’s waiting for you!
        </motion.p>

        {/* Emojis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {emojis.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.5,
                duration: 1,
                ease: "easeOut",
              }}
              className="flex flex-col items-center text-center"
            >
              <Link to={mood.route} className="flex flex-col items-center text-center">
                <motion.img
                  src={mood.image}
                  alt={mood.title}
                  className="w-40 h-40 md:w-60 md:h-60 object-contain mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.9)]"
                  animate={{
                    y: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    delay: emojis.length * 0.5 + index * 0.3,
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
                <h3 className="text-2xl font-bold text-lime-400 mb-3 drop-shadow-lg">{mood.title}</h3>
                <p className="text-md text-gray-200 max-w-xs">{mood.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
