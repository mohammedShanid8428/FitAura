import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function MoodMonitor() {
  const [moods, setMoods] = useState([]);
  const [editingMood, setEditingMood] = useState(null);
  const [formData, setFormData] = useState({});

  const API_URL = 'http://localhost:3000/api/moods';  // Your backend URL

  const fetchMoods = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res.data);
      setMoods(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch moods.');
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleEdit = (mood) => {
    setEditingMood(mood._id);
    setFormData(mood);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Mood deleted.');
      fetchMoods();
    } catch {
      toast.error('Failed to delete mood.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJSONChange = (e, field) => {
    try {
      const parsed = JSON.parse(e.target.value);
      setFormData((prev) => ({ ...prev, [field]: parsed }));
    } catch {
      // Optional error handling for invalid JSON
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingMood}`, formData);
      toast.success('Mood updated.');
      setEditingMood(null);
      fetchMoods();
    } catch {
      toast.error('Failed to update mood.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Mood Manager (Admin)</h1>

      {moods.map((mood) => (
        <div key={mood._id} className="bg-gray-800 text-white p-4 rounded-xl mb-6 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">{mood.mood}</h2>
            <div>
              <button
                onClick={() => handleEdit(mood)}
                className="px-3 py-1 bg-blue-500 rounded-lg text-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(mood._id)}
                className="px-3 py-1 bg-red-500 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {editingMood === mood._id && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <input
                type="text"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4"
                placeholder="Mood Name"
              />

              <input
                type="text"
                name="themeColor"
                value={formData.themeColor}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-4"
                placeholder="Theme Color"
              />

              {[
                'hero',
                'enhanceTips',
                'nutritionTips',
                'routineTips',
                'mindfulnessTips',
                'dailyChallenges',
                'affirmation',
                'moodTips'
              ].map((field) => (
                <div key={field}>
                  <label className="block mb-2 text-sm capitalize">{field} (JSON)</label>
                  <textarea
                    className="w-full bg-gray-800 border border-gray-600 rounded p-2 mb-4"
                    value={JSON.stringify(formData[field] || {}, null, 2)}
                    onChange={(e) => handleJSONChange(e, field)}
                    rows={6}
                  />
                </div>
              ))}

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 rounded-lg text-white font-semibold"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
