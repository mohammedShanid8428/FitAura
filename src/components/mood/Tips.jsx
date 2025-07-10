import React from "react";
import {
  SmilePlus,
  Heart,
  Star,
  Trophy,
  ThumbsDown,
  Flame,
  CloudRain,
  ShieldAlert,
} from "lucide-react";
import { emojisGif } from "../../assets/images";

// Mood Tips Data (embedded here)
const moodTips = {
  happy: [
    {
      icon: <SmilePlus className="w-6 h-6 text-yellow-600" />,
      title: "Practice Gratitude",
      description:
        "Write down 3 things you're thankful for each day. Reflect on the good.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Spread Your Mood",
      description:
        "Call or text someone you love and brighten their day with a simple message.",
    },
    {
      icon: <Star className="w-6 h-6 text-green-600" />,
      title: "Act of Kindness",
      description:
        "Do something thoughtful for someone—big or small. It boosts your joy too!",
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      title: "Celebrate a Win",
      description:
        "Acknowledge a recent success—no matter how small. You earned it!",
    },
  ],

  sad: [
    {
      icon: <CloudRain className="w-6 h-6 text-blue-500" />,
      title: "Accept Your Feelings",
      description: "It’s okay to feel sad. Let yourself feel without judgment.",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Connect with a Friend",
      description: "Talking to someone who cares can lighten your burden.",
    },
    {
      icon: <Star className="w-6 h-6 text-gray-600" />,
      title: "Do One Nice Thing for Yourself",
      description:
        "Even small self-care acts matter—like a walk or a warm shower.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />,
      title: "Limit Overthinking",
      description:
        "Focus on one positive step, not fixing everything at once.",
    },
  ],

  angry: [
    {
      icon: <Flame className="w-6 h-6 text-red-600" />,
      title: "Breathe to Cool Down",
      description: "Inhale deeply and exhale slowly to reduce tension.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-orange-500" />,
      title: "Step Away Briefly",
      description:
        "Take a break from the trigger. Regain control before acting.",
    },
    {
      icon: <ThumbsDown className="w-6 h-6 text-gray-600" />,
      title: "Acknowledge Your Anger",
      description:
        "Say to yourself: 'I'm angry, and that's okay.' It helps defuse it.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Do a Kind Gesture",
      description:
        "Channel anger into a helpful action for yourself or others.",
    },
  ],
};

// Tips Component
export default function Tips({ mood }) {
  const tips = moodTips[mood] || [];

  // Titles per mood
  const moodTitles = {
    happy: "Sustain Happiness",
    sad: "Lift Your Mood",
    angry: "Manage Anger",
  };

  // Image per mood
  const moodEmojis = {
    happy: emojisGif.happy,
    sad: emojisGif.sad,
    angry: emojisGif.angry,
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Tips to {moodTitles[mood]}
          </h2>
          <p className="text-gray-600">
            We take pride in tailoring each suggestion to ensure your emotional
            well-being.
          </p>

          <img
            src={moodEmojis[mood]}
            alt={`${mood} mood`}
            className="rounded-xl shadow-lg w-60 h-60 object-contain mt-4"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">
          {tips.slice(0, 3).map((tip, index) => (
            <div key={index} className="relative pl-10">
              <span className="absolute left-0 top-1 text-orange-600 font-bold text-lg">
                0{index + 1}
              </span>
              <h4 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                {tip.icon} {tip.title}
              </h4>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Divider */}
      <div className="max-w-6xl mx-auto border-t mt-16 pt-10 border-gray-200" />
    </section>
  );
}
