import React from "react";
import { emojisGif } from "../../assets/images";
import { useNavigate, useSearchParams } from "react-router-dom";
import { moodThemes } from "../../components/lib/moodTheme";

export default function Emojis() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mood = searchParams.get("mood") || "default";
  const theme = moodThemes[mood] || moodThemes.default;

  const emojis = [
    {
      id: 1,
      mood: "happy",
      image: emojisGif.emojis1,
      title: "Feeling Happy",
      description: "You seem energetic and in a great mood!",
    },
    {
      id: 2,
      mood: "angry",
      image: emojisGif.emojis2,
      title: "Feeling Angry",
      description: "Something might have upset you.",
    },
    {
      id: 3,
      mood: "sad",
      image: emojisGif.emojis3,
      title: "Feeling Sad",
      description: "It’s okay to feel down. You’re not alone.",
    },
  ];

  return (
    <section className={`w-full min-h-[110px] ${theme.bg} ${theme.text}  flex flex-col justify-center py-10`}>
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">What's Your Mood Today?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-7xl mx-auto">
        {emojis.map((moodItem) => (
          <div
            key={moodItem.id}
            onClick={() => navigate(`/dashboard?mood=${moodItem.mood}`)}
            className={`rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2 ${theme.card}`}
          >
            <img
              src={moodItem.image}
              alt={moodItem.title}
              className="w-52 h-52 object-contain mb-6"
            />
            <h3 className="text-2xl font-bold mb-3 tracking-wide">{moodItem.title}</h3>
            <p className="text-md font-medium text-gray-800 max-w-xs">{moodItem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
