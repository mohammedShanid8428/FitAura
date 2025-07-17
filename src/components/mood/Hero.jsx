import React from "react";
import { emojisGif } from "../../assets/images";
import { images } from "../../assets/images";

const moodContent = {
  happy: {
    color: "orange",
    backgroundImage: images.modal6, // ✅ Correct reference to image
    gif: emojisGif.emojis1,           // ✅ Use specific emoji gif
    title: "You're Glowing with Positivity!",
    subtitle: "That joy you're feeling? It's powerful. Keep sharing your sunshine.",
    actions: [
      { label: "Explore Happy Routines", link: "#" },
      { label: "Gratitude Journal", link: "#" },
    ],
  },
  sad: {
    color: "blue",
    backgroundImage: images.modal7,
    gif: emojisGif.emojis2,
    title: "It’s Okay to Feel Sad",
    subtitle: "Take it slow. Let yourself breathe and heal gently.",
    actions: [
      { label: "Soothing Activities", link: "#" },
      { label: "Mood Journal", link: "#" },
    ],
  },
  angry: {
    color: "red",
    backgroundImage: images.modal8,
    gif: emojisGif.emojis3,
    title: "Channel Your Fire Constructively",
    subtitle: "Anger is valid. Let’s find a path to calm and control.",
    actions: [
      { label: "Cool Down Techniques", link: "#" },
      { label: "Write It Out", link: "#" },
    ],
  },
};

export default function Hero({ mood = "happy" }) {
  const data = moodContent[mood] || moodContent.happy;

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center text-white px-6 py-20"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-3xl">
        <img
          src={data.gif}
          alt={mood}
          className="w-32 h-32 mx-auto mb-6 drop-shadow-xl"
        />

        <h1 className={`text-4xl md:text-5xl font-bold text-${data.color}-300 mb-4`}>
          {data.title}
        </h1>

        <p className={`text-lg text-${data.color}-200 font-medium mb-6`}>
          {data.subtitle}
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-8">
          {data.actions.map((btn, index) => (
            <a
              key={index}
              href={btn.link}
              className={`${
                index === 0
                  ? `bg-${data.color}-500 hover:bg-${data.color}-600 text-white`
                  : `border border-${data.color}-300 text-${data.color}-100 hover:bg-${data.color}-100 hover:text-${data.color}-800`
              } px-6 py-3 rounded-full text-sm font-semibold shadow-md transition`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
