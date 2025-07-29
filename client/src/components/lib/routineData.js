import { exerciseImg, yogaGif } from "../../assets/images";

export const routineData = [
  {
    type: "stretch",
    exercises: [
      { id: 1, title: "Kneeling Back Rotation Stretch (female)", image: exerciseImg.exercise1 },
      { id: 2, title: "1 2 Stick Drill (male)", image: exerciseImg.exercise2 },
      { id: 3, title: "1 to 2 Jump Box (male)", image: exerciseImg.exercise3 },
      { id: 4, title: "123 Back Drill (male)", image: exerciseImg.exercise4 },
      { id: 5, title: "2 to 1 Jump Box (male)", image: exerciseImg.exercise5 },
      { id: 6, title: "3 4 Sit up (female)", image: exerciseImg.exercise6 },
      { id: 7, title: "3 Leg Chaturanga Pose", image: exerciseImg.exercise7 },
      { id: 8, title: "3 Leg Dog Pose (female)", image: exerciseImg.exercise8 },
      { id: 9, title: "Side Plank", image: exerciseImg.exercise9 },
      { id: 10, title: "Wall Squat", image: exerciseImg.exercise10 },
      { id: 11, title: "Mountain Climbers", image: exerciseImg.exercise11 },
      { id: 12, title: "Bridge Pose", image: exerciseImg.exercise12 },
    ],
  },
  {
    type: "yoga",
    exercises: [
      { id: 1, title: "🌞 Sun Salutation (Surya Namaskar)", image: yogaGif.yoga1, description: "A full-body flow to awaken muscles and energize your day." },
      { id: 2, title: "🧘‍♀️ Cat-Cow Stretch", image: yogaGif.yoga2, description: "Gently warm up your spine and release tension in the back." },
      { id: 3, title: "🌬️ Pranayama Breathing", image: yogaGif.yoga3, description: "A calming breath control exercise to reduce stress." },
      { id: 4, title: "🪷 Child’s Pose", image: yogaGif.yoga4, description: "A resting pose to stretch hips and relax the body." },
      { id: 5, title: "🦶 Downward Dog", image: yogaGif.yoga5, description: "Strengthens arms and legs while improving flexibility." },
      { id: 6, title: "🧍‍♂️ Warrior II", image: yogaGif.yoga6, description: "Builds stamina and strengthens your legs and core." },
      { id: 7, title: "🦋 Butterfly Pose", image: yogaGif.yoga1, description: "Opens up hips and improves circulation in the lower body." },
      { id: 8, title: "🔄 Seated Twist", image: yogaGif.yoga2, description: "Relieves spinal tension and improves digestion." },
      { id: 9, title: "💤 Corpse Pose (Savasana)", image: yogaGif.yoga3, description: "Final relaxation to restore energy and calm the mind." },
    ],
  },

];
