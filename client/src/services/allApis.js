import { base_url } from './base_url';
import commonApi from './commonApi';

export const registerApi = async (data) => {
  return await commonApi(`${base_url}/users/register`, "POST", "", data);
};

export const loginUserApi = async (data) => {
  return await commonApi(`${base_url}/users/login`, "POST", "", data);
};
