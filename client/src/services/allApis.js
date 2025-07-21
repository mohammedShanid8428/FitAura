import { base_url } from './base_url';
import commonApi from './commonApi';


const API = 'http://localhost:3000/api/mealplanner';

export const registerApi = async (data) => {
  return await commonApi(`${base_url}/users/register`, "POST", "", data);
};

export const loginUserApi = async (data) => {
  return await commonApi(`${base_url}/users/login`, "POST", "", data);
};



export const fetchPlannerMeals = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addMealToPlanner = async (meal) => {
  const res = await axios.post(API, meal);
  return res.data;
};

export const deleteMealFromPlanner = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};