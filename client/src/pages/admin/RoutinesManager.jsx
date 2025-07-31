// RoutinesManager.jsx - Enhanced with better error handling and GIF support
import React, { useState, useEffect } from "react";
import {
  fetchAdminRoutines,
  addRoutineApi,
  deleteRoutineApi,
  updateRoutineApi,
} from "../../services/allApis";
import { toast } from "react-hot-toast";

const initialFormState = {
  title: "",
  description: "",
  image: null,
  duration: 30,
};

export default function RoutinesManager() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      setLoading(true);
      const data = await fetchAdminRoutines();
      setRoutines(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading routines:', error);
      toast.error("Failed to load routines");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Enhanced validation for images and GIFs
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        e.target.value = '';
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleEdit = (routine) => {
    setFormData({
      title: routine.title || "",
      description: routine.description || "",
      image: null, // Reset file input
      duration: routine.duration || 30,
    });
    setEditMode(true);
    setEditId(routine._id);
    setImagePreview(routine.imageUrl); // Show current image as preview
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a routine title");
      return;
    }

    if (!editMode && !formData.image) {
      toast.error("Please select an image/GIF for the routine");
      return;
    }

    if (formData.duration <= 0) {
      toast.error("Duration must be greater than 0");
      return;
    }

    try {
      setUploading(true);
      
      // Create FormData for both add and update
      const fd = new FormData();
      fd.append("title", formData.title.trim());
      fd.append("description", formData.description.trim());
      fd.append("duration", formData.duration);

      // Only append image if one is selected
      if (formData.image) {
        fd.append("image", formData.image);
      }

      if (editMode) {
        await updateRoutineApi(editId, fd);
        toast.success("Routine updated successfully!");
      } else {
        await addRoutineApi(fd);
        toast.success("Routine added successfully!");
      }

      // Reset form
      resetForm();
      loadRoutines();

    } catch (error) {
      console.error('Submit error:', error);

      // Enhanced error handling
      if (error.response?.status === 400) {
        const errorMsg = error.response.data?.message || "Invalid data provided";
        toast.error(errorMsg);
      } else if (error.response?.status === 413) {
        toast.error("File too large. Please choose a smaller image.");
      } else if (error.response?.status === 415) {
        toast.error("Unsupported file format. Please use JPEG, PNG, or GIF.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please check your internet connection and try again.");
      } else if (error.code === 'NETWORK_ERROR') {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(editMode ? "Failed to update routine" : "Failed to add routine");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this routine?")) {
      return;
    }

    try {
      await deleteRoutineApi(id);
      toast.success("Routine deleted successfully!");
      loadRoutines();
    } catch (error) {
      console.error('Delete error:', error);
      if (error.response?.status === 404) {
        toast.error("Routine not found");
      } else {
        toast.error("Failed to delete routine");
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

  const isGif = (url) => {
    return url && (url.toLowerCase().includes('.gif') || url.toLowerCase().includes('gif'));
  };

  return (
    <section className="bg-gray-900 min-h-screen py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-lime-500 mb-8">
        Routines Manager (Admin)
      </h1>

      {/* Routine Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-400 shadow rounded-lg p-5 max-w-xl mx-auto mb-10"
        encType="multipart/form-data"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {editMode ? "Edit Routine" : "Add New Routine"}
          </h2>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded transition-colors"
              disabled={uploading}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Routine Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          disabled={uploading}
          className="w-full mb-3 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />

        <div className="mb-3">
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            required={!editMode}
            disabled={uploading}
            className="w-full px-4 py-2 border rounded bg-gray-200 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
          />
          <p className="text-sm text-gray-500 mt-1">
            {editMode 
              ? "Leave empty to keep current image/GIF, or select new file to replace"
              : "Select an image or GIF file (JPEG, PNG, GIF, WebP - max 10MB)"
            }
          </p>
        </div>

        {/* Enhanced Image/GIF Preview */}
        {imagePreview && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              {editMode ? "Current/New Image:" : "Preview:"}
              {isGif(imagePreview) && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  GIF
                </span>
              )}
            </p>
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded border"
              />
              {isGif(imagePreview) && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  Animated GIF
                </div>
              )}
            </div>
          </div>
        )}

        <textarea
          name="description"
          placeholder="Routine Description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          disabled={uploading}
          className="w-full mb-3 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (seconds)"
          value={formData.duration}
          onChange={handleInputChange}
          min="1"
          required
          disabled={uploading}
          className="w-full mb-4 px-4 py-2 border bg-gray-200 placeholder-gray-900  rounded focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`w-full text-white font-semibold px-4 py-2 rounded transition-colors flex items-center justify-center gap-2 ${
            uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : editMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            editMode ? "Update Routine" : "Add Routine"
          )}
        </button>
      </form>

      {/* Routines Grid */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-6 text-lime-400">
          All Routines ({routines.length})
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading routines...</p>
          </div>
        ) : routines.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No routines found. Add your first routine!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {routines.map((routine) => (
              <div
                key={routine._id}
                className={`bg-gray-500 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                  editMode && editId === routine._id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {routine.imageUrl && (
                  <div className="relative">
                    <img
                      src={routine.imageUrl}
                      alt={routine.title}
                      className="w-full h-40 object-cover"
                    />
                    {isGif(routine.imageUrl) && (
                      <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        GIF
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-bold text-lg text-lime-500 mb-2">
                    {routine.title}
                  </h3>

                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                    {routine.description || "No description provided"}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-green-100 text-lime-800 text-sm px-2 py-1 rounded-full">
                      {routine.duration}s
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(routine.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(routine)}
                      disabled={uploading}
                      className={`flex-1 text-white text-sm px-3 py-2 rounded transition-colors ${
                        uploading 
                          ? 'bg-gray-400 cursor-not-allowed'
                          : editMode && editId === routine._id
                          ? 'bg-blue-600'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {editMode && editId === routine._id ? 'Editing...' : 'Edit'}
                    </button>

                    <button
                      onClick={() => handleDelete(routine._id)}
                      disabled={uploading}
                      className={`flex-1 text-white text-sm px-3 py-2 rounded transition-colors ${
                        uploading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
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

      {/* Network Status Indicator */}
      {uploading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing upload...</span>
        </div>
      )}
    </section>
  );
}