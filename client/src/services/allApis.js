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
export const fetchAllMeals = async () => {
  return await commonApi(`${base_url}/meals/getmeal`, "GET");
};

export const addMealApi = async (data) => {
  return await commonApi(`${base_url}/meals/addmeal`, "POST", undefined, data);
};

export const deleteMealApi = async (id) => {
  return await commonApi(`${base_url}/meals/deletemeal/${id}`, "DELETE");
};

// ✅ Meal Planner APIs
export const fetchPlannerMeals = async () => {
  return await commonApi(`${base_url}/mealplanner/getmealplanner`, "GET");
};

export const addMealToPlanner = async (meal) => {
  return await commonApi(`${base_url}/mealplanner/addmealplanner`, "POST", undefined, meal);
};

export const deleteMealFromPlanner = async (id) => {
  return await commonApi(`${base_url}/mealplanner/deleteplanner/${id}`, "DELETE");
};

// ✅ Contact APIs
export const submitContactMessage = async (data) => {
  return await commonApi(`${base_url}/contact/addmessage`, "POST", undefined, data);
};

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

// Admin Add Routine
export const addRoutineApi = async (routine) => {
  return await axios.post(`${base_url}/routines/admin/add`, routine);
};

// Admin Update Routine
export const updateRoutineApi = async (id, routine) => {
  return await axios.put(`${base_url}/routines/admin/${id}`, routine);
};

// Admin Delete Routine
export const deleteRoutineApi = async (id) => {
  return await axios.delete(`${base_url}/routines/admin/${id}`);
};