import React, { useState, useEffect } from "react";
import {
  fetchAdminRoutines,
  addRoutineApi,
  deleteRoutineApi,
  updateRoutineApi,
} from "../../services/allApis";
import { toast } from "react-hot-toast";

export default function RoutinesManager() {
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    duration: 30,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const data = await fetchAdminRoutines();
      setRoutines(data);
    } catch {
      toast.error("Failed to load routines");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.imageUrl) {
      toast.error("Title and Image URL required");
      return;
    }

    try {
      if (editId) {
        await updateRoutineApi(editId, form);
        toast.success("Routine updated");
      } else {
        await addRoutineApi(form);
        toast.success("Routine added");
      }

      setForm({ title: "", description: "", imageUrl: "", duration: 30 });
      setEditId(null);
      loadRoutines();
    } catch {
      toast.error("Failed to save routine");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this routine?")) {
      try {
        await deleteRoutineApi(id);
        toast.success("Routine deleted");
        loadRoutines();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (routine) => {
    setForm({
      title: routine.title,
      description: routine.description,
      imageUrl: routine.imageUrl,
      duration: routine.duration,
    });
    setEditId(routine._id);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        Admin - Manage Routines
      </h1>

      {/* Routine Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-4 shadow mb-10 space-y-4 max-w-3xl mx-auto"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL (/uploads/xyz.gif)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="border rounded p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          {editId ? "Update Routine" : "Add Routine"}
        </button>
      </form>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <div
            key={routine._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={routine.imageUrl}
              alt={routine.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-center">{routine.title}</h3>
            <p className="text-sm text-gray-500 text-center line-clamp-2">
              {routine.description}
            </p>
            <p className="text-sm text-green-600 font-bold text-center">
              {routine.duration}s
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(routine)}
                className="bg-yellow-400 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(routine._id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
