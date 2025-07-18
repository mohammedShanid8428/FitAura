import React from "react";

// Mood Themes
const moodThemes = {
  happy: {
    titleColor: "text-yellow-400",
  },
  sad: {
    titleColor: "text-blue-400",
  },
  angry: {
    titleColor: "text-red-400",
  },
};

// All mood data in one place
const mindfulnessData = {
  happy: {
    tips: [
      {
        title: "Enjoy the Moment",
        desc: "Pause and savor your surroundings—whether it’s sunlight, music, or a warm cup of tea.",
      },
      {
        title: "Smile Meditation",
        desc: "Sit quietly, breathe deeply, and bring a gentle smile to your face. Feel the shift in energy.",
      },
      {
        title: "Share Positivity",
        desc: "Compliment someone or share your gratitude. It deepens your joy.",
      },
    ],
  },

  sad: {
    tips: [
      {
        title: "Body Scan Relaxation",
        desc: "Lie down or sit comfortably. Slowly focus your attention from head to toe, noticing tension.",
      },
      {
        title: "Name the Feeling",
        desc: "Silently name what you're feeling: sadness, grief, fatigue. Naming brings clarity and calm.",
      },
      {
        title: "Gentle Breathing",
        desc: "Inhale for 4 counts, hold for 4, exhale for 4. Repeat gently to soothe your nervous system.",
      },
    ],
  },

  angry: {
    tips: [
      {
        title: "Cooling Breath",
        desc: "Breathe in through your nose, out through pursed lips as if blowing out a candle. Feel the heat leave.",
      },
      {
        title: "Count Backwards",
        desc: "When triggered, count backwards from 10. It gives your brain time to respond, not react.",
      },
      {
        title: "Grounding Exercise",
        desc: "Name 5 things you see, 4 things you feel, 3 things you hear. It brings you back to the present.",
      },
    ],
  },
};

export default function MindTips({ mood = "happy" }) {
  const data = mindfulnessData[mood] || mindfulnessData.happy;
  const theme = moodThemes[mood] || moodThemes.happy;

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-10 ${theme.titleColor}`}>
          🧘‍♀️ Mindfulness Tips
        </h2>

        <ul className="relative border-l border-gray-400 pl-6 space-y-10">
          {data.tips.map((item, index) => (
            <li key={index} className="group relative">
              
              <div className="absolute w-4 h-4 bg-gray-300 rounded-full -left-8 top-1.5" />

              <h3 className={`text-2xl font-semibold ${theme.titleColor}`}>
                {item.title}
              </h3>

              <p className="text-gray-300 mt-2 text-md">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
