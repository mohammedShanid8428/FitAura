import React from 'react';
import { images } from '../../assets/images'; // Adjust to your path

const experts = [
  {
    id: 1,
    name: 'Michael Carter',
    role: 'Fitness Coach',
    image: images.modal8,
  },
  {
    id: 2,
    name: 'Ryan Davis',
    role: 'Nutritionist',
    image: images.modal6,
  },
  {
    id: 3,
    name: 'Jessica Walker',
    role: 'Mood Therapist',
    image: images.modal7,
  },
  {
    id: 4,
    name: 'Sophia Lee',
    role: 'Sleep Wellness Expert',
    image: images.modal9, // add image
  },
  {
    id: 5,
    name: 'Daniel Moore',
    role: 'Mindfulness Coach',
    image: images.modal10, // add image
  },
  {
    id: 6,
    name: 'Olivia Green',
    role: 'Yoga Instructor',
    image: images.modal11, // add image
  },
];

export default function Trainers() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Meet Our Experts</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the passionate team of trainers, therapists, and wellness coaches supporting your journey.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max px-2">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="min-w-[250px] bg-zinc-900 rounded-2xl shadow-md overflow-hidden flex-shrink-0"
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{expert.name}</h3>
                <p className="text-gray-400 text-sm">{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
