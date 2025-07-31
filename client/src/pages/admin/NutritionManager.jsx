import React, { useEffect, useState } from "react";
import {
  fetchAllMeals,
  addMealApi,
  updateMealApi,
  deleteMealApi,
} from "../../services/allApis";
import toast from "react-hot-toast";

const initialFormState = {
  title: "",
  image: null,
  mealType: "Breakfast",
  benefit: "",
  tags: "",
};

export default function NutritionManager() {
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      setLoading(true);
      console.log('🔍 Loading meals...');
      const res = await fetchAllMeals();
      console.log('🔍 Meals response:', res);
      setAllMeals(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error loading meals:', error);
      toast.error(`Failed to fetch meals: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('🔍 Selected file:', file.name, file.size, file.type);
      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleEdit = (meal) => {
    setFormData({
      title: meal.title || "",
      image: null, // Reset file input
      mealType: meal.mealType || "Breakfast",
      benefit: meal.benefit || "",
      tags: Array.isArray(meal.tags) ? meal.tags.join(", ") : "",
    });
    setEditMode(true);
    setEditId(meal._id);
    setImagePreview(meal.imageUrl); // Show current image as preview
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a meal title");
      return;
    }

    if (!editMode && !formData.image) {
      toast.error("Please select an image for the meal");
      return;
    }

    try {
      // Create FormData for both add and update
      const fd = new FormData();
      fd.append("title", formData.title.trim());
      fd.append("mealType", formData.mealType);
      fd.append("benefit", formData.benefit.trim());
      fd.append("tags", JSON.stringify(
        formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      ));

      // Only append image if one is selected
      if (formData.image) {
        fd.append("image", formData.image);
      }

      console.log('🔍 Submitting form:', {
        editMode,
        editId,
        title: formData.title,
        mealType: formData.mealType,
        hasImage: !!formData.image
      });

      if (editMode) {
        await updateMealApi(editId, fd);
        toast.success("Meal updated successfully!");
      } else {
        await addMealApi(fd);
        toast.success("Meal added successfully!");
      }

      // Reset form
      resetForm();
      loadMeals();

    } catch (error) {
      console.error('Submit error details:', error);

      // Enhanced error messages based on the error
      if (error.response?.status === 404) {
        toast.error("API endpoint not found. Please check your backend server and routes.");
        console.error('❌ 404 Error - Check if your backend routes match:', {
          expectedRoutes: [
            'POST /api/meals/addmeal',
            'PUT /api/meals/updatemeal/:id',
            'GET /api/meals/getallmeal',
            'DELETE /api/meals/deletemeal/:id'
          ]
        });
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Invalid data provided");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Check your backend logs.");
      } else if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        toast.error("Cannot connect to backend. Is your server running on port 3000?");
      } else if (error.name === 'TypeError' && error.message?.includes('fetch')) {
        toast.error("Connection failed. Check if backend server is running.");
      } else {
        toast.error(`${editMode ? "Update" : "Add"} failed: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) {
      return;
    }

    try {
      await deleteMealApi(id);
      toast.success("Meal deleted successfully!");
      loadMeals();
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 404) {
        toast.error("Cannot delete: API endpoint not found.");
      } else {
        toast.error(`Failed to delete meal: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditMode(false);
    setEditId(null);
    setImagePreview(null);

    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <section className="bg-gray-900 min-h-screen py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-500 mb-8">
        Nutrition Manager (Admin)
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 shadow rounded-lg p-5 max-w-xl mx-auto mb-10"
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editMode ? "Edit Meal" : "Add New Meal"}
          </h2>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Meal Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full mb-3 bg-gray-200 placeholder-gray-900 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="mb-3">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required={!editMode}
            className="w-full px-4 py-2  bg-gray-200 placeholder-gray-900  border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {editMode && (
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to keep current image, or select new image to replace
            </p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">
              {editMode ? "Current/New Image:" : "Image Preview:"}
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-32 object-cover rounded border bg-gray-200 placeholder-gray-900 "
            />
          </div>
        )}

        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleInputChange}
          className="w-full mb-3 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Snack">Wieghtloss</option>
          <option value="Snack">Weightgain</option>
          <option value="Snack">Happy</option>
          <option value="Snack">Sad</option>
          <option value="Snack">Angry</option>
        </select>

        <textarea
          name="benefit"
          placeholder="Benefit Description"
          value={formData.benefit}
          onChange={handleInputChange}
          rows="3"
          className="w-full mb-3 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated: healthy, protein, vegetarian)"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full mb-4 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className={`w-full text-white font-semibold px-4 py-2 rounded transition-colors ${editMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-green-600 hover:bg-green-700'
            }`}
        >
          {editMode ? "Update Meal" : "Add Meal"}
        </button>
      </form>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-700">
          All Meals ({allMeals.length})
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading meals...</p>
          </div>
        ) : allMeals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No meals found. Add your first meal!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMeals.map((meal) => (
              <div
                key={meal._id}
                className={`bg-gray-400 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${editMode && editId === meal._id ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                {meal.imageUrl && (
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-orange-600">
                      {meal.title}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      {meal.mealType}
                    </span>
                  </div>

                  <p className="text-sm text-gray-900 mb-3">
                    {meal.benefit}
                  </p>

                  {meal.tags && meal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {meal.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-gray-900 text-xs px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {meal.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{meal.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(meal)}
                      className={`flex-1 text-white text-sm px-3 py-2 rounded transition-colors ${editMode && editId === meal._id
                          ? 'bg-blue-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                      {editMode && editId === meal._id ? 'Editing...' : 'Edit'}
                    </button>

                    <button
                      onClick={() => handleDelete(meal._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded transition-colors"
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