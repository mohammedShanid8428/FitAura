import React from "react";
import { emojisGif } from "../../assets/images";
import { images } from "../../assets/images";

const moodContent = {
  happy: {
    color: "yellow",
    backgroundImage: images.modal20,
    gif: emojisGif.emojis1,
    title: "You're Glowing with Positivity!",
    subtitle: "That joy you're feeling? It's powerful. Keep sharing your sunshine.",
    actions: [
      { label: "Explore Happy Routines", link: "/routines" },
      { label: "View Nutrition Tips", link: "/nutrition" },
    ],
  },
  sad: {
    color: "blue",
    backgroundImage: images.modal20,
    gif: emojisGif.emojis3,
    title: "It's Okay to Feel Sad",
    subtitle: "Take it slow. Let yourself breathe and heal gently.",
    actions: [
      { label: "Soothing Routines", link: "/routines" },
      { label: "Nutrition to Boost Mood", link: "/nutrition" },
    ],
  },
  angry: {
    color: "red",
    backgroundImage: images.modal20,
    gif: emojisGif.emojis2,
    title: "Channel Your Fire Constructively",
    subtitle: "Anger is valid. Let’s find a path to calm and control.",
    actions: [
      { label: "Cool Down Routines", link: "/routines" },
      { label: "Nutrition to Calm Mind", link: "/nutrition" },
    ],
  },
};

export default function Hero({mood="happy"}){
  const data=moodContent[mood]||moodContent.happy;

  const titleColor = {
    orange: "text-yellow-400",
    blue: "text-blue-400",
    red: "text-red-500",
  }[data.color];

  const buttonPrimaryBg = {
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
  }[data.color];

  const buttonSecondaryBorder = {
    yellow: "border-yellow-300 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-700",
    blue: "border-blue-300 text-blue-500 hover:bg-blue-100 hover:text-blue-700",
    red: "border-red-300 text-red-500 hover:bg-red-100 hover:text-red-700",
  }[data.color];

  return(
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-white px-6 py-20"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"/>

      <div className="relative z-20 text-center max-w-3xl">
        <img
          src={data.gif}
          alt={mood}
          className="w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 drop-shadow-xl animate-bounce"
        />
         <h1 className={`text-3xl md:text-5xl font-extrabold mb-4 ${titleColor} drop-shadow-lg`}>
          {data.title}
        </h1>

        <p className="text-lg text-gray-200 font-medium mb-6 px-4 drop-shadow-sm">
          {data.subtitle}
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          {data.actions.map((btn,index)=>(
            <a key={index}
            href={btn.link}
            className={`px-6 py-3 rounded-full text-sm font-semibold shadow-md transition ${
              index===0
              ?`${buttonPrimaryBg}text-white`
              :`border ${buttonSecondaryBorder}`
            }`}>
             {btn.label} 
            </a>
          ))}
        </div>
      </div>
    </section>
  )

}
