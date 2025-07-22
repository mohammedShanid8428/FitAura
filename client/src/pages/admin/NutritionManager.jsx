import React, { useEffect, useState } from "react";
import { fetchAllMeals, addMealApi, deleteMealApi } from "../../services/allApis";
import toast from "react-hot-toast";
import AdminRoutes from "../../routes/AdminRoutes";

const initialFormState = {
  title: "",
  imageUrl: "",
  mealType: "Breakfast",
  benefit: "",
  tags: ""
};

export default function NutritionManager() {
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const res = await fetchAllMeals();
      setAllMeals(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      toast.error("Failed to fetch meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())
    };

    try {
      await addMealApi(payload);
      toast.success(editMode ? "Meal updated!" : "Meal added!");
      setFormData(initialFormState);
      setEditMode(false);
      setEditId(null);
      loadMeals();
    } catch (error) {
      toast.error("Failed to save meal.");
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      title: meal.title,
      imageUrl: meal.imageUrl,
      mealType: meal.mealType,
      benefit: meal.benefit,
      tags: meal.tags.join(", ")
    });
    setEditMode(true);
    setEditId(meal._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMealApi(id);
      toast.success("Meal deleted.");
      loadMeals();
    } catch (error) {
      toast.error("Failed to delete meal.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-600 mb-8">
        Nutrition Manager (Admin)
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-5 max-w-xl mx-auto mb-10"
      >
        <h2 className="text-lg font-semibold mb-4">
          {editMode ? "Edit Meal" : "Add New Meal"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Meal Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleInputChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          type="text"
          name="benefit"
          placeholder="Benefit Description"
          value={formData.benefit}
          onChange={handleInputChange}
          className="w-full mb-3 px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full text-white font-semibold px-4 py-2 rounded"
        >
          {editMode ? "Update Meal" : "Add Meal"}
        </button>
      </form>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-bold mb-4">All Meals</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allMeals.map((meal) => (
              <div
                key={meal._id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={meal.imageUrl}
                  alt={meal.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-green-700">{meal.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{meal.mealType}</p>
                  <p className="text-xs text-gray-500 mb-2">{meal.benefit}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {meal.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(meal)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
