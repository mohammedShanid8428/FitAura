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
    image: images.modal9,
  },
  {
    id: 5,
    name: 'Daniel Moore',
    role: 'Mindfulness Coach',
    image: images.modal10,
  },
  {
    id: 6,
    name: 'Olivia Green',
    role: 'Yoga Instructor',
    image: images.modal11,
  },
];

export default function Trainers() {
  return (
    <section className=" py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Meet Our Experts</h2>
        <p className="text-gray-200">
          Discover the passionate team of trainers, therapists, and wellness coaches supporting your journey.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max px-2">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="w-[250px] h-[360px] bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-400 text-center flex-shrink-0"
            >
              <div className="h-[220px] bg-gray-800">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-orange-600">
                  {expert.name}
                </h3>
                <p className="text-sm text-gray-200">{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
