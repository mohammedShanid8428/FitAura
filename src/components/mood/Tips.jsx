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

// Mood Tips Data
const moodTips = {
  happy: [
    {
      icon: <SmilePlus className="w-6 h-6 text-yellow-600" />,
      title: "Practice Gratitude",
      description: "Write down 3 things you're thankful for each day. Reflect on the good.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Spread Your Mood",
      description: "Call or text someone you love and brighten their day.",
    },
    {
      icon: <Star className="w-6 h-6 text-green-600" />,
      title: "Act of Kindness",
      description: "Do something thoughtful for someone—big or small.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      title: "Celebrate a Win",
      description: "Acknowledge a recent success—no matter how small.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-orange-600" />,
      title: "Limit Scrolling",
      description: "Avoid doom-scrolling and pick up a hobby instead.",
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      title: "Self-Affirmations",
      description: "Look in the mirror and say one nice thing to yourself.",
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
      description: "Even small self-care acts matter—like a walk or a warm shower.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-yellow-500" />,
      title: "Limit Overthinking",
      description: "Focus on one positive step, not fixing everything at once.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      title: "Journal Your Thoughts",
      description: "Write how you feel—it helps process emotions.",
    },
    {
      icon: <SmilePlus className="w-6 h-6 text-green-500" />,
      title: "Go Outside",
      description: "A little sun and fresh air can do wonders.",
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
      description: "Take a break from the trigger. Regain control.",
    },
    {
      icon: <ThumbsDown className="w-6 h-6 text-gray-600" />,
      title: "Acknowledge Your Anger",
      description: "Say: 'I'm angry, and that's okay.' It helps defuse it.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: "Kind Gesture",
      description: "Channel anger into a helpful action for someone.",
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "Change the Scene",
      description: "Physically change space—step outside, take a short walk.",
    },
    {
      icon: <Trophy className="w-6 h-6 text-blue-600" />,
      title: "Use Energy Positively",
      description: "Exercise or punch a pillow—release without harm.",
    },
  ],
};

export default function Tips({ mood }) {
  const tips = moodTips[mood] || [];
  const moodTitles = {
    happy: "Sustain Happiness",
    sad: "Lift Your Mood",
    angry: "Manage Anger",
  };

  const moodEmojis = {
    happy: emojisGif.emojis1,
    sad: emojisGif.emojis2,
    angry: emojisGif.emojis3,
  };

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <img
          src={moodEmojis[mood]}
          alt={`${mood} mood`}
          className="w-28 h-28 mx-auto mb-4 object-contain"
        />
        <h2 className="text-4xl font-bold text-yellow-400">
          Our Tips to {moodTitles[mood]}
        </h2>
        <p className="text-gray-200 mt-2 max-w-2xl mx-auto">
          Practical suggestions personalized to guide you emotionally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {tips.slice(0, 6).map((tip, index) => (
          <div key={index} className="bg-gray-600 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-yellow-400">{tip.title}</h4>
                <p className="text-sm text-gray-200 mt-1">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
