import { base_url } from './base_url';
import commonApi from './commonApi';
import axios from 'axios';  // For direct GET requests (optional).

// ✅ Authentication APIs
export const registerApi = async (data) => {
  return await commonApi(`${base_url}/users/register`, "POST", undefined, data);
};

export const loginUserApi = async (data) => {
  return await commonApi(`${base_url}/users/login`, "POST", undefined, data);
};

// ✅ Meals APIs

// ✅ Fetch all meals


// ✅ Add a new meal (FormData - multipart)
export const addMealApi = async (formData) => {
  return await commonApi(
    `${base_url}/meals/addmeal`,
    "POST",
    {
      // Don't set Content-Type manually for FormData - let browser set it with boundary
    },
    formData
  );
};

// ✅ Update an existing meal (FormData - multipart, allows image update)
export const updateMealApi = async (id, formData) => {
  return await commonApi(
    `${base_url}/meals/updatemeal/${id}`,
    "PUT",
    {
      // Don't set Content-Type manually for FormData
    },
    formData
  );
};

// ✅ Delete a meal by ID
export const deleteMealApi = async (id) => {
  return await commonApi(`${base_url}/meals/deletemeal/${id}`, "DELETE");
};

// ✅ Meal Planner APIs
// services/allApis.js
export const fetchAllMeals = async () =>
  await commonApi(`${base_url}/meals/getallmeals`, "GET");

export const fetchPlannerMeals = async () =>
  await commonApi(`${base_url}/mealplanner/getmealplanner`, "GET");

export const addMealToPlanner = async (meal) =>
  await commonApi(`${base_url}/mealplanner/addmealplanner`, "POST", undefined, meal);

export const deleteMealFromPlanner = async (id) =>
  await commonApi(`${base_url}/mealplanner/deleteplanner/${id}`, "DELETE");


export const fetchAllContactMessages = async () => {
  return await commonApi(`${base_url}/contact/getmessages`, "GET");
};

export const deleteContactMessage = async (id) => {
  return await commonApi(`${base_url}/contact/deletemessage/${id}`, "DELETE");
};

export const fetchAllRoutines = async () => {
  const res = await axios.get(`${base_url}/routines/getroutines`);
  return Array.isArray(res.data) ? res.data : [];
};

export const fetchAdminRoutines = async () => {
  const res = await axios.get(`${base_url}/routines/admin/getroutines`);
  return Array.isArray(res.data) ? res.data : [];
};

// Admin Add Routine with file upload
export const addRoutineApi = async (formData) => {
  return await axios.post(`${base_url}/routines/admin/add`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Admin Update Routine with file upload
export const updateRoutineApi = async (id, formData) => {
  return await axios.put(`${base_url}/routines/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Admin Delete Routine
export const deleteRoutineApi = async (id) => {
  return await axios.delete(`${base_url}/routines/admin/${id}`);
};

export const hydrationAPI = {
  // Get user's hydration data
  getHydrationData: async (userId) => {
    try {
      const response = await api.get(`/hydration/gethydration/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hydration data:', error);
      throw error;
    }
  },



  updateHydrationData: async (hydrationData) => {
    try {
      const response = await api.post('/hydration/updatehydration', hydrationData);
      return response.data;
    } catch (error) {
      console.error('Error updating hydration data:', error);
      throw error;
    }
  },

  // Get hydration history
  getHydrationHistory: async (userId, days = 7) => {
    try {
      const response = await api.get(`/hydration/history/${userId}?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hydration history:', error);
      throw error;
    }
  },

  // Reset daily hydration
  resetDailyHydration: async (userId) => {
    try {
      const response = await api.post('/hydration/reset', { userId });
      return response.data;
    } catch (error) {
      console.error('Error resetting hydration:', error);
      throw error;
    }
  },

  // Get hydration stats
  getHydrationStats: async (userId) => {
    try {
      const response = await api.get(`/hydration/stats/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching hydration stats:', error);
      throw error;
    }
  }
}



